import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { useMessageStore } from "./message";
export const useLoginStore = defineStore("login", () => {
  const useMessage = useMessageStore();
  const userStore = useUserStore();
  const loginName = ref("");
  const isLogin = computed(() => {
    return loginName.value !== "";
  });
  const login = (userName: string, password: string): void => {
    if (userStore.login(userName, password)) {
      loginName.value = userName;
      localStorage.setItem("loginName", userName);
    } else {
      useMessage.showMessage("Login หรือ Password ไม่ถูกต้อง");
    }
  };
  const logout = () => {
    loginName.value = "";
    localStorage.removeItem("loginName");
  };
  const loadData = () => {
    loginName.value = localStorage.getItem("loginName") || "";
  };

  return { loginName, isLogin, login, logout, loadData };
});
