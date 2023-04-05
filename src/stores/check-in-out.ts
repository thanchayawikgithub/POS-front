import { ref } from "vue";
import { defineStore } from "pinia";
import checkInOutService from "@/services/checkInOut";
export const useCheckInOutStore = defineStore("check-in-out", () => {
  const checkInDialog = ref(false);
  const checkOutDialog = ref(false);

  async function checkIn(username: string, password: string) {
    await checkInOutService.saveCheckInOut(username, password);
  }
  return { checkInDialog, checkOutDialog, checkIn };
});
