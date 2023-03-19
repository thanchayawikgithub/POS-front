<script lang="ts" setup>
import { useOrderStore } from "@/stores/order";

const orderStore = useOrderStore();
</script>

<template>
  <v-dialog v-model="orderStore.payDialog" persistent width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">Payment Method</span>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12" align="center">
            <v-btn @click="orderStore.paymentMethod = 'QR-Payment'"
              >QR-Payment</v-btn
            >
            <v-btn @click="orderStore.paymentMethod = 'Cash'">Cash</v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-expand-transition>
        <v-container v-if="orderStore.paymentMethod === 'Cash'"
          ><v-row>Total : {{ orderStore.totalPrice }} Baht</v-row>
          <v-row>Received</v-row>
          <v-row>
            <v-text-field
              v-model="orderStore.received"
              hint="Received"
            ></v-text-field>
          </v-row>
          <v-row class="justify-center"
            ><v-btn
              @click="
                (orderStore.payDialog = false),
                  (orderStore.successDialog = true)
              "
              >Submit</v-btn
            ></v-row
          >
        </v-container>
      </v-expand-transition>
      <v-expand-transition>
        <v-container v-if="orderStore.paymentMethod === 'QR-Payment'"
          ><v-row>Total : {{ orderStore.totalPrice }} Baht</v-row
          ><v-img src="./public/QR.jpg" height="300px"></v-img
        ></v-container>
      </v-expand-transition>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="
            (orderStore.payDialog = false), (orderStore.paymentMethod = '')
          "
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>

<style>
.v-card--qr {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
}
</style>
