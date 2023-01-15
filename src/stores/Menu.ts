import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type Menu from "@/types/Menu";

export const useMenuStore = defineStore("menu", () => {
  const menu = ref<Menu[]>([
    {
      id: 1,
      type: "drink",
      name: "Coffee",
      price: 50,
      pic: "https://static.vecteezy.com/system/resources/previews/011/048/030/non_2x/iced-coffee-watercolor-set-free-png.png",
      qty: 1,
    },
    {
      id: 2,
      type: "drink",
      name: "Milk",
      price: 45,
      pic: "milk.png",
      qty: 1,
    },
    {
      id: 3,
      type: "drink",
      name: "Tea",
      price: 45,
      pic: "milk.png",
      qty: 1,
    },
    {
      id: 4,
      type: "drink",
      name: "Soda",
      price: 30,
      pic: "milk.png",
      qty: 1,
    },
  ]);

  // const orderList = ref([]);
  const orderList = ref<Menu[]>([]);
  const addCart = (item: {
    id: number;
    type: string;
    name: string;
    price: number;
    pic: string;
    qty: number;
  }) => {
    if (orderList.value.includes(item)) {
      addQty(item);
    } else {
      orderList.value.push(item);
    }
  };

  const addQty = (item: {
    id: number;
    type: string;
    name: string;
    price: number;
    pic: string;
    qty: number;
  }) => {
    item.qty++;
  };

  const delQty = (item: {
    id: number;
    type: string;
    name: string;
    price: number;
    pic: string;
    qty: number;
  }) => {
    if (item.qty > 1) {
      item.qty--;
    } else {
      removeCart(item);
      resetQty(item);
    }
  };

  const resetQty = (item: {
    id: number;
    type: string;
    name: string;
    price: number;
    pic: string;
    qty: number;
  }) => {
    item.qty = 1;
  };

  const removeCart = (item: {
    id: number;
    type: string;
    name: string;
    price: number;
    pic: string;
    qty: number;
  }) => {
    const index = orderList.value.findIndex((menu) => menu.id === item.id);
    orderList.value.splice(index, 1);
  };

  const totalPrice = computed(function () {
    return orderList.value.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  });

  return { menu, orderList, addCart, addQty, delQty, totalPrice };
});
