import { ref } from "vue";
import { defineStore } from "pinia";
import auth from "@/services/auth";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const authName = ref("");

  const isLogin = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    }
    return false;
  };
  const login = async (username: string, password: string): Promise<void> => {
    loadingStore.isLoading = true;
    try {
      const res = await auth.login(username, password);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.access_token);
      // localStorage.setItem("loginName", username);
      console.log("Success");
      router.push("/");
    } catch (e) {
      messageStore.showError("Username หรือ Password ไม่ถูกต้อง");
    }
    loadingStore.isLoading = false;

    // localStorage.setItem("token", userName);
  };
  const logout = () => {
    // authName.value = "";
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.replace("/login");
  };

  // const loadData = () => {
  //   loginName.value = localStorage.getItem("loginName") || "";
  // };

  return { login, logout, isLogin, authName };
});
