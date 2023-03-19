import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Product from "@/types/Product";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import { useAuthStore } from "./auth";
import recieptService from "@/services/reciept";
import { useCustomerStore } from "./customer";
import type Customer from "@/types/Customer";
export const useOrderStore = defineStore("order", () => {
  const orderList = ref<Product[]>([]);
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const authStore = useAuthStore();
  const payDialog = ref(false);
  const dialog = ref(false);
  const paymentMethod = ref("");
  const received = ref(0);
  const changed = ref(0);
  const successDialog = ref(false);
  const customerStore = useCustomerStore();
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
    const customer = customerStore.customer?.customer_id;

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
      rec_total: totalPrice.value,
      rec_received: +received.value,
      rec_payment: paymentMethod.value,
      rec_changed: changed.value,
      employeeId: employee.employee_id,
      storeId: 1,
      customerId: customer !== undefined ? customer : 0,
      recieptDetails: recieptDetails,
    };
    loadingStore.isLoading = true;
    try {
      console.log(reciept);
      const res = await recieptService.saveReciept(reciept);
      dialog.value = false;
      clearOrder();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถบันทึก Order ได้");
    }
    customerStore.customer = undefined;
    console.log(customerStore.customer);
    loadingStore.isLoading = false;
  }

  const calChanged = () => {
    if (received.value < totalPrice.value) {
      messageStore.showError("กรุณาใส่จำนวนเงินใหม่อีกครั้ง");
    } else {
      changed.value = received.value - totalPrice.value;
      payDialog.value = false;
      successDialog.value = true;
      openOrder();
    }
  };

  const pay = () => {
    if (orderList.value.length === 0) {
      messageStore.showMessage("ไม่มีสินค้าที่ถูกเลือก");
    } else if (!customerStore.customer) {
      messageStore.showMessage("กรุณาใส่หมายเลขสมาชิก");
    } else {
      payDialog.value = true;
    }
  };
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
    paymentMethod,
    received,
    changed,
    successDialog,
    calChanged,
    pay,
  };
});
