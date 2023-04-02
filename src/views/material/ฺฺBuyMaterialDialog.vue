<script lang="ts" setup>
import { useVendorStore } from "@/stores/vendor";
import { ref } from "vue";
import OrderList from "./order/OrderList.vue";
import TotalMoney from "./order/TotalMoney.vue";
import ButtonCart from "./order/ButtonCart.vue";
const tab = ref();

const vendorStore = useVendorStore();
</script>
<template>
  <v-dialog v-model="vendorStore.dialog" persistent width="1300">
    <v-card height="1000px"
      ><v-card-title>Buy Material</v-card-title
      ><v-card-text
        ><v-container>
          <v-row class="ml-0">
            <v-col cols="6">
              <v-tabs v-model="vendorStore.vendorMat">
                <v-tab
                  v-for="item in vendorStore.vendorMats"
                  :key="item.vendor_id"
                  :value="item.vendor_id"
                  style="font-weight: bold; font-size: 10px"
                >
                  {{ item.vendor_name }}
                </v-tab>
              </v-tabs>

              <v-window v-model="tab" style="overflow-y: auto">
                <v-window-item
                  v-for="items in vendorStore.vendorMats"
                  :key="items.vendor_id"
                >
                  <v-card style="height: 68vh; width: 45vw" flat>
                    <v-row>
                      <v-col>
                        <v-row>
                          <v-card style="height: 90vh" flat>
                            <v-btn
                              style="width: 20vh; height: 29vh"
                              class="ma-3 mt-5 ml-4"
                              v-for="item in items.vendorMat"
                              :key="item.v_mat_id"
                              @click="vendorStore.addCart(item)"
                            >
                              <v-card
                                style="width: 20vh; height: 29vh"
                                class="mx-auto card"
                                ><v-card-title class="title"
                                  >{{ item.v_mat_name }}
                                </v-card-title>
                                <v-card-subtitle class="price"
                                  >Price: ฿{{
                                    item.v_mat_price
                                  }}</v-card-subtitle
                                >
                              </v-card>
                            </v-btn>
                          </v-card></v-row
                        >
                      </v-col>
                    </v-row>
                  </v-card>
                </v-window-item>
              </v-window>
            </v-col>
            <v-col cols="4" class="mx-12">
              <v-card
                width="70vh"
                style="border: 3px solid; height: 75vh"
                class="bg2 ml-0"
              >
                <h2
                  style="text-align: center; font-size: 20px; padding-top: 6px"
                >
                  Cart
                </h2>

                <OrderList />
                <TotalMoney />
                <ButtonCart />
              </v-card>
            </v-col>
          </v-row>
        </v-container> </v-card-text></v-card
  ></v-dialog>
</template>
<style scoped>
.card .title {
  font-family: sans-serif;
  font-size: 0.9em;
  position: absolute;
  left: 0em;
  bottom: 1em;
  font-weight: bold;
}

.card .price {
  font-family: sans-serif;
  font-size: 0.87em;
  position: absolute;
  left: 0em;
  bottom: 0.625em;
}
</style>
