import type CheckMaterial from "@/types/CheckMaterial";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import materialService from "@/services/material";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useCheckMaterialStore = defineStore("checkMaterial", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const checkDialog = ref();
  const deleteDialog = ref(false);
  const isTable = ref(true);
  const dialog = ref(false);
  const checkCheckMaterial = ref(false);
  const materials = ref<CheckMaterial[]>([]);
  //   const editedCheckMaterial = ref<CheckMaterial>({
  //     mat_name: "",
  //     mat_min_quantity: 0,
  //     mat_quantity: 0,
  //     mat_unit: "",
  //     mat_price_per_unit: 0,
  //   });

  //   watch(dialog, (newDialog, oldDialog) => {
  //     if (!newDialog) {
  //       editedCheckMaterial.value = {
  //         mat_name: "",
  //         mat_min_quantity: 0,
  //         mat_quantity: 0,
  //         mat_unit: "",
  //         mat_price_per_unit: 0,
  //       };
  //     }
  //   });
  //   async function getCheckMaterials() {
  //     loadingStore.isLoading = true;
  //     try {
  //       const res = await materialService.getCheckMaterials();
  //       materials.value = res.data;
  //       console.log(res);
  //     } catch (e) {
  //       console.log(e);
  //       messageStore.showError("ไม่สามารถดึงข้อมูล CheckMaterial ได้");
  //     }
  //     loadingStore.isLoading = false;
  //   }

  //   async function saveCheckMaterial() {
  //     loadingStore.isLoading = true;
  //     try {
  //       if (editedCheckMaterial.value.mat_id) {
  //         const res = await materialService.updateCheckMaterial(
  //           editedCheckMaterial.value.mat_id,
  //           editedCheckMaterial.value
  //         );
  //       } else {
  //         const res = await materialService.saveCheckMaterial(editedCheckMaterial.value);
  //       }
  //       dialog.value = false;
  //       await getCheckMaterials();
  //     } catch (e) {
  //       messageStore.showError("ไม่สามารถบันทึก CheckMaterial ได้");
  //       console.log(e);
  //     }
  //     loadingStore.isLoading = false;
  //   }

  //   async function deleteCheckMaterial(id: number) {
  //     loadingStore.isLoading = true;
  //     try {
  //       const res = await materialService.deleteCheckMaterial(id);
  //       await getCheckMaterials();
  //     } catch (e) {
  //       console.log(e);
  //       messageStore.showError("ไม่สามารถลบ CheckMaterial ได้");
  //     }
  //     loadingStore.isLoading = false;
  //   }
  //   function editCheckMaterial(material: CheckMaterial) {
  //     editedCheckMaterial.value = JSON.parse(JSON.stringify(material));
  //     dialog.value = true;
  //   }
  return {
    materials,
    getCheckMaterials,
    dialog,
    editedCheckMaterial,
    saveCheckMaterial,
    editCheckMaterial,
    deleteCheckMaterial,
    isTable,
    checkDialog,
    deleteDialog,
    checkCheckMaterial,
  };
});
