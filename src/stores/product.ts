import type Product from "@/types/Product";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useLoadingStore } from "./loading";
import productService from "@/services/product";
import { useMessageStore } from "./message";
import type Category from "@/types/Category";
import category from "@/services/category";

export const useProductStore = defineStore("product", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const dialog = ref(false);
  const isTable = ref(true);
  const checkDialog = ref();
  const deleteDialog = ref(false);
  const products = ref<Product[]>([]);
  const editedProduct = ref<Product & { files: File[] }>({
    product_name: "",

    product_type: "",

    product_size: "",

    product_price: 0,

    categoryId: 1,

    product_image: "no_img_available.jpg",

    files: [],
  });

  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editedProduct.value = {
        product_name: "",

        product_type: "",

        product_size: "",

        product_price: 0,

        categoryId: 1,

        product_image: "no_img_available.jpg",

        files: [],
      };
    }
  });
  watch(category, async (newCategory, oldCategory) => {
    await getProductsByCategory(newCategory);
  });
  async function getProductsByCategory(category: number) {
    loadingStore.isLoading = true;
    try {
      const res = await productService.getProductsByCategory(category);
      products.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Product ได้");
    }
    loadingStore.isLoading = false;
  }
  async function getProducts() {
    loadingStore.isLoading = true;
    try {
      const res = await productService.getProducts();
      products.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Product ได้");
    }
    loadingStore.isLoading = false;
  }

  async function saveProduct() {
    loadingStore.isLoading = true;
    try {
      if (editedProduct.value.product_id) {
        const res = await productService.updateProduct(
          editedProduct.value.product_id,
          editedProduct.value
        );
      } else {
        console.log(editedProduct.value);
        const res = await productService.saveProduct(editedProduct.value);
      }
      dialog.value = false;
      await getProducts();
    } catch (e) {
      messageStore.showError("ไม่สามารถบันทึก Product ได้");
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  async function deleteProduct(id: number) {
    loadingStore.isLoading = true;
    try {
      const res = await productService.deleteProduct(id);
      await getProducts();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถลบ Product ได้");
    }
    loadingStore.isLoading = false;
  }

  function editProduct(product: Product) {
    editedProduct.value = JSON.parse(JSON.stringify(product));
    dialog.value = true;
  }

  return {
    products,
    getProducts,
    dialog,
    editedProduct,
    saveProduct,
    editProduct,
    deleteProduct,
    isTable,
    checkDialog,
    deleteDialog,
  };
});
