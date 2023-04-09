import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";

import type VendorMat from "@/types/VendorMat";
import { useAuthStore } from "./auth";
import { useLoadingStore } from "./loading";
import billService from "@/services/bill";
import { useMessageStore } from "./message";
import materialService from "@/services/material";
import type Material from "@/types/Material";
import { useMaterialStore } from "./material";
import type { Bill } from "@/types/Bill";

export const useVendorStore = defineStore("vendor", () => {
  const dialog = ref(false);
  const authStore = useAuthStore();
  const loadingStore = useLoadingStore();
  const selectedMat = ref<VendorMat>();
  const payMaterial = ref(false);
  const paymentMethod = ref("");
  const messageStore = useMessageStore();
  const received = ref(0);
  const changed = ref(0);
  const dis = ref(false);
  const materialStore = useMaterialStore();
  const confirmDialog = ref(false);
  const receiptMaterial = ref(false);
  const selectedVendor = ref("Makro");
  const lastbill = ref<Bill>();
  const vendorMaterials = ref<Material[]>([]);
  const venderShopName = ref<string[]>(["Makro", "Big C", "Lotus"]);

  const orderList = ref<Material[]>([]);

  // watch(selectedVendor, async (newselectedVendor, oldveselectedVendor) => {
  //   console.log(newselectedVendor);
  // });

  watch(selectedVendor, async (newselectedVendor, oldveselectedVendor) => {
    console.log(newselectedVendor);
    getMaterialsByShopName(newselectedVendor);
  });
  const addCart = (item: Material) => {
    if (orderList.value.includes(item)) {
      addAmount(item);
    } else {
      item.mat_buy_amount = 1;
      orderList.value.push(item);
    }
  };

  const addAmount = (item: Material) => {
    item.mat_buy_amount!++;
  };

  const delAmount = (item: Material) => {
    if (item.mat_buy_amount! > 1) {
      item.mat_buy_amount!--;
    } else {
      removeCart(item);
      resetAmount(item);
    }
  };

  const resetAmount = (item: Material) => {
    item.mat_buy_amount! = 1;
  };

  const removeCart = (item: Material) => {
    const index = orderList.value.findIndex(
      (material) => material.mat_buy_amount === item.mat_buy_amount
    );
    orderList.value.pop();
  };
  const totalPrice = computed(function () {
    return orderList.value.reduce(
      (sum, item) => sum + item.mat_price_per_unit * item.mat_buy_amount!,
      0
    );
  });

  async function openBill() {
    const employee: { employee_id: number } = authStore.getEmployee();

    const billDetails = orderList.value.map(
      (item) =>
        <
          {
            materialId: number;
            bill_detail_amount: number;
          }
        >{
          materialId: item.mat_id,
          bill_detail_amount: item.mat_buy_amount,
        }
    );

    // const selectedVendorName = computed(() => {
    //   const vendor = vendorMats.value.find(
    //     (vendor) => vendor.vendor_id === selectedVendor.value
    //   );
    //   return vendor ? vendor.vendor_name : "";
    // });
    const bill = {
      employeeId: employee.employee_id,
      bill_shop_name: selectedVendor.value,
      bill_total: totalPrice.value,
      bill_buy: +received.value,
      bill_change: changed.value,
      billDetails: billDetails,
    };
    loadingStore.isLoading = true;
    try {
      console.log(bill);
      const res = await billService.saveBill(bill);
      lastbill.value = res.data;
      clearOrder();
      materialStore.getMaterials();
      dialog.value = false;
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถบันทึก Order ได้");
    }
    loadingStore.isLoading = false;
  }
  const calChanged = async () => {
    if (received.value < totalPrice.value) {
      messageStore.showError("กรุณาใส่จำนวนเงินใหม่อีกครั้ง");
    } else {
      changed.value = received.value - totalPrice.value;
      payMaterial.value = false;
      await openBill();
      dialog.value = false;
      clearOrder();
      dis.value = false;
      received.value = 0;
      receiptMaterial.value = true;
    }
  };
  const clearOrder = () => {
    orderList.value = [];
  };

  const pay = () => {
    if (orderList.value.length === 0) {
      messageStore.showError("ไม่มีสินค้าที่ถูกเลือก");
    } else {
      payMaterial.value = true;
      received.value = 0;
    }
  };

  async function getMaterialsByShopName(selectedVendor: string) {
    loadingStore.isLoading = true;
    try {
      const res = await materialService.getMaterialsByShopName(selectedVendor);
      vendorMaterials.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Material ได้");
    }
    loadingStore.isLoading = false;
  }

  const payMat = () => {
    if (orderList.value.length === 0) {
      messageStore.showError("ไม่มีสินค้าที่ถูกเลือก");
      // } else if (!customerStore.customer) {
      //   messageStore.showMessage("กรุณาใส่หมายเลขสมาชิก");
    } else {
      payMaterial.value = true;
    }
  };

  return {
    payMat,
    dialog,
    orderList,
    addCart,
    addAmount,
    delAmount,
    selectedMat,
    totalPrice,
    removeCart,
    openBill,
    clearOrder,
    payMaterial,
    paymentMethod,
    received,
    changed,
    calChanged,
    pay,
    getMaterialsByShopName,
    selectedVendor,
    dis,
    vendorMaterials,
    venderShopName,
    confirmDialog,
    receiptMaterial,
    lastbill,
  };
});
