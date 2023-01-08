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
      pic: "https://static.vecteezy.com/system/resources/previews/011/048/030/non_2x/iced-coffee-watercolor-set-free-png.png",
    },
    {
      id: 2,
      type: "drink",
      name: "Milk",
      price: 55,
      pic: "milk.jpg",
    },
  ]);
  const menuTab: Array<String> = ["Drink", "Bakery", "Food"];
  return { menu, menuTab };
});
