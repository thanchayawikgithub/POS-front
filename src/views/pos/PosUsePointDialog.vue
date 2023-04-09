<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import { useOrderStore } from "@/stores/order";
import { mdiQrcodeScan, mdiCashMultiple } from "@mdi/js";
const orderStore = useOrderStore();
const customerStore = useCustomerStore();
</script>

<template>
  <v-dialog v-model="orderStore.usePoint" persistent width="600">
    <v-sheet
      elevation="15"
      max-width="700"
      rounded="lg"
      width="100%"
      class="pa-4 mx-auto"
    >
      <v-card-title style="text-align: center">
        <span class="text-h5">UsePoint</span>
      </v-card-title>
      <v-divider class="mb-0"></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12" align="center"> </v-col>
        </v-row>
      </v-container>

      <v-container>
        <v-row class="pt-0"
          ><v-col align="center" style="font-size: 25px" class="pt-0"
            >Points: {{ customerStore.customer?.customer_point }}
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
              v-model="orderStore.usedPoint"
              suffix="Point"
              :rules="[
                (value) => /(.*0)$/.test(value) || 'Point must end with 10',
              ]"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row class="justify-center"
          ><v-btn
            color="green-darken-2"
            variant="tonal"
            @click="orderStore.calDiscount()"
            >Submit</v-btn
          ></v-row
        >
      </v-container>
      <v-divider class="mb-0 mt-5"></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="orderStore.usePoint = false">
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
