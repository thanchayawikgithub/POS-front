import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import type Category from "@/types/Category";
import categoryService from "@/services/category";

export const useCategoryStore = defineStore("category", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const categorys = ref<Category[]>([]);

  async function getCategory() {
    loadingStore.isLoading = true;
    try {
      const res = await categoryService.getCategorys();
      categorys.value = res.data;
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Category ได้");
    }
    loadingStore.isLoading = false;
  }
  return { getCategory, categorys };
});
