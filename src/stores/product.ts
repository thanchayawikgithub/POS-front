import type Product from "@/types/Product";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useProductStore = defineStore("product", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const isTable = ref(true);
  const dialog = ref(false);
  const products = ref<Product[]>([]);
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
  async function getCustomer() {
    loadingStore.isLoading = true;
    try {
      const res = await customerService.getCustomers();
      customers.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Customer ได้");
    }
    loadingStore.isLoading = false;
  }

  async function saveCustomer() {
    loadingStore.isLoading = true;
    try {
      if (editedCustomer.value.customer_id) {
        const res = await customerService.updateCustomers(
          editedCustomer.value.customer_id,
          editedCustomer.value
        );
      } else {
        const res = await customerService.saveCustomers(editedCustomer.value);
      }
      dialog.value = false;
      await getCustomer();
    } catch (e) {
      messageStore.showError("ไม่สามารถบันทึก Customer ได้");
      console.log(e);
    }
    loadingStore.isLoading = false;
  }
  async function deleteCustomer(id: number) {
    loadingStore.isLoading = true;
    try {
      const res = await customerService.deleteCustomers(id);
      await getCustomer();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถลบ Customer ได้");
    }
    loadingStore.isLoading = false;
  }
  function editCustomer(customer: Customer) {
    editedCustomer.value = JSON.parse(JSON.stringify(customer));
    dialog.value = true;
  }
  return {
    customers,
    getCustomer,
    dialog,
    editedCustomer,
    saveCustomer,
    editCustomer,
    deleteCustomer,
    isTable,
  };
});
