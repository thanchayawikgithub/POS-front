import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useEmployeeStore } from "./employee";
import { useMessageStore } from "./message";
export const useLoginStore = defineStore("login", () => {
  const useMessage = useMessageStore();
  const employeeStore = useEmployeeStore();
  const loginName = ref("");
  const isLogin = computed(() => {
    return loginName.value !== "";
  });
  const login = (userName: string, password: string): void => {
    if (employeeStore.login(userName, password)) {
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
