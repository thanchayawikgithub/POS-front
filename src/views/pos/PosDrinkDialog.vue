<script lang="ts" setup>
import product from "@/services/product";
import { useOrderStore } from "@/stores/order";
import { useProductStore } from "@/stores/product";

import { mdiSpoonSugar, mdiCoffeeOutline, mdiResize } from "@mdi/js";
import { ref } from "vue";
const orderStore = useOrderStore();
const productStore = useProductStore();
const selection = ref(3);
const selectionSize = ref(0);
const selectionType = ref(1);
const reset = () => {
  selection.value = 3;
  selectionSize.value = 0;
  selectionType.value = 1;
};

const backendURL = import.meta.env.VITE_BACKEND_URL;
</script>

<template>
  <v-dialog v-model="orderStore.posDrinkDialog" persistent width="600">
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
              >{{
                orderStore.UpdateType + " " + orderStore.UpdateSizeText
              }}</v-card-text
            >
            <v-card-text
              style="text-align: center; font-size: 15px"
              class="pt-2 pb-0"
              >{{ "Sweetness Level " + orderStore.UpdateOther }}</v-card-text
            >
            <v-card-text
              style="text-align: center; font-size: 13px"
              class="pt-0 pb-0"
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
                            :prepend-icon="mdiCoffeeOutline"
                          ></v-btn
                        ></v-card>
                      </v-col>
                      <v-col cols-6
                        ><v-btn-toggle
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
                            orderStore.Order!.product_type === 'Soda Drink'
                          "
                            disabled
                            @click="
                              orderStore.updatePrice(
                                'HOT',
                                orderStore.Order!.product_price
                              );
                              orderStore.updateType(
                                'HOT',
                                orderStore.Order!.product_name
                              );
                            "
                            >HOT -
                          </v-btn>
                          <v-btn
                            style="width: 7vw; font-size: x-small"
                            v-else
                            @click="
                              orderStore.updatePrice(
                                'HOT',
                                orderStore.Order!.product_price
                              );
                              orderStore.updateType(
                                'HOT',
                                orderStore.Order!.product_name
                              );
                            "
                            >HOT ฿{{
                              orderStore.Order!.product_price - 5
                            }}</v-btn
                          >

                          <v-btn
                            style="width: 7vw; font-size: x-small"
                            @click="
                              orderStore.updatePrice(
                                'ICED',
                                orderStore.Order!.product_price
                              );
                              orderStore.updateType(
                                'ICED',
                                orderStore.Order!.product_name
                              );
                            "
                            >ICED ฿{{ orderStore.Order?.product_price }}</v-btn
                          >
                          <v-btn
                            style="width: 7vw; font-size: x-small"
                            @click="
                              orderStore.updatePrice(
                                'SMOOTHIE',
                                orderStore.Order!.product_price
                              );
                              orderStore.updateType(
                                'SMOOTHIE',
                                orderStore.Order!.product_name
                              );
                            "
                            >SMOOTHIE ฿{{
                              orderStore.Order!.product_price + 5
                            }}</v-btn
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
                            :prepend-icon="mdiResize"
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
                          <v-btn
                            style="width: 7vw; font-size: small"
                            @click="
                              orderStore.updateSize(0, '8 Oz.'),
                                orderStore.updateSizeText('8 Oz.', '8')
                            "
                            >8 Oz. (+฿0)</v-btn
                          >
                          <v-btn
                            style="width: 7vw; font-size: small"
                            @click="
                              orderStore.updateSize(5, '12 Oz.'),
                                orderStore.updateSizeText('12 Oz.', '12')
                            "
                            >12 Oz. (+฿5)</v-btn
                          >
                          <v-btn
                            style="width: 7vw; font-size: small"
                            @click="
                              orderStore.updateSize(10, '16 Oz.'),
                                orderStore.updateSizeText('16 Oz.', '16')
                            "
                            >16 Oz. (+฿10)</v-btn
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
                            style="
                              width: 6vw;
                              font-size: x-small;
                              text-align: center;
                            "
                            class="justify-center"
                            @click="orderStore.updateOther('Not Sweet', '0%')"
                            >Not Sweet <br />0%</v-chip
                          >
                          <v-chip
                            style="
                              width: 6vw;
                              font-size: x-small;
                              text-align: center;
                            "
                            class="justify-center"
                            @click="
                              orderStore.updateOther('Quarter Sweet', '25%')
                            "
                            >Quarter Sweet <br />25%</v-chip
                          >

                          <v-chip
                            style="
                              width: 6vw;
                              font-size: x-small;
                              text-align: center;
                            "
                            class="justify-center"
                            @click="orderStore.updateOther('Less Sweet', '50%')"
                            >Less Sweet <br />50%</v-chip
                          >

                          <v-chip
                            style="
                              width: 6vw;
                              font-size: x-small;
                              text-align: center;
                            "
                            class="justify-center"
                            @click="orderStore.updateOther('Normal', '100%')"
                            >Normal <br />100%</v-chip
                          >

                          <v-chip
                            style="
                              width: 6vw;
                              font-size: x-small;
                              text-align: center;
                            "
                            class="justify-center"
                            @click="
                              orderStore.updateOther('More Sweet', '125%')
                            "
                            >More Sweet <br />125%</v-chip
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
          @click="(orderStore.posDrinkDialog = false), reset()"
        >
          Close
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          style="color: #e7e7e7"
          variant="flat"
          color="#655a54"
          @click="
            orderStore.posDrinkDialog = false;

            orderStore.Order!.product_updateName =
              orderStore.UpdateType +
              '' +
              orderStore.UpdateSizeText +
              ' ' +
              orderStore.UpdateOther;
            orderStore.Order!.product_updatePrice =
              orderStore.UpdatePrice + orderStore.UpdateSize;
            orderStore.addCart(orderStore.Order!);

            reset();
          "
        >
          Add | ฿{{ orderStore.UpdatePrice + orderStore.UpdateSize }}
        </v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>

<style></style>
