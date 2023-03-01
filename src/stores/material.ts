import type Material from "@/types/Material";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMaterialStore = defineStore("material", () => {
  const materials = ref<Material[]>([]);

  return { materials };
});
