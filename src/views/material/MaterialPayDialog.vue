<script lang="ts" setup>
import { useVendorStore } from "@/stores/vendor";
import { mdiQrcodeScan, mdiCashMultiple } from "@mdi/js";
const vendorStore = useVendorStore();
</script>

<template>
  <v-dialog v-model="vendorStore.payMaterial" persistent width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">Payment Method</span>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12" align="center">
            <v-btn
              variant="outlined"
              class="mx-2"
              :prepend-icon="mdiQrcodeScan"
              @click="vendorStore.paymentMethod = 'QR-Payment'"
              >QR-Payment</v-btn
            >
            <v-btn
              variant="outlined"
              :prepend-icon="mdiCashMultiple"
              @click="vendorStore.paymentMethod = 'Cash'"
              >Cash</v-btn
            >
          </v-col>
        </v-row>
      </v-container>

      <v-expand-transition>
        <v-container v-if="vendorStore.paymentMethod === 'Cash'"
          ><v-row
            ><v-col align="center" style="font-size: 21px"
              >Total : {{ vendorStore.totalPrice }} Baht</v-col
            ></v-row
          >
          <v-row
            ><v-col style="font-size: 21px" cols="3" class="pa-6"
              >Received :</v-col
            >
            <v-col cols="6">
              <v-text-field
                v-model="vendorStore.received"
                hint="Received"
                prefix="฿"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="justify-center"
            ><v-btn
              color="green"
              variant="tonal"
              @click="vendorStore.calChanged()"
              >Submit</v-btn
            ></v-row
          >
        </v-container>
      </v-expand-transition>
      <v-expand-transition>
        <v-container v-if="vendorStore.paymentMethod === 'QR-Payment'"
          ><v-row
            ><v-col align="center" style="font-size: 21px"
              >Total : {{ vendorStore.totalPrice }} Baht</v-col
            ></v-row
          ><v-img src="./public/QR.jpg" height="300px"></v-img>
          <v-row class="justify-center"
            ><v-btn
              color="green"
              variant="tonal"
              @click="
                vendorStore.calChanged();

                vendorStore.dis = false;
              "
              >Submit</v-btn
            ></v-row
          ></v-container
        >
      </v-expand-transition>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="
            (vendorStore.payMaterial = false),
              (vendorStore.paymentMethod = ''),
              (vendorStore.received = 0)
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
