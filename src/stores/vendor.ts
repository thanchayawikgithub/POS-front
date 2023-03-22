import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Vendor from "@/types/Vendor";

export const useVendorStore = defineStore("vendor", () => {
  const dialog = ref(false);
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
  return { dialog, vendorMats };
});
