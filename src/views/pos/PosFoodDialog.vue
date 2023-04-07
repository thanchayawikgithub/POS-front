<script lang="ts" setup>
import { useOrderStore } from "@/stores/order";

import { mdiDotsHorizontal, mdiFood, mdiFoodSteak } from "@mdi/js";
import { ref } from "vue";
const orderStore = useOrderStore();

const selectionSize = ref(1);
const selectionType = ref(1);
const reset = () => {
  selectionSize.value = 1;
  selectionType.value = 1;
};
const backendURL = import.meta.env.VITE_BACKEND_URL;
</script>

<template>
  <v-dialog v-model="orderStore.posFoodDialog" persistent width="600">
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
              v-if="orderStore.Order?.product_type === 'Thai Food'"
              style="text-align: center; font-size: 32px; font-weight: 700"
              class="pb-1 pt-1"
              >{{
                orderStore.UpdateType + " " + orderStore.UpdateSizeText
              }}</v-card-text
            >
            <v-card-text
              v-else
              style="text-align: center; font-size: 32px; font-weight: 700"
              class="pb-1 pt-1"
              >{{ orderStore.Order?.product_name }}</v-card-text
            >
            <v-card-text
              style="text-align: center; font-size: 13px"
              class="pt-0"
              >{{ orderStore.Order!.product_type }}</v-card-text
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
                        >{{ orderStore.Order!.product_type }} Type</v-card-text
                      >
                    </v-row>
                    <v-row class="mt-0">
                      <v-col cols="4">
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
                            :prepend-icon="mdiFoodSteak"
                          ></v-btn
                        ></v-card>
                      </v-col>
                      <v-col cols="8"
                        ><v-btn-toggle
                          class="ml-5"
                          rounded="xl"
                          variant="outlined"
                          divided
                          v-model="selectionType"
                          color="#df8057"
                          style="height: 5vh; width: 22vw; border: 1px"
                        >
                          <v-btn
                            style="width: 7vw; font-size: x-small"
                            v-if="
                            orderStore.Order!.product_type === 'Thai Food'
                          "
                            @click="
                              orderStore.updatePrice(
                                'Chicken',
                                orderStore.Order!.product_price
                              );
                              orderStore.updateType(
                                'Chicken',
                                orderStore.Order!.product_name
                              );
                            "
                            >Chicken ฿{{
                              orderStore.Order!.product_price - 5
                            }}</v-btn
                          >
                          <v-btn
                            style="width: 7vw; font-size: larger"
                            v-else
                            disabled
                          >
                            -</v-btn
                          >
                          <v-btn
                            style="width: 7vw; font-size: x-small"
                            v-if="
                            orderStore.Order!.product_type === 'Thai Food'
                          "
                            @click="
                              orderStore.updatePrice(
                                'Pig',
                                orderStore.Order!.product_price
                              );
                              orderStore.updateType(
                                'Pig',
                                orderStore.Order!.product_name
                              );
                            "
                            >Pig ฿{{ orderStore.Order!.product_price }}</v-btn
                          >
                          <v-btn
                            style="width: 7vw; font-size: larger"
                            v-else
                            disabled
                            >-</v-btn
                          >

                          <v-btn
                            style="width: 7vw; font-size: x-small"
                            v-if="
                            orderStore.Order!.product_type === 'Thai Food'
                          "
                            @click="
                              orderStore.updatePrice(
                                'Seafood',
                                orderStore.Order!.product_price
                              );
                              orderStore.updateType(
                                'Seafood',
                                orderStore.Order!.product_name
                              );
                            "
                            >Seafood ฿{{
                              orderStore.Order!.product_price + 10
                            }}</v-btn
                          ><v-btn
                            style="width: 7vw; font-size: larger"
                            v-else
                            disabled
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
                        >{{ orderStore.Order!.product_type }} Size</v-card-text
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
                            :prepend-icon="mdiFood"
                          ></v-btn
                        ></v-card>
                      </v-col>
                      <v-col cols-6
                        ><v-btn-toggle
                          rounded="xl"
                          variant="outlined"
                          divided
                          v-model="selectionSize"
                          color="#df8057"
                          style="height: 5vh; width: 22vw; border: 1px"
                        >
                          <v-btn disabled style="width: 7vw; font-size: large"
                            >-</v-btn
                          >
                          <v-btn
                            style="width: 7vw; font-size: small"
                            v-if="
                            orderStore.Order!.product_type === 'Thai Food'
                          "
                            @click="
                              orderStore.updateSize(0, 'M'),
                                orderStore.updateSizeText('M', 'M')
                            "
                            >M (+฿0)</v-btn
                          >
                          <v-btn
                            style="width: 7vw; font-size: larger"
                            v-else
                            disabled
                            >-</v-btn
                          >
                          <v-btn
                            style="width: 7vw; font-size: small"
                            v-if="
                            orderStore.Order!.product_type === 'Thai Food'
                          "
                            @click="
                              orderStore.updateSize(5, 'L'),
                                orderStore.updateSizeText('L', 'L')
                            "
                            >L (+฿5)</v-btn
                          >
                          <v-btn
                            style="width: 7vw; font-size: larger"
                            v-else
                            disabled
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
                        >Other</v-card-text
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
                            :prepend-icon="mdiDotsHorizontal"
                          ></v-btn
                        ></v-card>
                      </v-col>
                      <v-col cols="10">
                        <v-chip-group
                          v-if="
                          orderStore.Order!.product_type === 'Thai Food'
                        "
                          color="#df8057"
                          variant="outlined"
                        >
                          <v-chip
                            style="
                              width: 6vw;
                              font-size: x-small;
                              text-align: center;
                            "
                            class="justify-center mt-2"
                            @click="
                              orderStore.updateOther(
                                'No Vegetable',
                                'No Vegetable'
                              )
                            "
                            >No Vegetable</v-chip
                          >
                          <v-chip
                            style="
                              width: 6vw;
                              font-size: x-small;
                              text-align: center;
                            "
                            class="justify-center mt-2"
                            @click="
                              orderStore.updateOther('No Spicy', 'No Spicy')
                            "
                            >No Spicy</v-chip
                          >

                          <v-chip
                            style="
                              width: 6vw;
                              font-size: x-small;
                              text-align: center;
                            "
                            class="justify-center mt-2"
                            @click="
                              orderStore.updateOther('Very Spicy', 'Very Spicy')
                            "
                            >Very Spicy</v-chip
                          >

                          <v-chip-group color="#df8057" variant="outlined">
                            <v-chip
                              style="
                                width: 6vw;
                                font-size: x-small;
                                text-align: center;
                              "
                              class="justify-center"
                              @click="
                                orderStore.updateOther(
                                  'Fried Egg',
                                  'Fried Egg'
                                );
                                orderStore.updateSize(5, 'Fried Egg');
                              "
                              >Fried Egg <br />+฿5</v-chip
                            >

                            <v-chip
                              style="
                                width: 6vw;
                                font-size: x-small;
                                text-align: center;
                              "
                              class="justify-center"
                              @click="
                                orderStore.updateOther('Omelet', 'Omelet');
                                orderStore.updateSize(10, 'Omelet');
                              "
                              >Omelet <br />+฿10</v-chip
                            >
                          </v-chip-group>
                        </v-chip-group>

                        <v-chip-group
                          v-else-if="
                          orderStore.Order!.product_type === 'Japanese Food'
                        "
                          color="#df8057"
                          variant="outlined"
                        >
                          <v-chip
                            style="
                              width: 6vw;
                              font-size: small;
                              text-align: center;
                            "
                            class="justify-center"
                            disabled
                            >-</v-chip
                          >
                          <v-chip
                            style="
                              width: 6vw;
                              font-size: small;
                              text-align: center;
                            "
                            class="justify-center"
                            disabled
                            >-</v-chip
                          >

                          <v-chip
                            style="
                              width: 6vw;
                              font-size: small;
                              text-align: center;
                            "
                            class="justify-center"
                            disabled
                            >-</v-chip
                          >

                          <v-chip
                            style="
                              width: 6vw;
                              font-size: small;
                              text-align: center;
                            "
                            class="justify-center"
                            disabled
                            >-</v-chip
                          >

                          <v-chip
                            style="
                              width: 6vw;
                              font-size: small;
                              text-align: center;
                            "
                            class="justify-center"
                            disabled
                            >-</v-chip
                          >
                        </v-chip-group>
                        <v-chip-group v-else color="#df8057" variant="outlined">
                          <v-chip
                            style="
                              width: 6vw;
                              font-size: small;
                              text-align: center;
                            "
                            class="justify-center"
                            disabled
                            >-</v-chip
                          >
                          <v-chip
                            style="
                              width: 6vw;
                              font-size: small;
                              text-align: center;
                            "
                            class="justify-center"
                            disabled
                            >-</v-chip
                          >

                          <v-chip
                            style="
                              width: 6vw;
                              font-size: small;
                              text-align: center;
                            "
                            class="justify-center"
                            disabled
                            >-</v-chip
                          >

                          <v-chip
                            style="
                              width: 6vw;
                              font-size: small;
                              text-align: center;
                            "
                            class="justify-center"
                            disabled
                            >-</v-chip
                          >

                          <v-chip
                            style="
                              width: 6vw;
                              font-size: small;
                              text-align: center;
                            "
                            class="justify-center"
                            disabled
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
          @click="orderStore.posFoodDialog = false"
        >
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          v-if="orderStore.Order?.product_type === 'Thai Food'"
          style="color: #e7e7e7"
          variant="flat"
          color="#655a54"
          @click="
            orderStore.posFoodDialog = false;

            orderStore.Order!.product_updateName =
              orderStore.UpdateType +
              '' +
              orderStore.UpdateSizeText +
              ' ' +
              orderStore.UpdateOther;
            orderStore.Order!.product_updatePrice =
              orderStore.UpdatePrice + orderStore.UpdateSize;
            orderStore.addCart(orderStore.Order!);
          "
        >
          Add | ฿ {{ orderStore.UpdatePrice + orderStore.UpdateSize }}
        </v-btn>
        <v-btn
          v-else
          style="color: #e7e7e7"
          variant="flat"
          color="#655a54"
          @click="
            orderStore.posFoodDialog = false;
            orderStore.Order!.product_updateName! =
              orderStore.Order!.product_name;
            orderStore.Order!.product_updatePrice! =
              orderStore.Order!.product_price;
            orderStore.addCart(orderStore.Order!);
          "
        >
          Add | ฿ {{ orderStore.Order!.product_price }}
        </v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>

<style></style>
