import type Material from "@/types/Material";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "./auth";
import checkMaterialService from "../services/checkMaterial";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import { useMaterialStore } from "./material";

export const useCheckMaterialStore = defineStore("checkMaterial", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const deleteDialog = ref(false);
  const isTable = ref(true);
  const dialog = ref(false);
  const checkMaterialList = ref<Material[]>([]);
  const material = ref<Material>();
  const authStore = useAuthStore();
  const materialStore = useMaterialStore();

  const addList = () => {
    if (!material.value || checkMaterialList.value.includes(material.value)) {
      return;
    } else {
      checkMaterialList.value.push(material.value);
    }
    console.log(checkMaterialList.value);
  };

  const delList = (item: Material) => {
    const index = checkMaterialList.value.findIndex(
      (material) => material.mat_id === item.mat_id
    );
    checkMaterialList.value.splice(index, 1);
  };

  const clearList = () => {
    checkMaterialList.value = [];
    material.value = undefined;
  };

  async function openCheckMaterial() {
    const employee: { employee_id: number } = authStore.getEmployee();
    const checkMaterialDetails = materialStore.materials.map(
      (item) =>
        <
          {
            MaterialId: number;
            cmd_qty_remain: number;
            cmd_qty_expire: Date;
          }
        >{
          MaterialId: item.mat_id,
          cmd_qty_remain: item.mat_check,
          cmd_qty_expire: item.mat_exp,
        }
    );

    const checkMaterial = {
      EmployeeId: employee.employee_id,
      checkMaterialDetails: checkMaterialDetails,
    };
    loadingStore.isLoading = true;
    try {
      console.log(checkMaterial);
      const res = await checkMaterialService.saveCheckMaterial(checkMaterial);
      dialog.value = false;
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถบันทึก checkMaterial ได้");
    }
    await materialStore.getMaterials();
    loadingStore.isLoading = false;
    clearList();
  }
  return {
    checkMaterialList,
    dialog,
    material,
    addList,
    delList,
    clearList,
    openCheckMaterial,
  };
});
