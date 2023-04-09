import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import type Store from "@/types/Store";
import { ref } from "vue";
import reportService from "@/services/report";
import type Material from "@/types/Material";
import type DrinkSalesQty from "@/types/DrinkSalesQty";
import type BakerySalesQty from "@/types/BakerySalesQty";
import type FoodSalesQty from "@/types/FoodSalesQty";
import type DayOfWeekTotalSales from "@/types/DayOfWeekTotalSales";
import type DailySales from "@/types/DailySales";
import type CustomerRegisters from "@/types/CustomerRegisters";
export const useReport = defineStore("report", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const storerp = ref<Store[]>([]);
  const matReport = ref<Material[]>([]);
  const DrinkSalesQty = ref<DrinkSalesQty[]>([]);
  const DrinkproductsName = ref<string[]>([]);
  const DrinkproductsQty = ref<number[]>([]);
  const BakerySalesQty = ref<BakerySalesQty[]>([]);
  const BakeryproductsName = ref<string[]>([]);
  const BakeryproductsQty = ref<number[]>([]);
  const FoodSalesQty = ref<FoodSalesQty[]>([]);
  const FoodproductsName = ref<string[]>([]);
  const FoodproductsQty = ref<number[]>([]);
  const DayOfWeekTotalSales = ref<DayOfWeekTotalSales[]>([]);
  const DayOfWeek = ref<string[]>([]);
  const TotalSales = ref<number[]>([]);
  const CustomerRegisters = ref<CustomerRegisters[]>([]);
  const DailySales = ref<DailySales>();
  const total_receipts = ref(0);
  const total_sales = ref(0);
  const month = ref<number[]>([]);
  const members = ref<number[]>([]);
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
        DrinkproductsName.value = DrinkSalesQty.value.map(
          (product) => product.Product_name
        );
        DrinkproductsQty.value = DrinkSalesQty.value.map((product) =>
          parseInt(product.Drink_quantity_sold.toString())
        );
      }
      console.log(DrinkSalesQty.value);
      console.log(DrinkproductsName.value);
      console.log(DrinkproductsQty.value);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Product ได้");
    }
  }

  async function getBakerySalesQty() {
    try {
      const res = await reportService.getProductSalesQtyBakery();
      BakerySalesQty.value = res.data;
      if (BakerySalesQty.value.length > 0) {
        BakeryproductsName.value = BakerySalesQty.value.map(
          (product) => product.Product_name
        );
        BakeryproductsQty.value = BakerySalesQty.value.map((product) =>
          parseInt(product.Bakery_quantity_sold.toString())
        );
      }
      console.log(BakerySalesQty.value);
      console.log(BakeryproductsName.value);
      console.log(BakeryproductsQty.value);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Product ได้");
    }
  }
  async function getFoodSalesQty() {
    try {
      const res = await reportService.getProductSalesQtyFood();
      FoodSalesQty.value = res.data;
      if (FoodSalesQty.value.length > 0) {
        FoodproductsName.value = FoodSalesQty.value.map(
          (product) => product.Product_name
        );
        FoodproductsQty.value = FoodSalesQty.value.map((product) =>
          parseInt(product.Food_quantity_sold.toString())
        );
      }
      console.log(FoodSalesQty.value);
      console.log(FoodproductsName.value);
      console.log(FoodproductsQty.value);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Product ได้");
    }
  }

  async function getDayOfWeekTotalSales() {
    try {
      const res = await reportService.getDayOfWeekTotalSales();
      DayOfWeekTotalSales.value = res.data;
      if (DayOfWeekTotalSales.value.length > 0) {
        DayOfWeek.value = DayOfWeekTotalSales.value.map((day) => day.DayOfWeek);
        TotalSales.value = DayOfWeekTotalSales.value.map((day) =>
          parseInt(day.Total.toString())
        );
      }
      console.log(DayOfWeekTotalSales.value);
      console.log(DayOfWeek.value);
      console.log(TotalSales.value);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Product ได้");
    }
  }

  async function getDailySales() {
    try {
      const res = await reportService.getDailySales();
      DailySales.value = res.data[0];
      if (DailySales.value) {
        total_receipts.value = DailySales.value.total_receipts;
        total_sales.value = DailySales.value.total_sales;
      }
      console.log("dd", res.data);
      console.log("sds", DailySales.value);
      console.log("sds", total_receipts.value);
      console.log("sds", total_sales.value);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Daily Sales ได้");
    }
  }

  async function getCustomersRegister() {
    try {
      const res = await reportService.getCustomersRegister();
      CustomerRegisters.value = res.data;
      if (CustomerRegisters.value.length > 0) {
        members.value = CustomerRegisters.value.map((member) => member.member);
        month.value = CustomerRegisters.value.map((member) => member.MONTH);
      }
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Daily Sales ได้");
    }
  }

  return {
    month,
    members,
    getCustomersRegister,
    DailySales,
    getDailySales,
    DayOfWeek,
    TotalSales,
    getDayOfWeekTotalSales,
    DayOfWeekTotalSales,
    getDrinkSalesQty,
    DrinkSalesQty,
    getStoreRep,
    storerp,
    getMatirial,
    matReport,
    DrinkproductsName,
    DrinkproductsQty,
    getBakerySalesQty,
    BakeryproductsName,
    BakeryproductsQty,
    BakerySalesQty,
    getFoodSalesQty,
    FoodSalesQty,
    FoodproductsName,
    FoodproductsQty,
    total_receipts,
    total_sales,
  };
});
