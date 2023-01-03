import { ref } from "vue";
import { defineStore } from "pinia";
import type User from "@/types/User";

export const useUserStore = defineStore("user", () => {
  const dialog = ref(false);
  const isTable = ref(true);
  const editedUser = ref<User>({ id: -1, login: "", name: "", password: "" });
  let lastId = 4;
  const users = ref<User[]>([
    {
      id: 1,
      login: "admin",
      name: "Administrator",
      password: "Pass@1234",
    },
    {
      id: 2,
      login: "user1",
      name: "User 1",
      password: "Pass@1234",
    },
    {
      id: 3,
      login: "user2",
      name: "User 2",
      password: "Pass@1234",
    },
  ]);
  const login = (loginName: string, password: string): boolean => {
    const index = users.value.findIndex((item) => item.login === loginName);
    if (index >= 0) {
      const user = users.value[index];
      if (user.password === password) {
        return true;
      }
      return false;
    }
    return false;
  };
  const saveUser = () => {
    if (editedUser.value.id < 0) {
      editedUser.value.id = lastId++;
      users.value.push(editedUser.value);
    } else {
      const index = users.value.findIndex(
        (item) => item.id === editedUser.value.id
      );
      users.value[index] = editedUser.value;
    }
    dialog.value = false;
    clear();
  };

  const editUser = (user: User) => {
    editedUser.value = { ...user };
    dialog.value = true;
  };

  const deleteUser = (id: number): void => {
    const index = users.value.findIndex((item) => item.id === id);
    users.value.splice(index, 1);
  };
  const clear = () => {
    editedUser.value = { id: -1, login: "", name: "", password: "" };
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
  };
});
