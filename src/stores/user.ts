import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type User from "@/types/User";

export const useUserStore = defineStore("user", () => {
  const lastId = 4;
  const users = ref<User[]>([
    { id: 1, login: "admin", name: "Administrrator", password: "1245678" },
    { id: 2, login: "user1", name: "User1", password: "1245678" },
    { id: 3, login: "user2", name: "User2", password: "1245678" },
  ]);

  const deleteUser = (id: number): void => {
    const index = users.value.findIndex((item) => item.id === id);
    users.value.splice(index, 1);
  };
  return { users, deleteUser };
});
