import type CheckMaterialDetail from "@/types/CheckMaterialDetail";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import materialService from "@/services/material";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import type Material from "@/types/Material";

export const useCheckMaterialDetailStore = defineStore(
  "checkMaterialDetail",
  () => {
    const loadingStore = useLoadingStore();
    const messageStore = useMessageStore();
    const checkDialog = ref();
    const orderList = ref<Material[]>([]);
    const deleteDialog = ref(false);
    const isTable = ref(true);
    const dialog = ref(false);
    const checkCheckMaterialDetail = ref(false);
    const materials = ref<CheckMaterialDetail[]>([]);
    //   const editedCheckMaterialDetail = ref<CheckMaterialDetail>({
    //     mat_name: "",
    //     mat_min_quantity: 0,
    //     mat_quantity: 0,
    //     mat_unit: "",
    //     mat_price_per_unit: 0,
    //   });

    //   watch(dialog, (newDialog, oldDialog) => {
    //     if (!newDialog) {
    //       editedCheckMaterialDetail.value = {
    //         mat_name: "",
    //         mat_min_quantity: 0,
    //         mat_quantity: 0,
    //         mat_unit: "",
    //         mat_price_per_unit: 0,
    //       };
    //     }
    //   });
    //   async function getCheckMaterialDetails() {
    //     loadingStore.isLoading = true;
    //     try {
    //       const res = await materialService.getCheckMaterialDetails();
    //       materials.value = res.data;
    //       console.log(res);
    //     } catch (e) {
    //       console.log(e);
    //       messageStore.showError("ไม่สามารถดึงข้อมูล CheckMaterialDetail ได้");
    //     }
    //     loadingStore.isLoading = false;
    //   }

    //   async function saveCheckMaterialDetail() {
    //     loadingStore.isLoading = true;
    //     try {
    //       if (editedCheckMaterialDetail.value.mat_id) {
    //         const res = await materialService.updateCheckMaterialDetail(
    //           editedCheckMaterialDetail.value.mat_id,
    //           editedCheckMaterialDetail.value
    //         );
    //       } else {
    //         const res = await materialService.saveCheckMaterialDetail(editedCheckMaterialDetail.value);
    //       }
    //       dialog.value = false;
    //       await getCheckMaterialDetails();
    //     } catch (e) {
    //       messageStore.showError("ไม่สามารถบันทึก CheckMaterialDetail ได้");
    //       console.log(e);
    //     }
    //     loadingStore.isLoading = false;
    //   }

    //   async function deleteCheckMaterialDetail(id: number) {
    //     loadingStore.isLoading = true;
    //     try {
    //       const res = await materialService.deleteCheckMaterialDetail(id);
    //       await getCheckMaterialDetails();
    //     } catch (e) {
    //       console.log(e);
    //       messageStore.showError("ไม่สามารถลบ CheckMaterialDetail ได้");
    //     }
    //     loadingStore.isLoading = false;
    //   }
    //   function editCheckMaterialDetail(material: CheckMaterialDetail) {
    //     editedCheckMaterialDetail.value = JSON.parse(JSON.stringify(material));
    //     dialog.value = true;
    //   }
    return {
      materials,
      // getCheckMaterialDetails,
      dialog,
      // editedCheckMaterialDetail,
      // saveCheckMaterialDetail,
      // editCheckMaterialDetail,
      // deleteCheckMaterialDetail,
      isTable,
      checkDialog,
      deleteDialog,
      checkCheckMaterialDetail,
      orderList,
    };
  }
);
