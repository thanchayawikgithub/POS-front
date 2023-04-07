<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import { useOrderStore } from "@/stores/order";
import { mdiQrcodeScan, mdiCashMultiple } from "@mdi/js";
const orderStore = useOrderStore();
const customerStore = useCustomerStore();
</script>

<template>
  <v-dialog v-model="orderStore.usePoint" persistent width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">UsePoint</span>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12" align="center"> </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row
          ><v-col align="center" style="font-size: 21px"
            >Point: {{ customerStore.customer?.customer_point }}
          </v-col>
        </v-row>
        <v-card-subtitle align="center"
          >10 points, get ฿30 discount.</v-card-subtitle
        >
        <v-row
          ><v-col
            style="font-size: 21px; text-align: end"
            cols="3"
            class="pa-6"
          >
            Use :</v-col
          >
          <v-col cols="6" align="right">
            <v-text-field
              v-model="orderStore.received"
              suffix="Point"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="justify-center"><v-btn>Submit</v-btn></v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="orderStore.usePoint = false"
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
