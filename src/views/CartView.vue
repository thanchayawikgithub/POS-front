<script setup lang="ts">
import OrderList from "@/components/order/OrderList.vue";
import { useMenuStore } from "@/stores/Menu";
import type Menu from "@/types/Menu";
import { ref } from "vue";
const tab = ref("Menu");
const type = ref(["Drink", "Bakery", "Food"]);
const drink = ref([{ name: "Coffee" }, { name: "Milk" }]);
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
          <!-- <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold text-h2"></h1>
          </v-card-title> -->

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
                  <v-btn width="350px" height="300px" class="ma-5">
                    <v-card width="340px" height="190px" class="ma-5">
                      <v-img
                        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
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
