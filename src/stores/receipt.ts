import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Receipt from "@/types/Receipt";
import { useLoadingStore } from "./loading";
import receiptService from "../services/receipt";
import { useMessageStore } from "./message";

export const useReceiptStore = defineStore("receipt", () => {
  const receipts = ref<Receipt[]>([]);
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const showDialog = ref(false);
  const lastReceipt = ref<Receipt>();

  async function getReceipts() {
    loadingStore.isLoading = true;
    try {
      const res = await receiptService.getReciept();
      receipts.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Receipt ได้");
    }
    loadingStore.isLoading = false;
  }

  async function getLastReceipt() {
    loadingStore.isLoading = true;
    try {
      const res = await receiptService.getLastReceipt();
      lastReceipt.value = res.data;
      console.log(lastReceipt.value);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Receipt ได้");
    }
    loadingStore.isLoading = false;
  }

  return { getReceipts, receipts, showDialog, lastReceipt, getLastReceipt };
});
