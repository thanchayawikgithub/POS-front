<script lang="ts" setup>
import { useBillStore } from "@/stores/bill";
import type { Bill } from "@/types/Bill";

import { ref, onMounted } from "vue";

const billStore = useBillStore();
onMounted(async () => {
  await billStore.getBills();
  console.log(billStore.bills);
});

const Click = (bill: Bill) => {
  bill.show = !bill.show;
};
</script>

<template>
  <v-app style="background-color: #e7e7e7">
    <v-container>
      <v-card style="height: 75vh; overflow-y: auto"
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
              >Shop Name</v-col
            >
            <v-col cols="2" class="font-weight-bold text-uppercase"
              >Employee Name</v-col
            >
            <v-col cols="2" class="font-weight-bold text-uppercase"
              >Total</v-col
            ></v-row
          ><v-divider class="my-3"></v-divider
          ><v-row
            v-for="bill of billStore.bills"
            :key="bill.bill_id"
            align="center"
            justify="center"
            @click="Click(bill)"
            class="row text-center"
          >
            <v-col cols="2"
              >{{ JSON.stringify(bill.bill_createdAt).substring(9, 11) }}/{{
                JSON.stringify(bill.bill_createdAt).substring(6, 8)
              }}/{{ JSON.stringify(bill.bill_createdAt).substring(1, 5) }}
              {{ JSON.stringify(bill.bill_createdAt).substring(12, 17) }}
            </v-col>
            <v-col cols="2">{{ bill.bill_shop_name }}</v-col>
            <v-col cols="2">{{ bill.employee.employee_name }}</v-col>
            <v-col cols="2">{{ bill.bill_total }}</v-col>

            <v-divider></v-divider
            ><v-expand-transition
              ><v-container
                v-show="bill.show"
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
                <v-row
                  v-for="billde of bill.bill_details"
                  :key="billde.bill_detail_id"
                  ><v-row
                    ><v-col cols="8"
                      ><v-row cols="12"
                        ><v-col
                          cols="5"
                          class="text-end"
                          style="padding-left: 13vw"
                          >{{ billde.bill_detail_name }}</v-col
                        >
                        <v-col cols="3" class="text-end">{{
                          billde.bill_detail_price
                        }}</v-col>
                        <v-col cols="2" class="text-end">{{
                          billde.bill_detail_amount
                        }}</v-col>
                        <v-col cols="2" class="text-end">{{
                          billde.bill_detail_total
                        }}</v-col></v-row
                      ></v-col
                    ><v-col
                      cols="4"
                    ></v-col></v-row></v-row></v-container></v-expand-transition></v-row
        ></v-card-text> </v-card
      ><v-pagination
        :length="billStore.lastPage"
        v-model="billStore.page"
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
