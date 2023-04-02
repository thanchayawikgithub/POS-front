<script lang="ts" setup>
import { useOrderStore } from "@/stores/order";
import { useProductStore } from "@/stores/product";
import { mdiQrcodeScan, mdiCashMultiple } from "@mdi/js";
const orderStore = useOrderStore();
const productStore = useProductStore();
const backendURL = import.meta.env.VITE_BACKEND_URL;
</script>

<template>
  <v-dialog v-model="orderStore.posDialog" persistent width="600">
    <v-card>
      <v-container>
        <v-row>
          <v-col v-for="item in orderStore.Order" :key="item.product_id">
            <v-card-text>{{ item.product_name }}</v-card-text>
            <v-img :src="`${backendURL}/products/image/${item.product_image}`">
            </v-img>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="(orderStore.posDialog = false), orderStore.Order.pop()"
        >
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="
            (orderStore.posDialog = false), orderStore.Order.pop()
            // orderStore.addCart(item)
          "
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>

<style></style>
