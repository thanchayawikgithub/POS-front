import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type Vendor from "@/types/Vendor";
import type VendorMat from "@/types/VendorMat";
import { useAuthStore } from "./auth";
import { useLoadingStore } from "./loading";
import billService from "@/services/bill";
import { useMessageStore } from "./message";
import material from "@/services/material";

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
  const selectedVendorMats = ref<Vendor>();
  const selectedVendor = ref(1);
  const vendorMats = ref<Vendor[]>([
    {
      vendor_id: 1,
      vendor_name: "Makro",
      vendorMat: [
        {
          v_mat_id: 1,
          v_mat_name: "Coffee Beans",
          v_mat_price: 200,
          v_mat_vendor_name: "Makro",
        },
        {
          v_mat_id: 2,
          v_mat_name: "Chocolate",
          v_mat_price: 250,
          v_mat_vendor_name: "Makro",
        },
        {
          v_mat_id: 3,
          v_mat_name: "Green Tea Powder",
          v_mat_price: 180,
          v_mat_vendor_name: "Makro",
        },
      ],
    },
    {
      vendor_id: 2,
      vendor_name: "Lotus",
      vendorMat: [
        {
          v_mat_id: 4,
          v_mat_name: "Sugar",
          v_mat_price: 120,
          v_mat_vendor_name: "Lotus",
        },
        {
          v_mat_id: 5,
          v_mat_name: "Lemon",
          v_mat_price: 100,
          v_mat_vendor_name: "Lotus",
        },
        {
          v_mat_id: 6,
          v_mat_name: "Milk",
          v_mat_price: 80,
          v_mat_vendor_name: "Lotus",
        },
      ],
    },
    {
      vendor_id: 3,
      vendor_name: "Big C",
      vendorMat: [
        {
          v_mat_id: 7,
          v_mat_name: "Thai Tea Powder",
          v_mat_price: 130,
          v_mat_vendor_name: "Big C",
        },
        {
          v_mat_id: 8,
          v_mat_name: "Cake Powder",
          v_mat_price: 220,
          v_mat_vendor_name: "Big C",
        },
      ],
    },
  ]);
  const orderList = ref<VendorMat[]>([]);

  watch(selectedVendor, async (newselectedVendor, oldveselectedVendor) => {
    console.log(newselectedVendor);
  });

  const addCart = (item: VendorMat) => {
    if (orderList.value.includes(item)) {
      addAmount(item);
    } else {
      item.v_mat_amount = 1;
      orderList.value.push(item);
    }
  };

  const addAmount = (item: VendorMat) => {
    item.v_mat_amount!++;
  };

  const delAmount = (item: VendorMat) => {
    if (item.v_mat_amount! > 1) {
      item.v_mat_amount!--;
    } else {
      removeCart(item);
      resetAmount(item);
    }
  };

  const resetAmount = (item: VendorMat) => {
    item.v_mat_amount! = 1;
  };

  const removeCart = (item: VendorMat) => {
    const index = orderList.value.findIndex(
      (material) => material.v_mat_amount === item.v_mat_amount
    );
    orderList.value.pop();
  };
  const totalPrice = computed(function () {
    return orderList.value.reduce(
      (sum, item) => sum + item.v_mat_price * item.v_mat_amount!,
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
          materialId: item.v_mat_id,
          bill_detail_amount: item.v_mat_amount,
        }
    );

    const selectedVendorName = computed(() => {
      const vendor = vendorMats.value.find(
        (vendor) => vendor.vendor_id === selectedVendor.value
      );
      return vendor ? vendor.vendor_name : "";
    });
    const bill = {
      employeeId: employee.employee_id,
      bill_shop_name: selectedVendorName.value,
      bill_total: totalPrice.value,
      bill_buy: received.value,
      bill_change: changed.value,
      billDetails: billDetails,
    };
    loadingStore.isLoading = true;
    try {
      console.log(bill);
      const res = await billService.saveBill(bill);
      dialog.value = false;
      clearOrder();
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
      openBill(), (dialog.value = false);
      clearOrder();
      dis.value = false;
      received.value = 0;
    }
  };
  const clearOrder = () => {
    orderList.value = [];
  };
  const pay = () => {
    if (orderList.value.length === 0) {
      messageStore.showMessage("ไม่มีสินค้าที่ถูกเลือก");
    } else {
      payMaterial.value = true;
      received.value = 0;
    }
  };
  return {
    selectedVendorMats,
    dialog,
    vendorMats,
    orderList,
    addCart,
    addAmount,
    delAmount,
    selectedMat,
    selectedVendor,
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
    dis,
  };
});
