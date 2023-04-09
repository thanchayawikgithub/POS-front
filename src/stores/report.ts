import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import type Store from "@/types/Store";
import { ref } from "vue";
import reportService from "@/services/report";
import type Material from "@/types/Material";
import type DrinkSalesQty from "@/types/DrinkSalesQty";

export const useReport = defineStore("report", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const storerp = ref<Store[]>([]);
  const matReport = ref<Material[]>([]);
  const DrinkSalesQty = ref<DrinkSalesQty[]>([]);
  const productsName = ref<string[]>([]);
  const productsQty = ref<number[]>([]);
  async function getStoreRep() {
    loadingStore.isLoading = true;
    try {
      const res = await reportService.getStoreRep();
      storerp.value = res.data;
      console.log(res.data);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Store ได้");
    }
    loadingStore.isLoading = false;
  }

  async function getMatirial() {
    try {
      const res = await reportService.getMatirial();
      matReport.value = res.data;
      console.log(res.data);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Material");
    }
  }

  async function getDrinkSalesQty() {
    try {
      const res = await reportService.getProductSalesQtyDrink();
      DrinkSalesQty.value = res.data;
      if (DrinkSalesQty.value.length > 0) {
        productsName.value = DrinkSalesQty.value.map(
          (product) => product.Product_name
        );
        productsQty.value = DrinkSalesQty.value.map((product) =>
          parseInt(product.Drink_quantity_sold.toString())
        );
      }
      console.log(DrinkSalesQty.value);
      console.log(productsName.value);
      console.log(productsQty.value);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Product ได้");
    }
  }

  return {
    getDrinkSalesQty,
    DrinkSalesQty,
    getStoreRep,
    storerp,
    getMatirial,
    matReport,
    productsName,
    productsQty,
  };
});
