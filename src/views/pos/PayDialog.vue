<script lang="ts" setup>
import { useOrderStore } from "@/stores/order";
import { ref } from "vue";

const orderStore = useOrderStore();
const btnqr = ref(true);
const qr = ref(false);
const btncash = ref(true);
const cash = ref(false);
const change = ref(false);
</script>

<template>
  <v-dialog v-model="orderStore.payDialog" persistent width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">Pay</span>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col cols="12" align="center"
            ><v-expand-transition>
              <v-card v-if="qr" flat>
                <v-img src="./public/QR.jpg" height="300px"></v-img>
                <v-btn
                  @click="
                    qr = false;
                    btnqr = true;
                    btncash = true;
                    change = false;
                  "
                  style="width: 5vw"
                  >ปิด
                </v-btn>
                <v-btn
                  @click="
                    orderStore.openOrder();
                    orderStore.payDialog = false;
                  "
                  style="width: 5vw"
                  >ยืนยัน
                </v-btn>
              </v-card>
              <v-btn
                v-if="btnqr"
                style="height: 10vh; width: 10vw; background-color: aqua"
                class="ma-5"
                @click="
                  qr = true;
                  btnqr = false;
                  btncash = false;
                  change = false;
                "
                >QR</v-btn
              >
            </v-expand-transition>

            <v-expand-transition>
              <v-card v-if="cash" style="height: auto" flat>
                <v-card-text>ราคารวม {{ orderStore.totalPrice }}</v-card-text>
                <v-text-field
                  label="amount of cash"
                  style="width: 10vw"
                ></v-text-field>
                <v-btn
                  @click="
                    cash = false;
                    btnqr = true;
                    btncash = true;
                    change = false;
                  "
                  style="width: 5vw"
                  >ปิด
                </v-btn>
                <v-btn
                  @click="
                    orderStore.openOrder();
                    cash = false;
                    btnqr = false;
                    btncash = false;
                    change = true;
                  "
                  style="width: 5vw"
                  >ยืนยัน
                </v-btn>
              </v-card>
              <v-btn
                v-if="btncash"
                style="height: 10vh; width: 10vw; background-color: aquamarine"
                @click="
                  cash = true;
                  btnqr = false;
                  btncash = false;
                  change = false;
                "
                >Cash</v-btn
              >
              <v-card v-if="change" style="height: auto" flat>
                <v-card-text>แต้ม +1</v-card-text>
                <v-card-text>ทอน {{ orderStore.totalPrice }}</v-card-text>
                <v-card-text>ชำระเงินสำเร็จ</v-card-text>
              </v-card>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="orderStore.payDialog = false"
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
