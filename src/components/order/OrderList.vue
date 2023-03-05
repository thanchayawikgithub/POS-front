<script setup lang="ts">
// import { mdiCoffee } from "@mdi/js";
import { ref } from "vue";
// import type Menu from "@/types/User";
import { useProductStore } from "@/stores/product";
const productStore = useProductStore();
const backendURL = import.meta.env.VITE_BACKEND_URL;
</script>
<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="1 "> </v-col>
        <v-col cols="3" class="text-center pl-14">
          <h5>Name</h5>
        </v-col>
        <v-col cols="5" class="text-center pl-16">
          <h5>Quantity</h5>
        </v-col>
        <v-col cols="3" class="text-center pl-2">
          <h5>Price</h5>
        </v-col>
      </v-row>
      <v-card
        style="
          height: 42vh;
          width: 37vw;
          overflow-y: auto;

          background-color: #af9070;
        "
        class="pl-0"
        flat
      >
        <v-card
          class="pa-3 mb-2 mt-3 ml-0"
          v-for="item in productStore.orderList"
          :key="item.product_id"
          color="#dac7b4"
          style="
            border-radius: 5px;
            border: 2px solid;
            width: 33vw;
            height: 11vh;
          "
        >
          <v-row>
            <v-col cols="2">
              <v-img
                height="90%"
                width="90%"
                :src="`${backendURL}/products/image/${item.product_image}`"
              ></v-img>
            </v-col>
            <v-col cols="3" class="pl-0">
              <v-card-text> {{ item.product_name }}</v-card-text>
            </v-col>
            <v-col cols="1" class="text-right"
              ><v-card-actions class="justify-center">
                <v-btn
                  color="#CC0000"
                  @click="productStore.delQty(item)"
                  style="font-weight: bolder"
                >
                  -
                </v-btn>
              </v-card-actions></v-col
            >
            <v-col cols="2" class="text-center">
              <v-card-text>{{ item.product_qty }}</v-card-text>
            </v-col>
            <v-col cols="1" class="text-left"
              ><v-card-actions class="justify-center">
                <v-btn
                  color="#009900"
                  @click="productStore.addQty(item)"
                  style="font-weight: bolder"
                >
                  +
                </v-btn>
              </v-card-actions>
            </v-col>
            <v-col cols="3" class="text-center"
              ><v-card-text>{{
                item.product_price * item.product_qty!
              }}</v-card-text></v-col
            >
          </v-row>
        </v-card>
      </v-card>
    </v-container>

    <v-card>
      <v-divider style="background-color: black"></v-divider>
    </v-card>
  </div>
</template>

<script scope></script>
