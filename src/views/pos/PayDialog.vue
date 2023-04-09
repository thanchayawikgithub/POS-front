<script lang="ts" setup>
import { useOrderStore } from "@/stores/order";
import { mdiQrcodeScan, mdiCashMultiple } from "@mdi/js";

import QRCodeVue from "qrcode.vue";
const orderStore = useOrderStore();
</script>

<template>
  <v-dialog v-model="orderStore.payDialog" persistent width="700">
    <v-sheet
      elevation="15"
      max-width="700"
      rounded="lg"
      width="100%"
      class="pa-4 mx-auto"
    >
      <v-card-title align="center">
        <span class="text-h5">Payment Method</span>
      </v-card-title>
      <v-divider class="mb-0"></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12" align="center">
            <v-btn
              variant="outlined"
              class="mx-2"
              :prepend-icon="mdiQrcodeScan"
              @click="orderStore.paymentMethod = 'QR-Payment'"
              >QR-Payment</v-btn
            >
            <v-btn
              variant="outlined"
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
              >Total : ฿ {{ orderStore.billPrice }}
            </v-col></v-row
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
            ><v-btn
              color="green-darken-2"
              variant="tonal"
              @click="orderStore.confirmDialog = true"
              >Submit</v-btn
            ></v-row
          >
        </v-container>
      </v-expand-transition>
      <v-expand-transition>
        <v-container v-if="orderStore.paymentMethod === 'QR-Payment'"
          ><v-row
            ><v-col align="center" style="font-size: 21px"
              >Total : ฿ {{ orderStore.totalPrice }}
            </v-col></v-row
          ><v-img src="./public/QR.jpg" height="300px"></v-img>
          <v-row class="justify-center"
            ><v-btn
              @click="orderStore.calChanged()"
              color="green-darken-2"
              variant="tonal"
              >Submit</v-btn
            ></v-row
          ></v-container
        >
      </v-expand-transition>
      <v-divider class="mb-0 mt-5"></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
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
    </v-sheet></v-dialog
  >
</template>

<style>
.v-card--qr {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
}
</style>
