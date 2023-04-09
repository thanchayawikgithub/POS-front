<script setup lang="ts">
import { useVendorStore } from "@/stores/vendor";
const vendorStore = useVendorStore();
</script>
<template>
  <v-dialog v-model="vendorStore.receiptMaterial" persistent height="1000">
    <v-sheet
      elevation="15"
      max-width="1000"
      width="100%"
      height="1000"
      class="pa-4 mx-auto"
    >
      <v-container>
        <v-row>
          <v-col class="text-center">
            <span class="text-h5">Vendor Bill</span>
          </v-col>
        </v-row>
        <v-row>
          <v-card-text
            class="pl-3 pb-1"
            style="font-weight: bold; font-size: 20px"
            >Vendor name :
            {{ vendorStore.lastbill?.bill_shop_name }}</v-card-text
          >
          <v-card-text
            class="pl-1 pb-1 mr-2"
            style="font-weight: bold; font-size: 20px"
            align="right"
            >Customer details
          </v-card-text> </v-row
        ><v-row>
          <v-col class="pt-1 pl-0"> </v-col>
          <v-card-text></v-card-text>
          <v-col class="pt-1 pl-0">
            <v-card-text
              class="pt-0 pl-10 mr-4 pb-0"
              style="font-weight: 500; font-size: 15px"
              align="center "
              >D-Coffee
            </v-card-text>
            <v-card-text
              class="pt-0 pb-0 pl-16 ml-3"
              style="font-weight: 500; font-size: 15px"
              align="center"
              >Tel: 0820258987
            </v-card-text>
            <v-card-text
              class="pt-0 ml-15"
              style="font-weight: 500; font-size: 15px"
              align="center"
              >Date:10/04/2023
            </v-card-text>
            <v-card-text
              class="pt-0 ml-15"
              style="font-weight: bold; width: 1px; font-size: 15px"
              align="right"
            ></v-card-text>
          </v-col>
          <v-divider class="ma-1" color="black"></v-divider>
          <v-row class="pb-0">
            <v-col cols="6"
              ><v-card-text
                class="pt-0 pl-8"
                style="font-weight: bold; font-size: 13px"
                >Product Name</v-card-text
              ></v-col
            ><v-col cols="2"
              ><v-card-text
                class="pt-0"
                style="font-weight: bold; font-size: 13px"
                >Amount</v-card-text
              ></v-col
            >
            <v-col cols="2"
              ><v-card-text
                class="pt-0"
                style="font-weight: bold; font-size: 13px"
                >Per Price Unit</v-card-text
              ></v-col
            ><v-col cols="2"
              ><v-card-text
                class="pt-0"
                style="font-weight: bold; font-size: 13px"
                >Total</v-card-text
              ></v-col
            >
          </v-row>

          <v-divider class="ma-1" color="black"></v-divider>
        </v-row>
        <v-card class="mt-5" height="190px" flat>
          <v-row
            v-for="item in vendorStore.lastbill?.bill_details"
            :key="item.bill_detail_id"
            class="pb-2"
          >
            <v-col cols="6"
              ><v-card-text
                class="pt-0 pl-10"
                style="font-weight: bold; font-size: 13px"
                >{{ item.bill_detail_name }}</v-card-text
              ></v-col
            ><v-col cols="2"
              ><v-card-text
                class="pt-0 pl-9"
                style="font-weight: bold; font-size: 13px"
                >{{ item.bill_detail_amount }}</v-card-text
              ></v-col
            >
            <v-col cols="2"
              ><v-card-text
                class="pt-0 pl-12"
                style="font-weight: bold; font-size: 13px"
                >{{ item.bill_detail_price }} ฿</v-card-text
              ></v-col
            ><v-col cols="2"
              ><v-card-text
                class="pt-0 pl-7"
                style="font-weight: bold; font-size: 13px"
                >{{ item.bill_detail_total }} ฿</v-card-text
              ></v-col
            >
          </v-row>
        </v-card>
        <v-divider class="mt-5" color="black"> </v-divider>
        <v-card-text
          align="right"
          style="font-size: 25px; font-weight: bold"
          class="pt-5 pb-0"
          >Total : {{ vendorStore.lastbill?.bill_total }} ฿
        </v-card-text>
        <v-card-text align="right" style="font-size: 25px" class="pt-5 pb-0"
          >Received : {{ vendorStore.lastbill?.bill_buy }} ฿
        </v-card-text>
        <v-card-text
          align="right"
          style="font-size: 25px; font-weight: bold"
          class="pt-5 pb-0"
          >Changed : {{ vendorStore.lastbill?.bill_change }} ฿
        </v-card-text>
      </v-container>

      <v-divider class="mt-0"></v-divider>
      <v-card-actions class="mb-0">
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          variant="text"
          @click="vendorStore.receiptMaterial = false"
        >
          Close
        </v-btn>
      </v-card-actions>
    </v-sheet></v-dialog
  >
</template>
<style scoped></style>
