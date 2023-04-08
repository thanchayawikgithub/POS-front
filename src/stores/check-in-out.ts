import { ref } from "vue";
import { defineStore } from "pinia";
import checkInOutService from "@/services/checkInOut";
import { useMessageStore } from "./message";
import { useLoadingStore } from "./loading";
import type CheckInOut from "@/types/CheckInOut";

export const useCheckInOutStore = defineStore("check-in-out", () => {
  const checkInDialog = ref(false);
  const checkOutDialog = ref(false);
  const disbtn = ref(false);
  const messageStore = useMessageStore();
  const loadingStore = useLoadingStore();

  const currentCheckInOuts = ref<CheckInOut[]>([]);
  const empCheckOut = ref<CheckInOut>();
  const CheckInOuts = ref<CheckInOut[]>([]);

  async function getCheckInOuts() {
    loadingStore.isLoading = true;
    try {
      const res = await checkInOutService.getCheckInOut();
      CheckInOuts.value = res.data;
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล ChekInOut ได้");
    }
    loadingStore.isLoading = false;
  }

  async function checkIn(username: string, password: string) {
    try {
      const duplicate = currentCheckInOuts.value.find(
        (cio) =>
          cio.employee.employee_name === username && cio.cio_time_out === null
      );
      if (duplicate) {
        checkInDialog.value = false;
        messageStore.showError("this employee already checked in");
        return;
      }
      loadingStore.isLoading = true;
      const check_in_out = await checkInOutService.saveCheckInOut(
        username,
        password
      );
      loadingStore.isLoading = false;

      currentCheckInOuts.value.push(check_in_out.data);
      console.log(check_in_out.data);

      console.log("check in list", currentCheckInOuts.value);
      checkInDialog.value = false;
      messageStore.showMessage("check in success");
    } catch (error) {
      loadingStore.isLoading = false;
      messageStore.showError("username หรือ password ไม่ถูกต้อง");
    }
  }

  async function checkOut(password: string) {
    try {
      loadingStore.isLoading = true;
      const check_in_out = await checkInOutService.updateCheckInOut(
        empCheckOut.value?.cio_id!,
        empCheckOut.value?.employee.employee_login!,
        password
      );
      const index = currentCheckInOuts.value.findIndex(
        (obj) => obj.cio_id === check_in_out.data.cio_id
      );
      if (index !== -1) {
        currentCheckInOuts.value.splice(index, 1, check_in_out.data);
      }
      loadingStore.isLoading = false;
      console.log(check_in_out.data);
      console.log("list", currentCheckInOuts);
      empCheckOut.value = undefined;
      checkOutDialog.value = false;
      messageStore.showMessage("check out success");
    } catch (error) {
      loadingStore.isLoading = false;
      messageStore.showError("username หรือ password ไม่ถูกต้อง");
    }
  }

  return {
    checkInDialog,
    checkOutDialog,
    checkIn,
    getCheckInOuts,
    checkOut,
    currentCheckInOuts,
    empCheckOut,
    disbtn,
    CheckInOuts,
  };
});
