import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import type Category from "@/types/Category";
import categoryService from "@/services/category";

export const useCategoryStore = defineStore("category", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const checkDialog = ref();
  const deleteDialog = ref(false);
  const isTable = ref(true);
  const dialog = ref(false);
  const categorys = ref<Category[]>([]);
  const editedCategory = ref<Category>({
    category_name: "",
  });
  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editedCategory.value = {
        category_name: "",
      };
    }
  });

  async function getCategorys() {
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

  async function saveCategory() {
    loadingStore.isLoading = true;
    try {
      if (editedCategory.value.category_id) {
        const res = await categoryService.updateCategory(
          editedCategory.value.category_id,
          editedCategory.value
        );
      } else {
        const res = await categoryService.saveCategory(editedCategory.value);
      }
      dialog.value = false;
      await getCategorys();
    } catch (e) {
      messageStore.showError("ไม่สามารถบันทึก Category ได้");
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  async function deleteCategory(id: number) {
    loadingStore.isLoading = true;
    try {
      const res = await categoryService.deleteCategory(id);
      await getCategorys();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถลบ Category ได้");
    }
    loadingStore.isLoading = false;
  }

  function editCategory(category: Category) {
    editedCategory.value = JSON.parse(JSON.stringify(category));
    dialog.value = true;
  }
  return {
    getCategorys,
    categorys,
    editedCategory,
    editCategory,
    deleteCategory,
    saveCategory,
    checkDialog,
    deleteDialog,
    isTable,
  };
});
