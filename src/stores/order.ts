import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type Product from "@/types/Product";

export const useOrderStore = defineStore("order", () => {
  const orderList = ref<Product[]>([]);

  const addCart = (item: Product) => {
    if (orderList.value.includes(item)) {
      addQty(item);
    } else {
      item.product_qty = 1;
      orderList.value.push(item);
    }
    console.log(orderList.value);
  };

  const addQty = (item: Product) => {
    item.product_qty!++;
  };

  const delQty = (item: Product) => {
    if (item.product_qty! > 1) {
      item.product_qty!--;
    } else {
      removeCart(item);
      resetQty(item);
    }
  };

  const resetQty = (item: Product) => {
    item.product_qty! = 1;
  };

  const removeCart = (item: Product) => {
    const index = orderList.value.findIndex(
      (product) => product.product_id === item.product_id
    );
    orderList.value.splice(index, 1);
  };

  const totalPrice = computed(function () {
    return orderList.value.reduce(
      (sum, item) => sum + item.product_price * item.product_qty!,
      0
    );
  });
  return {
    orderList,
    addCart,
    addQty,
    delQty,
    resetQty,
    removeCart,
    totalPrice,
  };
});
