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
  <v-container style="padding: 0">
    <v-row class="justify-center ma-10">
      <h1 class="font-weight-bold text-h2">Menu</h1>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-card style="border: 3px solid" height="800px">
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
              <v-card class="mx-auto" width="370px" flat>
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
                    <v-card width="300px" height="250px" class="mx-auto">
                      <v-img
                        height="170"
                        class="align-end"
                        src="https://static.vecteezy.com/system/resources/previews/011/048/030/non_2x/iced-coffee-watercolor-set-free-png.png"
                      >
                      </v-img>
                      <v-card-title>{{ item.name }} </v-card-title>
                      <v-card-subtitle>Price:{{ item.price }}</v-card-subtitle>
                    </v-card>
                  </v-btn>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card height="800px" style="border: 3px solid">
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
