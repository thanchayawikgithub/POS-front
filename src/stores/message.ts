import { ref } from "vue";
import { defineStore } from "pinia";

export enum DialogType {
  info,
  error,
  confirm,
}

export const useMessageStore = defineStore("message", () => {
  const isShow = ref(false);
  const message = ref("");
  const type = ref<DialogType>(DialogType.info);
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
  function showError(text: string) {
    type.value = DialogType.error;
    message.value = text;
    isShow.value = true;
  }
  return { isShow, message, showMessage, closeMessage, timeout, showError };
});
