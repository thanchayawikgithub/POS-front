<script setup lang="ts">
import OrderList from "@/components/order/OrderList.vue";
import TotalMoney from "@/components/order/TotalMoney.vue";
import ButtonCart from "@/components/order/ButtonCart.vue";
import { useMenuStore } from "@/stores/Menu";
import type Menu from "@/types/Menu";
import { ref } from "vue";
import MenuDrink from "@/components/menu/MenuDrink.vue";
import { mdiMagnify } from "@mdi/js";
const tab = ref("Menu");
const type = ref(["Drink", "Bakery", "Food"]);
const drink = ref([
  { name: "Latte", price: "55" },
  { name: "Milk", price: "45" },
  { name: "Mocca", price: "55" },
  { name: "Americano", price: "55" },
  { name: "Cappuccino", price: "55" },
  { name: "Espresso", price: "55" },
]);
const selected = ref(["Recommend"]);
const drinktype = ref(["Recommend", "Coffee", "Milk", "Tea", "Soda"]);
const food = ref([{ name: "Salad" }, { name: "Sandwich" }]);
const bakery = ref([{ name: "cake" }, { name: "waffle" }]);
const menuStore = useMenuStore();
// const tab: string[] = ["Drink", "Bakery", "Food"];
</script>

<template>
  <v-container class="bg" fluid>
    <v-row>
      <v-col cols="8">
        <v-card style="border: 3px solid" height="800px" class="bg2">
          <v-tabs v-model="tab" grow>
            <v-tab
              v-for="item in type"
              :key="item"
              :value="item"
              style="font-weight: bold; font-size: 20px"
            >
              {{ item }}
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
              <v-card class="mx-auto bg2" width="335px" flat>
                <v-card-text>
                  <v-text-field
                    hight="80px"
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
          <v-window v-model="tab">
            <v-window-item v-for="item in type" :key="item" :value="item">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  v-for="item in drink"
                  :key="item.name"
                  :value="item"
                >
                  <v-btn width="300px" height="250px" class="ma-5">
                    <v-card width="300px" height="250px" class="mx-auto card">
                      <v-img
                        class="align-end image"
                        src="https://static.vecteezy.com/system/resources/previews/011/048/030/non_2x/iced-coffee-watercolor-set-free-png.png"
                      >
                      </v-img>
                      <v-card-title class="title"
                        >{{ item.name }}
                      </v-card-title>
                      <v-card-subtitle class="price"
                        >Price:{{ item.price }}</v-card-subtitle
                      >
                    </v-card>
                  </v-btn>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="800px" style="border: 3px solid" class="bg2">
          <h2 style="text-align: center; font-size: 20px; padding-top: 6px">
            Cart
          </h2>
          <OrderList />
          <TotalMoney />
          <ButtonCart />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
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
  background: #00ac7c;
  color: #fff;
  height: 3em;
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
