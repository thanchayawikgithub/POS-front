import { ref } from "vue";
import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", () => {
  const isShow = ref(false);
  const message = ref("");
  const timeout = ref(2000);
  const showMessage = (msg: string, tout: number = 2000) => {
    message.value = msg;
    isShow.value = true;
    timeout.value = tout;
  };
  const closeMessage = () => {
    message.value = "";
    isShow.value = false;
  };
  return { isShow, message, showMessage, closeMessage, timeout };
});
