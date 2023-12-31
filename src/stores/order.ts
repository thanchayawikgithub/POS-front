import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type Product from "@/types/Product";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import { useAuthStore } from "./auth";
import recieptService from "@/services/receipt";
import { useCustomerStore } from "./customer";
import { useReceiptStore } from "./receipt";

export const useOrderStore = defineStore("order", () => {
  ///////////
  const orderList = ref<Product[]>([]);
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const authStore = useAuthStore();
  const payDialog = ref(false);
  const dialog = ref(false);
  const paymentMethod = ref("");
  const received = ref(0);
  const changed = ref(0);
  const posDrinkDialog = ref(false);
  const posBakeryDialog = ref(false);
  const posFoodDialog = ref(false);
  const successDialog = ref(false);
  const usePoint = ref(false);
  const billDiscount = ref(0);
  const customerStore = useCustomerStore();
  const usedPoint = ref(0);
  const confirmDialog = ref(false);

  const receiptStore = useReceiptStore();
  const Order = ref<Product>();

  const clearOrder = () => {
    orderList.value = [];
  };
  const addCart = (productItem: Product) => {
    const item = JSON.parse(JSON.stringify(productItem));
    const index = orderList.value.findIndex(
      (element) => element.product_updateName === item.product_updateName
    );
    if (index !== -1) {
      const existingItem = orderList.value[index];
      addAmount(existingItem);
    } else {
      item.product_amount = 1;
      orderList.value.push(item);
    }
  };

  // const addCart = (productItem: Product) => {
  //   const item = JSON.parse(JSON.stringify(productItem));
  //   if (item.categoryId === 1) {
  //     if (
  //       orderList.value.findIndex(
  //         (item) => item.product_updateName === item.product_updateName
  //       )
  //     ) {
  //       addAmount(item);
  //     } else {
  //       item.product_amount = 1;
  //       orderList.value.push(item);
  //     }
  //   } else {
  //     if (orderList.value.includes(item)) {
  //       addAmount(item);
  //     } else {
  //       item.product_amount = 1;
  //       orderList.value.push(item);
  //     }
  //   }
  // };
  const addOrder = (item: Product) => {
    Order.value = item;
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
      (sum, item) => sum + item.product_updatePrice! * item.product_amount!,
      0
    );
  });

  const billPrice = computed(function () {
    if (totalPrice.value - billDiscount.value < 0) {
      return 0;
    } else {
      return totalPrice.value - billDiscount.value;
    }
  });
  ////qr

  const recipientPromptPayId = "0959389589"; // Replace with the recipient's PromptPay ID
  const fixedAmount = "200"; // Replace with the fixed amount to be paid
  const promptPayValue = `promptpay://pay?phone=${recipientPromptPayId}&amount=${fixedAmount}`; // Generate the PromptPay value
  const qrcodeOptions = { type: "svg" };

  async function openOrder() {
    const employee: { employee_id: number } = authStore.getEmployee();
    const customer = customerStore.customer?.customer_id;

    const recieptDetails = orderList.value.map(
      (item) =>
        <
          {
            productId: number;
            rcd_price: number;
            rcd_amount: number;
            rcd_name: string;
          }
        >{
          productId: item.product_id,
          rcd_price: item.product_updatePrice,
          rcd_amount: item.product_amount,
          rcd_name: item.product_updateName,
        }
    );

    const reciept = {
      rec_queue: 1,
      rec_time: 15,
      rec_discount: billDiscount.value,
      rec_total: billPrice.value,
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
      billDiscount.value = 0;
      usedPoint.value = 0;
      clearOrder();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถบันทึก Order ได้");
    }
    customerStore.customer = undefined;
    loadingStore.isLoading = false;
  }

  const calChanged = async () => {
    if (received.value < billPrice.value) {
      messageStore.showError("กรุณาใส่จำนวนเงินใหม่อีกครั้ง");
    } else {
      changed.value = received.value - billPrice.value;
      payDialog.value = false;
      // successDialog.value = true;
      await openOrder();
      received.value = 0;
      await receiptStore.getLastReceipt();
      receiptStore.showDialog = true;
    }
  };

  const pay = () => {
    if (orderList.value.length === 0) {
      messageStore.showError("ไม่มีสินค้าที่ถูกเลือก");
      // } else if (!customerStore.customer) {
      //   messageStore.showMessage("กรุณาใส่หมายเลขสมาชิก");
    } else {
      payDialog.value = true;
    }
  };

  const UpdatePrice = ref(0);
  const UpdatePriceOther = ref(0);
  const UpdateSize = ref(0);
  const UpdateSizeText = ref("");
  const UpdateType = ref("");
  const UpdateOther = ref("");
  const UpdateOther2 = ref("");

  function updateType(add_on_name: string, name: string) {
    if (add_on_name === "Iced") {
      UpdateType.value = add_on_name + " " + name;
    } else if (add_on_name === "Hot") {
      UpdateType.value = add_on_name + " " + name;
    } else if (add_on_name === "Frappe") {
      UpdateType.value = add_on_name + " " + name;
    } else if (add_on_name === "Chicken") {
      UpdateType.value = add_on_name + " " + name;
    } else if (add_on_name === "Pork") {
      UpdateType.value = add_on_name + " " + name;
    } else if (add_on_name === "Seafood") {
      UpdateType.value = add_on_name + " " + name;
    } else if (add_on_name === "Smoothie") {
      UpdateType.value = add_on_name + " " + name;
    }
    return UpdatePrice.value;
  }
  function updateSize(price: number, name: string) {
    if (name === "8 Oz.") {
      UpdateSize.value = price;
    } else if (name === "12 Oz.") {
      UpdateSize.value = price;
    } else if (name === "16 Oz.") {
      UpdateSize.value = price;
    } else if (name === "M") {
      UpdateSize.value = price;
    } else if (name === "L") {
      UpdateSize.value = price;
    }
    return UpdateSize.value;
  }
  function updateSizeText(name: string, sizeName: string) {
    if (name === "8 Oz.") {
      UpdateSizeText.value =
        "(" + sizeName + "  " + Order.value?.product_size_unit + ")";
    } else if (name === "12 Oz.") {
      UpdateSizeText.value =
        "(" + sizeName + "  " + Order.value?.product_size_unit + ")";
    } else if (name === "16 Oz.") {
      UpdateSizeText.value =
        "(" + sizeName + "  " + Order.value?.product_size_unit + ")";
    } else if (name === "M") {
      UpdateSizeText.value = "(" + sizeName + ")";
    } else if (name === "L") {
      UpdateSizeText.value = "(" + sizeName + ")";
    }
    return UpdateSizeText.value;
  }

  function updatePrice(name: string, price: number) {
    if (name === "Iced") {
      UpdatePrice.value = price;
    } else if (name === "Hot") {
      UpdatePrice.value = price - 5;
    } else if (name === "Smoothie") {
      UpdatePrice.value = price + 5;
    } else if (name === "Chicken") {
      UpdatePrice.value = price - 5;
    } else if (name === "Pork") {
      UpdatePrice.value = price;
    } else if (name === "Seafood") {
      UpdatePrice.value = price + 10;
    } else if (name === "Frappe") {
      UpdatePrice.value = price + 5;
    }
    return UpdatePrice.value;
  }
  function updateOther(name: string, Othername: string) {
    if (name === "Not Sweet") {
      UpdateOther.value = Othername;
    } else if (name === "Quarter Sweet") {
      UpdateOther.value = Othername;
    } else if (name === "Less Sweet") {
      UpdateOther.value = Othername;
    } else if (name === "Normal") {
      UpdateOther.value = Othername;
    } else if (name === "More Sweet") {
      UpdateOther.value = Othername;
    }

    return UpdateOther.value;
  }
  function updateOther2(name: string, Othername: string) {
    if (name === "Fried Egg") {
      UpdateOther2.value = Othername;
    } else if (name === "Omelet") {
      UpdateOther2.value = Othername;
    }

    return UpdateOther2.value;
  }
  function updateOtherThaiFood(price: number, name: string) {
    if (name === "Fried Egg") {
      UpdatePriceOther.value = price;
    } else if (name === "Omelet") {
      UpdatePriceOther.value = price;
    }

    return UpdatePriceOther.value;
  }

  function calDiscount() {
    const discountPer10Points = 30;
    const discount = Math.floor(usedPoint.value / 10) * discountPer10Points;
    if (discount > totalPrice.value) {
      messageStore.showError("ไม่สามารถใช้ Point ได้");
      billDiscount.value = totalPrice.value;
    } else if (discount == 0) {
      messageStore.showError("ไม่สามารถใช้ Point ได้");
    } else {
      messageStore.showMessage("ใช้ point สำเร็จ");

      billDiscount.value = discount;
    }
    usePoint.value = false;
  }

  function clearCustomer() {
    customerStore.customer = undefined;
    billDiscount.value = 0;
  }

  const UsePoint = () => {
    if (orderList.value.length === 0) {
      messageStore.showError("ไม่มีสินค้าที่ถูกเลือก");
      // } else if (!customerStore.customer) {
      //   messageStore.showMessage("กรุณาใส่หมายเลขสมาชิก");
    } else {
      usePoint.value = true;
    }
  };

  return {
    UsePoint,
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
    posDrinkDialog,
    addOrder,
    Order,
    posBakeryDialog,
    posFoodDialog,
    updatePrice,
    updateSize,
    UpdatePrice,
    UpdateSize,
    updateSizeText,
    UpdateSizeText,
    updateType,
    UpdateType,
    updateOther,
    UpdateOther,
    usePoint,
    updateOtherThaiFood,
    UpdatePriceOther,
    UpdateOther2,
    updateOther2,
    billDiscount,
    usedPoint,
    calDiscount,
    billPrice,
    clearCustomer,
    promptPayValue,
    qrcodeOptions,
    clearOrder,
    confirmDialog,
  };
});
