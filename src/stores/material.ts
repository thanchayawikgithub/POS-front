import type Material from "@/types/Material";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import materialService from "@/services/material";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useMaterialStore = defineStore("material", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();

  const checkDialog = ref();
  const deleteDialog = ref(false);
  const isTable = ref(true);
  const dialog = ref(false);
  const checkMaterial = ref(false);
  const page = ref(1);
  const take = ref(10);
  const keyword = ref("");
  const lastPage = ref(0);

  const materials = ref<Material[]>([]);
  const editedMaterial = ref<Material & { files: File[] }>({
    mat_name: "",
    mat_min_quantity: 0,
    mat_quantity: 0,
    mat_unit: "",
    mat_price_per_unit: 0,
    mat_image: "no_img_available.jpg",
    files: [],
  });

  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editedMaterial.value = {
        mat_name: "",
        mat_min_quantity: 0,
        mat_quantity: 0,
        mat_unit: "",
        mat_price_per_unit: 0,
        mat_image: "no_img_available.jpg",
        files: [],
      };
    }
  });

  watch(page, async (newPage, oldPage) => {
    await getMaterials();
  });

  watch(keyword, async (newKeyword, oldKeyword) => {
    await getMaterials();
  });

  watch(lastPage, async (newLastPage, oldLastPage) => {
    if (newLastPage < page.value) {
      page.value = 1;
    }
  });
  async function getMaterials() {
    loadingStore.isLoading = true;
    try {
      const res = await materialService.getMaterials({
        page: page.value,
        take: take.value,
        keyword: keyword.value,
      });
      materials.value = res.data.data;
      lastPage.value = res.data.lastPage;
      console.log(materials.value);
      // vendorStore.venderShopName = new Set(
      //   materials.value.map((mat) => mat.mat_shop_name)
      // );
      // console.log(vendorStore.venderShopName);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Material ได้");
    }
    loadingStore.isLoading = false;
  }

  async function saveMaterial() {
    loadingStore.isLoading = true;
    try {
      if (editedMaterial.value.mat_id) {
        const res = await materialService.updateMaterial(
          editedMaterial.value.mat_id,
          editedMaterial.value
        );
      } else {
        const res = await materialService.saveMaterial(editedMaterial.value);
      }
      dialog.value = false;
      await getMaterials();
    } catch (e) {
      messageStore.showError("ไม่สามารถบันทึก Material ได้");
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  async function deleteMaterial(id: number) {
    loadingStore.isLoading = true;
    try {
      const res = await materialService.deleteMaterial(id);
      await getMaterials();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถลบ Material ได้");
    }
    loadingStore.isLoading = false;
  }
  function editMaterial(material: Material) {
    editedMaterial.value = JSON.parse(JSON.stringify(material));
    dialog.value = true;
  }

  return {
    materials,
    getMaterials,
    dialog,
    editedMaterial,
    saveMaterial,
    editMaterial,
    deleteMaterial,
    isTable,
    checkDialog,
    deleteDialog,
    checkMaterial,
    lastPage,
    page,
    keyword,
  };
});
