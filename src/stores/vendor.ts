import { ref, computed, watch } from "vue";
import { defineStore } from "pinia";
import type Vendor from "@/types/Vendor";
import type VendorMat from "@/types/VendorMat";

export const useVendorStore = defineStore("vendor", () => {
  const dialog = ref(false);

  const selectedMat = ref<VendorMat>();
  const vendorMat = ref(1);

  const vendorMats = ref<Vendor[]>([
    {
      vendor_id: 1,
      vendor_name: "Makro",
      vendorMat: [
        {
          v_mat_id: 1,
          v_mat_name: "Coffee Beans",
          v_mat_price: 200,
        },
        {
          v_mat_id: 2,
          v_mat_name: "Chocolate",
          v_mat_price: 250,
        },
        {
          v_mat_id: 3,
          v_mat_name: "Green Tea Powder",
          v_mat_price: 180,
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
        },
        {
          v_mat_id: 5,
          v_mat_name: "Lemon",
          v_mat_price: 100,
        },
        {
          v_mat_id: 6,
          v_mat_name: "Milk",
          v_mat_price: 80,
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
        },
        {
          v_mat_id: 8,
          v_mat_name: "Cake Powder",
          v_mat_price: 220,
        },
      ],
    },
  ]);
  const orderList = ref<VendorMat[]>([]);

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
    orderList.value.splice(index, 1);
  };
  const totalPrice = computed(function () {
    return orderList.value.reduce(
      (sum, item) => sum + item.v_mat_price * item.v_mat_amount!,
      0
    );
  });
  return {
    dialog,
    vendorMats,
    orderList,
    addCart,
    addAmount,
    delAmount,
    selectedMat,
    vendorMat,
    totalPrice,
    removeCart,
  };
});
