<script lang="ts" setup>
import { useOrderStore } from "@/stores/order";
import { mdiQrcodeScan, mdiCashMultiple } from "@mdi/js";

import QRCodeVue from "qrcode.vue";
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
            <v-btn
              class="mx-2"
              :prepend-icon="mdiQrcodeScan"
              @click="orderStore.paymentMethod = 'QR-Payment'"
              >QR-Payment</v-btn
            >
            <v-btn
              :prepend-icon="mdiCashMultiple"
              @click="orderStore.paymentMethod = 'Cash'"
              >Cash</v-btn
            >
          </v-col>
        </v-row>
      </v-container>

      <v-expand-transition>
        <v-container v-if="orderStore.paymentMethod === 'Cash'"
          ><v-row
            ><v-col align="center" style="font-size: 21px"
              >Total : {{ orderStore.billPrice }} Baht</v-col
            ></v-row
          >
          <v-row
            ><v-col style="font-size: 21px" cols="3" class="pa-6"
              >Received :</v-col
            >
            <v-col cols="6">
              <v-text-field
                v-model="orderStore.received"
                hint="Received"
                prefix="฿"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="justify-center"
            ><v-btn @click="orderStore.calChanged()">Submit</v-btn></v-row
          >
        </v-container>
      </v-expand-transition>
      <v-expand-transition>
        <v-container v-if="orderStore.paymentMethod === 'QR-Payment'"
          ><v-row
            ><v-col align="center" style="font-size: 21px"
              >Total : {{ orderStore.totalPrice }} Baht</v-col
            ></v-row
          ><QRCodeVue
            :value="orderStore.promptPayValue"
            :renderAs="orderStore.qrcodeOptions"
          />
          <v-row class="justify-center"
            ><v-btn @click="orderStore.payDialog = false">Submit</v-btn></v-row
          ></v-container
        >
      </v-expand-transition>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="
            (orderStore.payDialog = false),
              (orderStore.paymentMethod = ''),
              (orderStore.received = 0)
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
