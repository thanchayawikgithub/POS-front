import type { Bill } from "@/types/Bill";
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import billService from "@/services/bill";
export const useBillStore = defineStore("bill", () => {
  const bills = ref<Bill[]>([]);
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const page = ref(1);
  const take = ref(10);
  const keyword = ref("");
  const lastPage = ref(0);

  watch(page, async (newPage, oldPage) => {
    await getBills();
  });

  watch(keyword, async (newKeyword, oldKeyword) => {
    await getBills();
  });

  watch(lastPage, async (newLastPage, oldLastPage) => {
    if (newLastPage < page.value) {
      page.value = 1;
    }
  });
  async function getBills() {
    loadingStore.isLoading = true;
    try {
      const res = await billService.getBills({
        page: page.value,
        take: take.value,
        keyword: keyword.value,
      });
      bills.value = res.data.data;
      lastPage.value = res.data.lastPage;
      console.log(bills.value);
      bills.value.forEach((bill, index) => {
        bills.value[index] = { ...bill, show: false };
      });
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Bill ได้");
    }
    loadingStore.isLoading = false;
  }
  return { getBills, bills, lastPage, page };
});
