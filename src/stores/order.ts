import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Product from "@/types/Product";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import { useAuthStore } from "./auth";
import recieptService from "@/services/reciept";
export const useOrderStore = defineStore("order", () => {
  const orderList = ref<Product[]>([]);
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const authStore = useAuthStore();
  const payDialog = ref(false);
  const dialog = ref(false);
  async function getOrder() {
    loadingStore.isLoading = true;
    try {
      const res = await recieptService.getReciept();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล order ได้");
    }
  }
  const clearOrder = () => {
    orderList.value = [];
  };
  const addCart = (item: Product) => {
    if (orderList.value.includes(item)) {
      addAmount(item);
    } else {
      item.product_amount = 1;
      orderList.value.push(item);
    }
  };

  const addAmount = (item: Product) => {
    item.product_amount!++;
  };

  const delAmount = (item: Product) => {
    if (item.product_amount! > 1) {
      item.product_amount!--;
    } else {
      removeCart(item);
      resetAmount(item);
    }
  };

  const resetAmount = (item: Product) => {
    item.product_amount! = 1;
  };

  const removeCart = (item: Product) => {
    const index = orderList.value.findIndex(
      (product) => product.product_id === item.product_id
    );
    orderList.value.splice(index, 1);
  };

  const totalPrice = computed(function () {
    return orderList.value.reduce(
      (sum, item) => sum + item.product_price * item.product_amount!,
      0
    );
  });

  async function openOrder() {
    const employee: { employee_id: number } = authStore.getEmployee();
    const recieptDetails = orderList.value.map(
      (item) =>
        <
          {
            productId: number;
            rcd_amount: number;
          }
        >{
          productId: item.product_id,
          rcd_amount: item.product_amount,
        }
    );

    const reciept = {
      rec_queue: 1,
      rec_time: 15,
      rec_discount: 0,
      rec_received: 200,
      rec_payment: "cash",
      employeeId: employee.employee_id,
      storeId: 1,
      customerId: 1,
      recieptDetails: recieptDetails,
    };
    loadingStore.isLoading = true;
    try {
      console.log(reciept);
      const res = await recieptService.saveReciept(reciept);
      dialog.value = false;
      clearOrder();
      // await getOrder();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถบันทึก Order ได้");
    }
    loadingStore.isLoading = false;
  }

  return {
    orderList,
    addCart,
    addAmount,
    delAmount,
    resetAmount,
    removeCart,
    totalPrice,
    openOrder,
    payDialog,
  };
});
