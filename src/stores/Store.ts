import type Store from "@/types/Store";
import { defineStore } from "pinia";
import { ref } from "vue";
import StoreService from "@/services/store";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useStoreStore = defineStore("store", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const isTable = ref(true);
  const dialog = ref(false);
  const stores = ref<Store[]>([]);

  async function getStore() {
    loadingStore.isLoading = true;
    try {
      const res = await StoreService.getStores();
      stores.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล store ได้");
    }
    loadingStore.isLoading = false;
  }
  return { getStore, isTable, dialog, stores };
});
