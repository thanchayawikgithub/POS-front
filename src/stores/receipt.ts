import { ref, computed, watch } from "vue";
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
  const page = ref(1);
  const take = ref(10);
  const keyword = ref("");
  const lastPage = ref(0);

  watch(page, async (newPage, oldPage) => {
    await getReceipts();
  });

  watch(lastPage, async (newLastPage, oldLastPage) => {
    if (newLastPage < page.value) {
      page.value = 1;
    }
  });

  async function getReceipts() {
    loadingStore.isLoading = true;
    try {
      const res = await receiptService.getReciept({
        page: page.value,
        take: take.value,
        // keyword: keyword.value,
      });
      receipts.value = res.data.data;
      lastPage.value = res.data.lastPage;
      console.log(receipts.value);
      receipts.value.forEach((receipt, index) => {
        receipts.value[index] = { ...receipt, show: false };
      });
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

  return {
    getReceipts,
    receipts,
    showDialog,
    lastReceipt,
    getLastReceipt,
    lastPage,
    page,
  };
});
