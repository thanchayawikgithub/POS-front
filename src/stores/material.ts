import type Material from "@/types/Material";
import http from "@/services/axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import materialService from "@/services/material";

export const useMaterialStore = defineStore("Material", () => {
  const dialog = ref(false);
  const materials = ref<Material[]>([]);
  const editMaterials = ref<Material>({
    mat_name: "",
    mat_min_quantity: 0,
    mat_quantity: 0,
    mat_unit: 0,
    mat_price_per_unit: 0,
  });
  async function getMaterials() {
    try {
      const res = await materialService.getMaterials();
      materials.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  return { materials, getMaterials, dialog, editMaterials };
});
