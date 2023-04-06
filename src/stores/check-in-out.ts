import { ref } from "vue";
import { defineStore } from "pinia";
import checkInOutService from "@/services/checkInOut";
import { useMessageStore } from "./message";
import { useLoadingStore } from "./loading";
export const useCheckInOutStore = defineStore("check-in-out", () => {
  const checkInDialog = ref(false);
  const checkOutDialog = ref(false);
  const messageStore = useMessageStore();
  const loadingStore = useLoadingStore();
  async function checkIn(username: string, password: string) {
    try {
      loadingStore.isLoading = true;
      await checkInOutService.saveCheckInOut(username, password);
      checkInDialog.value = true;
    } catch (error) {
      messageStore.showError("username หรือ password ไม่ถูกต้อง");
    }
    loadingStore.isLoading = false;
    checkInDialog.value = false;
    messageStore.showMessage("check in success");
  }
  return { checkInDialog, checkOutDialog, checkIn };
});
