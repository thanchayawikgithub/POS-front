import { ref } from "vue";
import { defineStore } from "pinia";
import type Menu from "@/types/Menu";

export const useMenuStore = defineStore("menu", () => {
  const menu = ref<Menu[]>([
    {
      id: 1,
      type: "drink",
      name: "Coffee",
      price: 60,
      pic: "asas",
    },
    {
      id: 2,
      type: "drink",
      name: "Milk",
      price: 55,
      pic: "sdsd",
    },
  ]);
  const menuTab: Array<String> = ["Drink", "Bakery", "Food"];
  return { menu, menuTab };
});
