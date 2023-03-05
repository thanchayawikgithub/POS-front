import type Product from "@/types/Product";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useLoadingStore } from "./loading";
import productService from "@/services/product";
import { useMessageStore } from "./message";

export const useProductStore = defineStore("product", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const isTable = ref(true);
  const dialog = ref(false);
  const products = ref<Product[]>([]);
  const orderList = ref<Product[]>([]);
  const editedProduct = ref<Product>({
    product_name: "",

    product_type: "",

    product_size: "",

    product_price: 0,

    product_image: "",
  });

  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editedProduct.value = {
        product_name: "",

        product_type: "",

        product_size: "",

        product_price: 0,

        product_image: "",
      };
    }
  });
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

  const addCart = (item: Product) => {
    if (orderList.value.includes(item)) {
      addQty(item);
    } else {
      item.product_qty = 1;
      orderList.value.push(item);
    }
  };

  const addQty = (item: Product) => {
    item.product_qty!++;
  };

  const delQty = (item: Product) => {
    if (item.product_qty! > 1) {
      item.product_qty!--;
    } else {
      removeCart(item);
      resetQty(item);
    }
  };

  const resetQty = (item: Product) => {
    item.product_qty! = 1;
  };

  const removeCart = (item: Product) => {
    const index = orderList.value.findIndex(
      (product) => product.product_id === item.product_id
    );
    orderList.value.splice(index, 1);
  };

  const totalPrice = computed(function () {
    return orderList.value.reduce(
      (sum, item) => sum + item.product_price * item.product_qty!,
      0
    );
  });

  return {
    products,
    getProducts,
    dialog,
    editedProduct,
    saveProduct,
    editProduct,
    deleteProduct,
    isTable,
    orderList,
    addCart,
    addQty,
    delQty,
    totalPrice,
  };
});
