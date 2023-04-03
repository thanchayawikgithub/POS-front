<script lang="ts" setup>
import { useVendorStore } from "@/stores/vendor";
import { mdiTrashCanOutline, mdiBackspaceOutline } from "@mdi/js";
import { ref } from "vue";

const tab = ref();
const dis = ref(false);

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
                  :disabled="dis"
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
                          <v-btn
                            @click="
                              if (vendor.vendor_id === 1) {
                                if (vendorStore.orderList.length >= 0) {
                                  dis = true;
                                } else if (vendorStore.orderList.length < 0) {
                                  dis = false;
                                }
                                vendorStore.addCart(vendorMat);
                              } else if (vendor.vendor_id === 2) {
                                if (vendorStore.orderList.length >= 0) {
                                  dis = true;
                                } else if (vendorStore.orderList.length < 0) {
                                  dis = false;
                                }
                                vendorStore.addCart(vendorMat);
                              } else if (vendor.vendor_id === 3) {
                                if (vendorStore.orderList.length >= 0) {
                                  dis = true;
                                } else if (vendorStore.orderList.length < 0) {
                                  dis = false;
                                }
                                vendorStore.addCart(vendorMat);
                              }
                            "
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
                style="border: 3px solid; height: 75vh; width: 500px"
                class="bg2 ml-0"
              >
                <v-container>
                  <v-row>
                    <v-col
                      align="center"
                      style="font-size: 20px; font-weight: bold"
                      class="pt-0 ml-16"
                    >
                      Cart
                    </v-col>

                    <v-btn
                      flat
                      style="font-weight: bold"
                      :append-icon="mdiBackspaceOutline"
                      @click="
                        vendorStore.clearOrder();
                        if (vendorStore.orderList.length <= 0) {
                          dis = false;
                        } else {
                          dis = true;
                        }
                      "
                    ></v-btn>
                  </v-row>
                </v-container>

                <v-container>
                  <v-row>
                    <v-col cols="1 "> </v-col>
                    <v-col cols="3" class="text-center pl-14">
                      <h5>Name</h5>
                    </v-col>
                    <v-col cols="5" class="text-center pl-16">
                      <h5>Quantity</h5>
                    </v-col>
                    <v-col cols="2  " class="text-center pl-2">
                      <h5>Price</h5>
                    </v-col>
                  </v-row>
                  <v-card
                    style="
                      height: 30vh;
                      width: 37vw;
                      overflow-y: auto;
                      /* background-color: #e7e7e7; */
                    "
                    class="pl-0"
                    flat
                  >
                    <v-card
                      v-for="item in vendorStore.orderList"
                      :key="item.v_mat_id"
                      class="pa-3 mb-2 mt-3 ml-0 pt-0"
                      style="
                        border-radius: 5px;
                        border: 2px solid;
                        width: 30vw;
                        height: 8vh;
                      "
                    >
                      <v-row>
                        <!-- <v-col cols="2">
                          <v-img
                            height="7vh"
                            width="90%"
                            :src="`${backendURL}/products/image/${item.product_image}`"
                          ></v-img>
                        </v-col> -->
                        <v-col cols="3" class="pl-0">
                          <v-card-text style="font-size: small">
                            {{ item.v_mat_name }}</v-card-text
                          >
                        </v-col>
                        <v-col cols="1" class="text-right"
                          ><v-card-actions class="justify-center">
                            <v-btn
                              color="#CC0000"
                              @click="
                                vendorStore.delAmount(item);
                                if (vendorStore.orderList.length <= 0) {
                                  dis = false;
                                } else {
                                  dis = true;
                                }
                              "
                              style="font-weight: bolder"
                            >
                              -
                            </v-btn>
                          </v-card-actions></v-col
                        >
                        <v-col cols="2" class="text-center">
                          <v-card-text style="font-size: small">{{
                            item.v_mat_amount
                          }}</v-card-text>
                        </v-col>
                        <v-col cols="1" class="text-left"
                          ><v-card-actions class="justify-center">
                            <v-btn
                              color="#009900"
                              @click="vendorStore.addAmount(item)"
                              style="font-weight: bolder"
                            >
                              +
                            </v-btn>
                          </v-card-actions>
                        </v-col>
                        <v-col cols="3" class="text-center"
                          ><v-card-text style="font-size: small">{{
                            item.v_mat_price * item.v_mat_amount!
                          }}</v-card-text></v-col
                        >
                        <v-col cols="1" class="text-center">
                          <v-btn
                            :icon="mdiTrashCanOutline"
                            @click="
                              vendorStore.removeCart(item);
                              if (vendorStore.orderList.length <= 0) {
                                dis = false;
                              } else {
                                dis = true;
                              }
                            "
                            style="font-weight: bolder"
                            variant="plain"
                          >
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-card>
                </v-container>

                <v-card>
                  <v-divider style="background-color: black"></v-divider>
                </v-card>
                <v-table style="width: 35vw; height: 24vh">
                  <tbody>
                    <tr>
                      <td>Total :</td>
                      <td class="text-lg-right">
                        {{ vendorStore.totalPrice }}
                      </td>
                      <td class="text-lg-right">Baht</td>
                    </tr>
                  </tbody>
                </v-table>
                <v-row class="text-center">
                  <v-col>
                    <v-btn
                      style="height: 5vh; width: 20vw"
                      rounded
                      class="fontbtn"
                      color="#df8057"
                      @click="vendorStore.openBill()"
                      >PAY</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text></v-card
    ></v-dialog
  >
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
.fontbtn {
  color: rgb(0, 0, 0);
  font-weight: bold;
}

.font-btn {
  font-weight: bold;
}
td {
  font-weight: bold;
}
</style>
