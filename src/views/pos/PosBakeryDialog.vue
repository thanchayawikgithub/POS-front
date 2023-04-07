<script lang="ts" setup>
import { useOrderStore } from "@/stores/order";

import { mdiSpoonSugar, mdiCupcake, mdiResize } from "@mdi/js";
import { ref } from "vue";
const orderStore = useOrderStore();

const backendURL = import.meta.env.VITE_BACKEND_URL;
</script>

<template>
  <v-dialog v-model="orderStore.posBakeryDialog" persistent width="600">
    <v-card style="background-color: #e7e7e7">
      <v-container>
        <v-row>
          <v-col>
            <v-card
              style="width: 12vw; height: 22vh; background-color: #e7e7e7"
              class="mx-auto pl-7 mb-0"
              flat
            >
              <v-avatar size="130px" style="background-color: white">
                <v-img
                  class="ml-2 mt-2"
                  style="height: 70px"
                  :src="`${backendURL}/products/image/${orderStore.Order?.product_image}`"
                >
                </v-img>
              </v-avatar>
            </v-card>
            <v-card-text
              style="text-align: center; font-size: 32px; font-weight: 700"
              class="pb-1 pt-1"
              >{{ orderStore.Order?.product_name }}</v-card-text
            >
            <v-card-text
              style="text-align: center; font-size: 13px"
              class="pt-0"
              >{{ orderStore.Order?.product_type }}</v-card-text
            >
            <v-row class="pb-0">
              <v-col>
                <v-card style="border-radius: 20px" height="15vh">
                  <v-container>
                    <v-row>
                      <v-card-text
                        style="
                          font-size: large;
                          color: chocolate;
                          font-weight: 700;
                        "
                        >{{ orderStore.Order?.product_type }} Type</v-card-text
                      >
                    </v-row>
                    <v-row class="mt-0">
                      <v-col cols-6>
                        <v-card
                          flat
                          style="width: 3vw; height: 6vh; border-radius: 8px"
                          color="#e7e7e7"
                        >
                          <v-btn
                            variant="plain"
                            disabled
                            class="pl-0"
                            size="x-large"
                            height="6vh"
                            :prepend-icon="mdiCupcake"
                          ></v-btn
                        ></v-card>
                      </v-col>
                      <v-col cols-6
                        ><v-btn-toggle
                          rounded="xl"
                          variant="outlined"
                          divided
                          color="#df8057"
                          style="height: 5vh; width: 22vw; border: 1px"
                        >
                          <v-btn disabled style="width: 7vw; font-size: large"
                            >-</v-btn
                          >
                          <v-btn disabled style="width: 7vw; font-size: large">
                            -</v-btn
                          >
                          <v-btn disabled style="width: 7vw; font-size: large"
                            >-</v-btn
                          >
                        </v-btn-toggle></v-col
                      >
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col>
                <v-card style="border-radius: 20px" height="15vh">
                  <v-container>
                    <v-row>
                      <v-card-text
                        style="
                          font-size: large;
                          color: chocolate;
                          font-weight: 700;
                        "
                        >{{ orderStore.Order?.product_type }} Size</v-card-text
                      >
                    </v-row>
                    <v-row class="mt-0">
                      <v-col cols-6>
                        <v-card
                          flat
                          style="width: 3vw; height: 6vh; border-radius: 8px"
                          color="#e7e7e7"
                        >
                          <v-btn
                            variant="plain"
                            disabled
                            class="pl-0"
                            size="x-large"
                            height="6vh"
                            :prepend-icon="mdiResize"
                          ></v-btn
                        ></v-card>
                      </v-col>
                      <v-col cols-6
                        ><v-btn-toggle
                          rounded="xl"
                          variant="outlined"
                          divided
                          color="#df8057"
                          style="height: 5vh; width: 22vw; border: 1px"
                        >
                          <v-btn disabled style="width: 7vw; font-size: large"
                            >-</v-btn
                          >
                          <v-btn disabled style="width: 7vw; font-size: large"
                            >-</v-btn
                          >
                          <v-btn disabled style="width: 7vw; font-size: large"
                            >-</v-btn
                          >
                        </v-btn-toggle></v-col
                      >
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="mt-0">
              <v-col>
                <v-card style="border-radius: 20px" height="15vh">
                  <v-container>
                    <v-row>
                      <v-card-text
                        style="
                          font-size: large;
                          color: chocolate;
                          font-weight: 700;
                        "
                        >Sweetness Level</v-card-text
                      >
                    </v-row>
                    <v-row class="mt-0">
                      <v-col cols="2">
                        <v-card
                          flat
                          style="width: 3vw; height: 6vh; border-radius: 8px"
                          color="#e7e7e7"
                        >
                          <v-btn
                            variant="plain"
                            disabled
                            class="pl-0"
                            size="x-large"
                            height="6vh"
                            :prepend-icon="mdiSpoonSugar"
                          ></v-btn
                        ></v-card>
                      </v-col>
                      <v-col cols="10">
                        <v-chip-group
                          v-model="selection"
                          color="#df8057"
                          variant="outlined"
                        >
                          <v-chip
                            disabled
                            style="
                              width: 6vw;
                              font-size: large;
                              text-align: center;
                            "
                            class="justify-center"
                            >-</v-chip
                          >
                          <v-chip
                            disabled
                            style="
                              width: 6vw;
                              font-size: large;
                              text-align: center;
                            "
                            class="justify-center"
                            >-</v-chip
                          >

                          <v-chip
                            disabled
                            style="
                              width: 6vw;
                              font-size: large;
                              text-align: center;
                            "
                            class="justify-center"
                            >-</v-chip
                          >

                          <v-chip
                            disabled
                            style="
                              width: 6vw;
                              font-size: large;
                              text-align: center;
                            "
                            class="justify-center"
                            >-</v-chip
                          >

                          <v-chip
                            disabled
                            style="
                              width: 6vw;
                              font-size: large;
                              text-align: center;
                            "
                            class="justify-center"
                            >-</v-chip
                          >
                        </v-chip-group></v-col
                      >
                    </v-row>
                  </v-container>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>

      <v-card-actions>
        <v-btn
          color="darken-1"
          variant="plain"
          @click="orderStore.posBakeryDialog = false"
        >
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          style="color: #e7e7e7"
          variant="flat"
          color="#655a54"
          @click="
            orderStore.posBakeryDialog = false;
            orderStore.Order!.product_updateName! =
              orderStore.Order!.product_name;
            orderStore.Order!.product_updatePrice! =
              orderStore.Order!.product_price;
            orderStore.addCart(orderStore.Order!);
          "
        >
          Add | ฿{{ orderStore.Order?.product_price }}
        </v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>

<style></style>
