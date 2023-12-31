import type Customer from "@/types/Customer";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import customerService from "@/services/customer";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useCustomerStore = defineStore("customer", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const checkDialog = ref();
  const deleteDialog = ref(false);
  const isTable = ref(true);
  const dialog = ref(false);
  const customers = ref<Customer[]>([]);
  const customer = ref<Customer>();
  const searchDialog = ref(false);
  const customerTel = ref("");
  const page = ref(1);
  const take = ref(10);
  const keyword = ref("");
  const lastPage = ref(0);

  const editedCustomer = ref<Customer>({
    customer_name: "",
    customer_tel: "",
  });

  watch(page, async (newPage, oldPage) => {
    await getCustomer();
  });

  watch(keyword, async (newKeyword, oldKeyword) => {
    await getCustomer();
  });

  watch(lastPage, async (newLastPage, oldLastPage) => {
    if (newLastPage < page.value) {
      page.value = 1;
    }
  });

  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editedCustomer.value = {
        customer_name: "",
        customer_tel: "",
      };
    }
  });
  async function getCustomer() {
    loadingStore.isLoading = true;
    try {
      const res = await customerService.getCustomers({
        page: page.value,
        take: take.value,
        keyword: keyword.value,
      });
      customers.value = res.data.data;
      lastPage.value = res.data.lastPage;
      console.log(customers.value);
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

  async function getCustomerByTel(tel: string) {
    try {
      const res = await customerService.getCustomerByTel(tel);
      customer.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Customer ได้");
    }
    loadingStore.isLoading = false;
  }

  async function searchCustomer() {
    searchDialog.value = false;
    await getCustomerByTel(customerTel.value);
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
    checkDialog,
    deleteDialog,
    getCustomerByTel,
    searchDialog,
    customerTel,
    searchCustomer,
    customer,
    lastPage,
    page,
    keyword,
  };
});
