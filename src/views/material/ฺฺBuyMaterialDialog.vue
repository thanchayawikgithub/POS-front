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
              <v-tabs v-model="vendorStore.selectedVendor">
                <v-tab
                  v-for="(vendor, index) in vendorStore.vendorMats"
                  :key="index"
                  :value="vendor.vendor_id"
                >
                  {{ vendor.vendor_name }}
                </v-tab>
              </v-tabs>

              <v-window
                v-model="vendorStore.selectedVendor"
                style="overflow-y: auto"
              >
                <v-window-item
                  v-for="(vendor, index) in vendorStore.vendorMats"
                  :key="index"
                  :value="vendor.vendor_id"
                >
                  <v-row>
                    <v-col
                      v-for="(vendorMat, index) in vendor.vendorMat"
                      :key="index"
                      cols="6"
                    >
                      <v-card>
                        <v-card-title>{{ vendorMat.v_mat_name }}</v-card-title>
                        <v-card-text
                          >Price: ฿{{ vendorMat.v_mat_price }}</v-card-text
                        >
                        <v-card-actions>
                          <v-btn @click="vendorStore.addCart(vendorMat)"
                            >Add to Cart</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </v-col>
                  </v-row>
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
