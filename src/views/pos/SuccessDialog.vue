<script lang="ts" setup>
import { useOrderStore } from "@/stores/order";

const orderStore = useOrderStore();
</script>
<template>
  <v-dialog v-model="orderStore.successDialog">
    <v-card width="40vw" height="40vh"
      >Success<v-card-actions
        ><v-btn @click="orderStore.successDialog = false"
          >close</v-btn
        ></v-card-actions
      ></v-card
    ></v-dialog
  >
</template>
