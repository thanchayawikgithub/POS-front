<script setup lang="ts">
import { useVendorStore } from "@/stores/vendor";
import { mdiTrashCanOutline } from "@mdi/js";
const vendorStore = useVendorStore();
// const backendURL = import.meta.env.VITE_BACKEND_URL;
</script>
<template>
  <div>
    <v-container fluid>
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
                  @click="vendorStore.delAmount(item)"
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
                @click="vendorStore.removeCart(item)"
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
  </div>
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
