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
  <v-app style="background-color: #e7e7e7">
    <v-container style="background-color: #e7e7e7" class="mt-2">
      <v-card style="height: 735px; overflow-y: auto" rounded="lg"
        ><v-card-text
          ><v-row
            align="center"
            justify="center"
            class="text-center"
            style="background-color: #a4907c; color: #f0e3dd"
          >
            <v-col cols="2" class="font-weight-bold text-uppercase"
              >Date Time</v-col
            >
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
            <v-col cols="2"
              >{{ JSON.stringify(rec.rec_createdAt).substring(9, 11) }}/{{
                JSON.stringify(rec.rec_createdAt).substring(6, 8)
              }}/{{ JSON.stringify(rec.rec_createdAt).substring(1, 5) }}
              {{ JSON.stringify(rec.rec_createdAt).substring(12, 17) }}
            </v-col>
            <v-col cols="2">{{ rec.store.store_name }}</v-col>
            <v-col cols="2">{{ rec.employee?.employee_name }}</v-col>
            <v-col cols="2">{{ rec.customer?.customer_name }}</v-col>
            <v-col cols="2">{{ rec.rec_payment }}</v-col>
            <v-col cols="2">{{ rec.rec_total }}</v-col>
            <v-divider></v-divider
            ><v-expand-transition
              ><v-container
                v-show="rec.show"
                align="center"
                justify="center"
                fluid
                style="background-color: #e7e7e7"
              >
                <v-row align="center" justify="center" cols="12"
                  ><v-col cols="8"
                    ><v-row cols="12"
                      ><v-col cols="5" class="text-end">Product Name</v-col>
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
                          class="text-end"
                          style="padding-left: 13vw"
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
                    ></v-col></v-row></v-row></v-container></v-expand-transition></v-row
        ></v-card-text> </v-card
      ><v-pagination
        :length="receiptStore.lastPage"
        v-model="receiptStore.page"
      ></v-pagination>
    </v-container>
  </v-app>
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
.v-col (even) {
  background: #ffffff;
}

.v-col (odd) {
  background: #efefef;
}
</style>
