import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import type Store from "@/types/Store";
import { ref } from "vue";
import reportService from "@/services/report";
import type Material from "@/types/Material";

export const useReport = defineStore("report", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const storerp = ref<Store[]>([]);
  const matReport = ref<Material[]>([]);

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

  return { getStoreRep, storerp, getMatirial, matReport };
});
