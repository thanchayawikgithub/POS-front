<script setup lang="ts">
import OrderList from "@/components/order/OrderList.vue";
import TotalMoney from "@/components/order/TotalMoney.vue";
import ButtonCart from "@/components/order/ButtonCart.vue";
import { useMenuStore } from "@/stores/Menu";
// import type Menu from "@/types/Menu";
import { onMounted, ref } from "vue";
// import MenuDrink from "@/components/menu/MenuDrink.vue";
import { mdiMagnify } from "@mdi/js";
import { useCategoryStore } from "@/stores/category";
import { useProductStore } from "@/stores/product";
const tab = ref("Menu");
const type = ref(["Drink", "Bakery", "Food"]);

const drink = ref([
  { name: "Latte", price: "55" },
  { name: "Milk", price: "45" },
  { name: "Mocca", price: "55" },
  { name: "Americano", price: "55" },
  { name: "Cappuccino", price: "55" },
  { name: "Espresso", price: "55" },
  { name: "Espresso", price: "55" },
]);

const selected = ref(["Recommend"]);
const drinktype = ref(["Recommend", "Coffee", "Milk", "Tea", "Soda"]);
// const food = ref([{ name: "Salad" }, { name: "Sandwich" }]);
// const bakery = ref([{ name: "cake" }, { name: "waffle" }]);
const menuStore = useMenuStore();
// const tab: string[] = ["Drink", "Bakery", "Food"];
const categoryStore = useCategoryStore();
const productStore = useProductStore();
const backendURL = import.meta.env.VITE_BACKEND_URL;
onMounted(async () => {
  await categoryStore.getCategory();
  await productStore.getProducts();
  console.log(categoryStore.categorys);
});
</script>

<template>
  <v-main class="bg">
    <v-row>
      <v-col cols="7">
        <v-card
          style="border: 3px solid; height: 98vh; width: 55vw"
          class="bg2"
        >
          <v-tabs v-model="tab" grow style="height: 10vh">
            <v-tab
              v-for="item of categoryStore.categorys"
              :key="item.category_id"
              :value="item"
              style="font-weight: bold; font-size: 20px; height: 7vh"
            >
              {{ item.category_name }}
            </v-tab>
          </v-tabs>

          <v-row>
            <v-col cols="8" class="d-flex">
              <v-select
                :items="drinktype"
                label="Type"
                class="pa-3"
                variant="outlined"
                height="80px"
                v-model="selected"
              >
              </v-select>
            </v-col>

            <v-col cols="4">
              <v-card class="mx-auto bg2" style="height: 10vh" flat>
                <v-card-text>
                  <v-text-field
                    style="height: 9vh"
                    density="compact"
                    variant="outlined"
                    label="Search"
                    :append-inner-icon="mdiMagnify"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-window v-model="tab" style="overflow-y: auto">
            <v-window-item
              v-for="item in type"
              :key="item"
              :value="item"
              style="height: 70vh"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  v-for="item in productStore.products"
                  :key="item.product_id"
                  :value="item"
                >
                  <v-btn
                    style="width: 33vh; height: 28vh; background-color: #663300"
                    class="ma-5 mt-0"
                    @click="productStore.addCart(item)"
                  >
                    <v-card
                      style="width: 33vh; height: 30vh"
                      class="mx-auto card"
                    >
                      <v-img
                        class="align-end image mt-0"
                        style="height: 15vh; width: 20vw"
                        :src="`${backendURL}/products/image/${item.product_image}`"
                      >
                      </v-img>
                      <v-card-title class="title"
                        >{{ item.product_name }}
                      </v-card-title>
                      <v-card-subtitle class="price"
                        >Price:{{ item.product_price }}</v-card-subtitle
                      >
                    </v-card>
                  </v-btn>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
      <v-col cols="4" class="mx-12">
        <v-card
          height="900px"
          width="70vh"
          style="border: 3px solid; height: 98vh"
          class="bg2"
        >
          <h2 style="text-align: center; font-size: 20px; padding-top: 6px">
            Cart
          </h2>

          <OrderList />
          <TotalMoney />
          <ButtonCart />
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>
<style scoped>
.fullscreen {
  width: 150vw;
  height: 100vh;
}
.halfscreen {
  height: 50vh;
  width: 50vw;
}
.bg {
  background-color: #dac7b4;
}
.bg2 {
  background-color: #af9070;
}
.card {
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 120ms;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;

  padding-bottom: 4em;
}

.card::after {
  content: "Add to Cart";
  padding-top: 0.7em;
  padding-left: 1.25em;
  position: absolute;
  left: 0;
  bottom: -60px;
  background: #443300;
  color: #fff;
  height: 7vh;
  width: 100%;
  transition: all 80ms;
  font-weight: 600;
  text-transform: uppercase;
}

.card .title {
  font-family: sans-serif;
  font-size: 1.1em;
  position: absolute;
  left: 0.625em;
  bottom: 1em;
  font-weight: bold;
}

.card .price {
  font-family: sans-serif;
  font-size: 1em;
  position: absolute;
  left: 0.625em;
  bottom: 0.625em;
}

.card:hover::after {
  bottom: 0;
}

.card:active {
  transform: scale(0.98);
}

.card:active::after {
  content: "Added !";
  height: 3.125em;
}

.text {
  max-width: 55px;
}

.image {
  background: #dac7b4;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
</style>
