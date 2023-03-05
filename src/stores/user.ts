import { ref, watch } from "vue";
import { defineStore } from "pinia";
import type User from "@/types/User";
import userService from "@/services/user";
import { useLoadingStore } from "./loading";
import { useMessageStore } from "./message";

export const useUserStore = defineStore("user", () => {
  const loadingStore = useLoadingStore();
  const messageStore = useMessageStore();
  const checkDialog = ref();
  const deleteDialog = ref(false);
  const dialog = ref(false);
  const isTable = ref(true);
  const editedUser = ref<User>({
    user_login: "",
    user_name: "",
    user_password: "",
    user_role: "",
  });

  const users = ref<User[]>([]);

  watch(dialog, (newDialog, oldDialog) => {
    if (!newDialog) {
      editedUser.value = {
        user_login: "",
        user_name: "",
        user_password: "",
        user_role: "",
      };
    }
  });

  const login = (username: string, password: string): boolean => {
    const index = users.value.findIndex((item) => item.user_login === username);
    if (index >= 0) {
      const user = users.value[index];
      if (user.user_password === password) {
        return true;
      }
      return false;
    }
    return false;
  };
  async function getUsers() {
    loadingStore.isLoading = true;
    try {
      const res = await userService.getUsers();
      users.value = res.data;
      console.log(res);
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถดึงข้อมูล Employee ได้");
    }
    loadingStore.isLoading = false;
  }

  async function saveUser() {
    loadingStore.isLoading = true;
    try {
      if (editedUser.value.user_id) {
        const res = await userService.updateUser(
          editedUser.value.user_id,
          editedUser.value
        );
      } else {
        const res = await userService.saveUser(editedUser.value);
      }
      dialog.value = false;
      await getUsers();
    } catch (e) {
      messageStore.showError("ไม่สามารถบันทึก Employee ได้");
      console.log(e);
    }
    loadingStore.isLoading = false;
  }

  const editUser = (user: User) => {
    editedUser.value = JSON.parse(JSON.stringify(user));
    dialog.value = true;
  };

  async function deleteUser(id: number) {
    loadingStore.isLoading = true;
    try {
      const res = await userService.deleteUser(id);
      await getUsers();
    } catch (e) {
      console.log(e);
      messageStore.showError("ไม่สามารถลบ Employee ได้");
    }
    loadingStore.isLoading = false;
  }
  const clear = () => {
    editedUser.value = {
      user_login: "",
      user_name: "",
      user_password: "",
      user_role: "",
    };
  };
  return {
    users,
    deleteUser,
    dialog,
    editedUser,
    clear,
    saveUser,
    editUser,
    isTable,
    login,
    getUsers,
    checkDialog,
    deleteDialog,
  };
});
