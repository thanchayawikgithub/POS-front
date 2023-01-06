<script lang="ts">
import { useMenuStore } from "@/stores/Menu";
import type Menu from "@/types/Menu";
import { ref } from "vue";
import { mdiCoffee } from "@mdi/js";
import OrderList from "@/components/order/OrderList.vue";

const menuStore = useMenuStore();
const tab: string[] = ["Drink", "Bakery", "Food"];
const arr = [];
export default {
  data() {
    return {
      tab: "Menu",
      type: ["Drink", "Bakery", "Food"],
      drink: [{ name: "Coffee" }, { name: "Milk" }],
      food: [{ name: "Salad" }, { name: "Sanwich" }],
      bakery: [{ name: "cake" }, { name: "waffle" }],
      // types: [
      //   {
      //     drink: [{ name: "Coffee" }, { name: "Milk" }],
      //   },
      //   {
      //     food: [{ name: "Salad" }, { name: "Sanwich" }],
      //   },
      //   {
      //     bakery: [{ name: "cake" }, { name: "Waffle" }],
      //   },
      // ],
    };
  },
  components: { OrderList },
};
</script>

<template>
  <v-container class="pl-7 pr-7">
    <v-row class="justify-center ma-10">
      <h1 class="font-weight-bold text-h2">Menu</h1>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-card style="border: 3px solid" height="800px">
          <!-- <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold text-h2"></h1>
          </v-card-title> -->

          <v-tabs :v-model="tab" grow>
            <v-tab
              v-for="item in type"
              :key="item"
              :value="item"
              style="font-weight: bold; font-size: 20px"
            >
              {{ item }}
            </v-tab>
          </v-tabs>
          <v-row><h1 style="padding-left: 20px">ยูทำตรงนี้</h1> </v-row>
          <v-window v-model="tab">
            <v-window-item v-for="item in type" :key="item" :value="item">
              <!-- <v-card flat>
                <v-card-item>{{ item }}</v-card-item>
              </v-card> -->
              <!-- <v-card
                v-for="item in drink"
                :key="item.name"
                :value="item"
              ></v-card> -->
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  v-for="item in drink"
                  :key="item.name"
                  :value="item"
                >
                  <v-btn width="320" height="300px" class="ma-5">
                    <v-card width="320px" height="180px" class="ma-5">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                        cover
                      ></v-img>
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
