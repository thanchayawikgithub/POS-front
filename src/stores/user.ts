import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type User from "@/types/User";

export const useUserStore = defineStore("user", () => {
  const lastId = 3;
  const users = ref<User[]>([
    { id: 1, login: "admin", name: "Administrrator", password: "1245678" },
    { id: 2, login: "user1", name: "User1", password: "1245678" },
  ]);

  return { users };
});
