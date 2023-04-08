<script lang="ts" setup>
import { useReceiptStore } from "@/stores/receipt";
import type Reciept from "@/types/Receipt";

import { ref, onMounted } from "vue";

const receiptStore = useReceiptStore();
onMounted(async () => {
  await receiptStore.getReceipts();
  console.log(receiptStore.receipts);
});

const Click = (rec: Reciept) => {
  rec.show = !rec.show;
};
</script>

<template>
  <v-container fluid>
    <v-card style="height: 93vh; overflow-y: auto; background-color: #e7e7e7"
      ><v-card-text
        ><v-row
          align="center"
          justify="center"
          class="text-center"
          style="background-color: #655a54; color: #f0e3dd"
        >
          <v-col cols="1" class="font-weight-bold text-uppercase">ID</v-col>
          <v-col cols="2" class="font-weight-bold text-uppercase"
            >Store Name</v-col
          >
          <v-col cols="2" class="font-weight-bold text-uppercase"
            >Employee Name</v-col
          >
          <v-col cols="2" class="font-weight-bold text-uppercase"
            >Customer Name</v-col
          >
          <v-col cols="2" class="font-weight-bold text-uppercase"
            >Payment</v-col
          >
          <v-col cols="2" class="font-weight-bold text-uppercase"
            >Total</v-col
          ></v-row
        ><v-divider class="my-3"></v-divider
        ><v-row
          v-for="rec of receiptStore.receipts"
          :key="rec.rec_id"
          align="center"
          justify="center"
          @click="Click(rec)"
          class="row text-center"
        >
          <v-col cols="1">{{ rec.rec_id }}</v-col>
          <v-col cols="2">{{ rec.store.store_name }}</v-col>
          <v-col cols="2">{{ rec.employee?.employee_name }}</v-col>
          <v-col cols="2">{{ rec.customer?.customer_name }}</v-col>
          <v-col cols="2">{{ rec.rec_payment }}</v-col>
          <v-col cols="2">{{ rec.rec_total }}</v-col>
          <v-divider></v-divider
          ><v-expand-transition
            ><v-container v-show="rec.show" align="center" justify="center">
              <v-row align="center" justify="center" cols="12"
                ><v-col cols="8"
                  ><v-row cols="12"
                    ><v-col cols="5" style="padding-left: 6vw"
                      >Product Name</v-col
                    >
                    <v-col cols="3" class="text-end">Product Price</v-col>
                    <v-col cols="2" class="text-end">Amount</v-col>
                    <v-col cols="2" class="text-end">Total</v-col></v-row
                  ></v-col
                >
                <v-col cols="4"></v-col>
              </v-row>
              <v-row v-for="rcd of rec.recieptDetail" :key="rcd.rcd_id"
                ><v-row
                  ><v-col cols="8"
                    ><v-row cols="12"
                      ><v-col
                        cols="5"
                        class="text-start"
                        style="padding-left: 11vw"
                        >{{ rcd.rcd_name }}</v-col
                      >
                      <v-col cols="3" class="text-end">{{
                        rcd.rcd_price
                      }}</v-col>
                      <v-col cols="2" class="text-end">{{
                        rcd.rcd_amount
                      }}</v-col>
                      <v-col cols="2" class="text-end">{{
                        rcd.rcd_total
                      }}</v-col></v-row
                    ></v-col
                  ><v-col
                    cols="4"
                  ></v-col></v-row></v-row></v-container></v-expand-transition></v-row></v-card-text
    ></v-card>
  </v-container>
</template>

<style scoped>
.row:hover {
  background-color: whitesmoke;
  cursor: pointer;
}
.table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  max-width: 100vw;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
</style>
