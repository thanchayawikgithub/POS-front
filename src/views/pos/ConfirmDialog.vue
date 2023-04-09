<script lang="ts" setup>
import { useOrderStore } from "@/stores/order";
import { useReceiptStore } from "@/stores/receipt";
import { mdiAlertOutline } from "@mdi/js";

const orderStore = useOrderStore();
const receiptStore = useReceiptStore();
</script>
<template>
  <v-dialog v-model="orderStore.confirmDialog" persistent width="600"
    ><v-sheet
      elevation="15"
      max-width="800"
      rounded="lg"
      width="100%"
      class="pa-5 mx-auto"
    >
      <v-card-title style="text-align: center">
        <span class="text-h6">Confirm Order</span>
      </v-card-title>
      <v-divider class="mb-0"></v-divider>
      <v-card-text
        class="pb-2"
        align="center
        "
        ><v-icon size="100" color="red-darken-4">{{
          mdiAlertOutline
        }}</v-icon></v-card-text
      >

      <v-card-text
        align="center"
        style="font-size: 30px; font-weight: bold"
        class="pt-0 pb-0"
      >
        Total: ฿
        {{ orderStore.totalPrice }}
      </v-card-text>
      <v-card-text
        align="center"
        style="font-size: 30px; font-weight: bold"
        class="pt-0"
      >
        Received : ฿
        {{ orderStore.received }}
      </v-card-text>

      <v-divider class="mb-0"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" @click="orderStore.confirmDialog = false"
          >Close</v-btn
        >
        <v-btn
          color="green"
          @click="orderStore.calChanged(), (orderStore.confirmDialog = false)"
          >Comfirm</v-btn
        ></v-card-actions
      ></v-sheet
    ></v-dialog
  >
</template>
<style></style>
