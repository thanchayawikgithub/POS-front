import { defineStore } from "pinia";
import auth from "@/services/auth";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();

  const getEmployee = () => {
    const employeeString = localStorage.getItem("employee");
    if (!employeeString) return null;
    const employee = JSON.parse(employeeString ?? "");
    return employee;
  };
  const isLogin = () => {
    const employee = localStorage.getItem("employee");
    if (employee) {
      return true;
    }
    return false;
  };
  const login = async (username: string, password: string): Promise<void> => {
    loadingStore.isLoading = true;
    try {
      const res = await auth.login(username, password);
      localStorage.setItem("employee", JSON.stringify(res.data.employee));
      localStorage.setItem("token", res.data.access_token);
      // localStorage.setItem("loginName", username);
      console.log("Success");
      router.push("/");
      console.log("after push");
    } catch (e) {
      messageStore.showError("Username หรือ Password ไม่ถูกต้อง");
    }
    loadingStore.isLoading = false;

    // localStorage.setItem("token", userName);
  };
  const logout = () => {
    // authName.value = "";
    localStorage.removeItem("employee");
    localStorage.removeItem("token");
    router.replace("/login");
  };

  // const loadData = () => {
  //   loginName.value = localStorage.getItem("loginName") || "";
  // };

  return { login, logout, isLogin, getEmployee };
});
