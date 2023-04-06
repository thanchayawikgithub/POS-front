import { ref } from "vue";
import { defineStore } from "pinia";
import checkInOutService from "@/services/checkInOut";
import { useMessageStore } from "./message";
import { useLoadingStore } from "./loading";
import type CheckInOut from "@/types/CheckInOut";

export const useCheckInOutStore = defineStore("check-in-out", () => {
  const checkInDialog = ref(false);
  const checkOutDialog = ref(false);
  const messageStore = useMessageStore();
  const loadingStore = useLoadingStore();
  const status = ref("");
  const currentCheckIn = ref<number>();
  const checkInOutList = ref<CheckInOut[]>([]);
  async function checkIn(username: string, password: string) {
    try {
      loadingStore.isLoading = true;
      const res = await checkInOutService.saveCheckInOut(username, password);
      loadingStore.isLoading = false;
      currentCheckIn.value = res.data.cio_id;
      status.value = "checked in";
      console.log(res);
      console.log(currentCheckIn.value);
      checkInDialog.value = false;
      messageStore.showMessage("check in success");
    } catch (error) {
      loadingStore.isLoading = false;
      messageStore.showError("username หรือ password ไม่ถูกต้อง");
    }
  }

  async function checkOut(username: string, password: string) {
    try {
      loadingStore.isLoading = true;
      const res = await checkInOutService.updateCheckInOut(
        currentCheckIn.value!,
        username,
        password
      );
      loadingStore.isLoading = false;
      console.log(res.data);
      status.value = "checked out";
      currentCheckIn.value = undefined;
      checkOutDialog.value = false;
      messageStore.showMessage("check out success");
    } catch (error) {
      loadingStore.isLoading = false;
      messageStore.showError("username หรือ password ไม่ถูกต้อง");
    }
  }
  return { checkInDialog, checkOutDialog, checkIn, status, checkOut };
});
