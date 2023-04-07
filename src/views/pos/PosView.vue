<script setup lang="ts">
import { onMounted, ref } from "vue";

import { mdiMagnify } from "@mdi/js";

import { useCategoryStore } from "@/stores/category";
import { useProductStore } from "@/stores/product";
import { useOrderStore } from "@/stores/order";
import { useCustomerStore } from "@/stores/customer";

import PayDialog from "./PayDialog.vue";
import PosDrinkDialog from "./PosDrinkDialog.vue";
import PosBakeryDialog from "./PosBakeryDialog.vue";
import PosFoodDialog from "./PosFoodDialog.vue";
import { mdiTrashCanOutline } from "@mdi/js";
import CustomerDialog from "@/views/Customer/CustomerDialog.vue";
import SuccessDialog from "./SuccessDialog.vue";
import CustomerSearchDialog from "./CustomerSearchDialog.vue";
import ReceiptDialog from "./ReceiptDialog.vue";
import PosUsePointDialog from "./PosUsePointDialog.vue";
const customerStore = useCustomerStore();
const tab = ref("Menu");
const type = ref(["Drink", "Bakery", "Food"]);

const orderStore = useOrderStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const backendURL = import.meta.env.VITE_BACKEND_URL;
onMounted(async () => {
  await categoryStore.getCategorys();
  //await productStore.getProducts();
  productStore.selectedType = productStore.type.find(
    (type) => type.type_id === productStore.category
  );
  await productStore.getProductsByCategory(
    productStore.category,
    productStore.getByCatKeyword,
    productStore.getByTypeKeyword
  );
  console.log(categoryStore.categorys);
});

function Hot(CatId: number, Type: String) {
  if (CatId === 1 && Type == "Coffee") {
    return "Hot";
  } else if (CatId === 1 && Type == "Tea") {
    return "Hot";
  } else if (CatId === 1 && Type == "Soda Drink") {
    return "Hot";
  } else if (CatId === 3 && Type == "Thai Food") {
    return "Chicken";
  }
}
function Ice(CatId: number, Type: String) {
  if (CatId === 1 && Type == "Coffee") {
    return "Iced";
  } else if (CatId === 1 && Type == "Tea") {
    return "Iced";
  } else if (CatId === 1 && Type == "Soda Drink") {
    return "Iced";
  } else if (CatId === 3 && Type == "Thai Food") {
    return "Pig";
  }
}
function Smoothie(CatId: number, Type: String) {
  if (CatId === 1 && Type == "Coffee") {
    return "Frappe";
  } else if (CatId === 1 && Type == "Tea") {
    return "Smoothie";
  } else if (CatId === 1 && Type == "Soda Drink") {
    return "Smoothie";
  } else if (CatId === 3 && Type == "Thai Food") {
    return "SeaFood";
  }
}
</script>

<template>
  <PosUsePointDialog></PosUsePointDialog>
  <PosBakeryDialog></PosBakeryDialog>
  <PosDrinkDialog></PosDrinkDialog>
  <PosFoodDialog></PosFoodDialog>
  <PayDialog></PayDialog>
  <SuccessDialog></SuccessDialog>
  <ReceiptDialog></ReceiptDialog>
  <CustomerSearchDialog></CustomerSearchDialog>
  <v-main class="bg pl-0 pt-2">
    <v-row class="ml-0">
      <v-col cols="7">
        <v-card
          style="border: 3px solid; height: 97vh; width: 58vw"
          class="bg2"
        >
          <v-tabs v-model="productStore.category" grow style="height: 10vh">
            <v-tab
              v-for="item of categoryStore.categorys"
              :key="item.category_id"
              :value="item.category_id"
              style="font-weight: bold; font-size: 20px; height: 7vh"
            >
              {{ item.category_name }}
            </v-tab>
          </v-tabs>

          <v-row>
            <v-col cols="8" class="d-flex">
              <v-select
                :items="productStore.selectedType?.type_list"
                item-title="type_name"
                item-value="type_name"
                label="Type"
                class="pa-3"
                variant="outlined"
                v-model="productStore.getByTypeKeyword"
                density="comfortable"
                style="height: 11vh"
              >
              </v-select>
            </v-col>

            <v-col cols="4">
              <v-text-field
                v-model="productStore.getByCatKeyword"
                style="height: 7vh"
                density="comfortable"
                variant="outlined"
                label="Search"
                :append-inner-icon="mdiMagnify"
                class="pa-3"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-window v-model="tab" style="overflow-y: auto; width: 60vw">
            <v-window-item
              v-for="item in type"
              :key="item"
              :value="item"
              style="height: 70vh"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  v-for="item in productStore.products"
                  :key="item.product_id"
                >
                  <v-btn
                    style="width: 33vh; height: 29vh; background-color: #84776f"
                    class="ma-2 mt-2 ml-3"
                    @click="
                      if (item.categoryId === 1) {
                        orderStore.addOrder(item);
                        orderStore.updatePrice('ICED', item.product_price);
                        orderStore.updateType('ICED', item.product_name);
                        orderStore.updateSizeText('8 Oz.', '8');
                        orderStore.updateOther('Normal', '100%');
                        orderStore.posDrinkDialog = true;
                      } else if (item.categoryId === 2) {
                        orderStore.addOrder(item);

                        orderStore.posBakeryDialog = true;
                      } else if (item.categoryId === 3) {
                        if (item.product_type === 'Thai Food') {
                          orderStore.addOrder(item);
                          orderStore.updatePrice(
                            'Pig',
                            orderStore.Order!.product_price
                          );
                          orderStore.updateType(
                            'Pig',
                            orderStore.Order!.product_name
                          );

                          orderStore.updateSizeText('M', 'M');
                        } else {
                          orderStore.addOrder(item);
                          orderStore.Order!.product_updateName! =
                            orderStore.Order!.product_name;
                          orderStore.Order!.product_updatePrice! =
                            orderStore.Order!.product_price;
                        }

                        orderStore.posFoodDialog = true;
                      }
                    "
                  >
                    <v-card
                      style="width: 33vh; height: 30vh"
                      class="mx-auto card"
                    >
                      <v-img
                        class="align-end image mt-0"
                        style="height: 11vh; width: 20vw"
                        :src="`${backendURL}/products/image/${item.product_image}`"
                      >
                      </v-img>
                      <v-card-title class="title mb-2"
                        >{{ item.product_name }}
                      </v-card-title>
                      <v-card-title
                        style="font-size: x-small; font-weight: 100"
                        class="title mb-1"
                        >{{ item.product_type }}
                      </v-card-title>
                      <v-card-title class="price"
                        ><v-btn-toggle
                          v-if="item.categoryId === 1"
                          variant="outlined"
                          divided
                          class="pt-2 pl-1"
                          color="#df8057"
                          style="height: 5vh; width: 13vw; border: 10px"
                        >
                          <v-btn
                            style="width: 4vw; font-size: xx-small"
                            v-if="item.product_type === 'Soda Drink'"
                            disabled
                            >{{ Hot(item.categoryId, item.product_type) }}
                            <br />-</v-btn
                          ><v-btn style="width: 4vw; font-size: xx-small" v-else
                            >{{ Hot(item.categoryId, item.product_type) }}
                            <br />
                            ฿{{ item.product_price }}</v-btn
                          >

                          <v-btn
                            style="
                              width: 4vw;
                              font-size: xx-small;
                              border: solid 1px;
                            "
                            >{{ Ice(item.categoryId, item.product_type) }}<br />
                            ฿{{ item.product_price }}</v-btn
                          >

                          <v-btn style="width: 4vw; font-size: xx-small"
                            >{{ Smoothie(item.categoryId, item.product_type)
                            }}<br />
                            ฿{{ item.product_price + 5 }}</v-btn
                          >
                        </v-btn-toggle>
                        <v-btn-toggle
                          v-if="item.categoryId === 2"
                          variant="outlined"
                          divided
                          class="pt-2 pl-1"
                          color="#df8057"
                          style="height: 5vh; width: 13vw; border: 10px"
                        >
                          <v-btn style="width: 4vw; font-size: small" disabled
                            >{{
                              Hot(item.categoryId, item.product_type)
                            }}
                            -</v-btn
                          >

                          <v-btn
                            style="
                              width: 4vw;
                              font-size: small;
                              border: solid 1px;
                            "
                            >{{ Ice(item.categoryId, item.product_type) }} ฿{{
                              item.product_price
                            }}</v-btn
                          >

                          <v-btn style="width: 3vw; font-size: small" disabled
                            >{{
                              Smoothie(item.categoryId, item.product_type)
                            }}-</v-btn
                          >
                        </v-btn-toggle>
                        <v-btn-toggle
                          v-if="item.categoryId === 3"
                          variant="outlined"
                          divided
                          class="pt-2 pl-1"
                          color="#df8057"
                          style="height: 5vh; width: 13vw; border: 10px"
                        >
                          <v-btn
                            style="width: 4vw; font-size: xx-small"
                            v-if="item.product_type === 'Thai Food'"
                            >{{ Hot(item.categoryId, item.product_type) }}
                            <br />{{ item.product_price }}</v-btn
                          ><v-btn
                            style="width: 4vw; font-size: small"
                            v-else
                            disabled
                            >{{
                              Hot(item.categoryId, item.product_type)
                            }}
                            -</v-btn
                          >

                          <v-btn
                            v-if="item.product_type === 'Thai Food'"
                            style="
                              font-size: xx-small;
                              border: solid 1px;
                              width: 2vw;
                            "
                            >{{ Ice(item.categoryId, item.product_type) }}<br />
                            ฿{{ item.product_price }}</v-btn
                          >
                          <v-btn
                            v-else
                            style="
                              font-size: small;
                              border: solid 1px;
                              width: 2vw;
                            "
                            >{{ Ice(item.categoryId, item.product_type) }} ฿{{
                              item.product_price
                            }}</v-btn
                          >
                          <v-btn
                            style="font-size: xx-small; width: 2vw"
                            v-if="item.product_type === 'Thai Food'"
                            >{{ Smoothie(item.categoryId, item.product_type)
                            }}<br />
                            ฿{{ item.product_price + 5 }}</v-btn
                          >

                          <v-btn
                            style="font-size: small; width: 2vw"
                            v-else
                            disabled
                            >{{
                              Smoothie(item.categoryId, item.product_type)
                            }}-</v-btn
                          >
                        </v-btn-toggle>
                      </v-card-title>
                    </v-card>
                  </v-btn>
                </v-col>
              </v-row>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
      <v-col cols="4" class="mx-12">
        <v-card
          height="900px"
          width="75vh"
          style="border: 3px solid; height: 97vh"
          class="bg2 ml-0"
        >
          <h2 style="text-align: center; font-size: 20px; padding-top: 6px">
            Cart
          </h2>

          <v-container fluid>
            <v-row>
              <v-col cols="1 "> </v-col>
              <v-col cols="3" class="text-center pl-0">
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
                height: 40vh;
                width: 37vw;
                overflow-y: auto;
                background-color: #e7e7e7;
              "
              class="pl-0"
              flat
            >
              <v-card
                class="pa-3 mb-2 mt-3 ml-0"
                v-for="item in orderStore.orderList"
                :key="item.product_id"
                color="#f2f2f0"
                style="
                  border-radius: 5px;
                  border: 2px solid;
                  width: 33vw;
                  height: 11vh;
                "
              >
                <v-row>
                  <v-col cols="5" class="pl-0">
                    <v-card-text> {{ item.product_updateName }}</v-card-text>
                  </v-col>
                  <v-col cols="1" class="text-right"
                    ><v-card-actions class="justify-center">
                      <v-btn
                        color="#CC0000"
                        @click="orderStore.delAmount(item)"
                        style="font-weight: bolder"
                      >
                        -
                      </v-btn>
                    </v-card-actions></v-col
                  >
                  <v-col cols="2" class="text-center">
                    <v-card-text>{{ item.product_amount }}</v-card-text>
                  </v-col>
                  <v-col cols="1" class="text-left"
                    ><v-card-actions class="justify-center">
                      <v-btn
                        color="#009900"
                        @click="orderStore.addAmount(item)"
                        style="font-weight: bolder"
                      >
                        +
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                  <v-col cols="2" class="text-center"
                    ><v-card-text>{{
                      item.product_updatePrice! * item.product_amount!
                    }}</v-card-text>
                  </v-col>
                  <v-col cols="1" class="text-center">
                    <v-btn
                      :icon="mdiTrashCanOutline"
                      @click="orderStore.removeCart(item)"
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
          <CustomerDialog />
          <v-container>
            <v-row class="text-center">
              <v-col
                ><v-btn
                  style="width: 13vw"
                  rounded
                  color="#f6ad8d"
                  class="font-btn"
                  @click="customerStore.dialog = true"
                >
                  Register Member
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  style="width: 13vw"
                  rounded
                  color="#f6ad8d"
                  class="font-btn"
                  @click="customerStore.searchDialog = true"
                >
                  Search
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          <v-table style="background-color: #e7e7e7; width: 35vw; height: 24vh">
            <tbody>
              <tr>
                <td style="width: 100%">Member :</td>

                <td class="text-lg-right">
                  {{ customerStore.customer?.customer_name }}
                </td>
                <td class="text-lg-right"></td>
              </tr>
              <tr>
                <td>Point :</td>
                <td>
                  <v-btn variant="outline" @click="orderStore.usePoint = true"
                    >Use</v-btn
                  >
                </td>
                <td class="text-lg-right">{{ 0 }}</td>
                <td class="text-lg-right">Point</td>
              </tr>
              <tr>
                <td>Price :</td>
                <td></td>
                <td class="text-lg-right">{{ orderStore.totalPrice }}</td>
                <td class="text-lg-right">Baht</td>
              </tr>
              <tr>
                <td>Discount :</td>
                <td></td>
                <td class="text-lg-right">0</td>
                <td class="text-lg-right">Baht</td>
              </tr>
              <tr>
                <td>Total :</td>
                <td></td>
                <td class="text-lg-right">{{ orderStore.totalPrice }}</td>
                <td class="text-lg-right">Baht</td>
              </tr>
            </tbody>
          </v-table>
          <v-container>
            <v-row class="text-center">
              <v-col>
                <v-btn
                  style="height: 5vh; width: 20vw"
                  rounded
                  class="eiei"
                  color="#df8057"
                  @click="orderStore.pay()"
                  >PAY</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-main>
</template>
<style scoped>
.fullscreen {
  width: 150vw;
  height: 100vh;
}

.halfscreen {
  height: 50vh;
  width: 50vw;
}

.bg {
  background-color: #e7e7e7;
}

.bg2 {
  background-color: #e7e7e7;
}

.card {
  box-shadow: 0px 1px 13px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 120ms;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;

  padding-bottom: 4em;
}

.card::after {
  content: "Add to Cart";
  padding-top: 0.7em;
  padding-left: 1.25em;
  position: absolute;
  left: 0;
  bottom: -65px;
  background: #84776f;
  color: #fff;
  height: 7vh;
  width: 100%;
  transition: all 80ms;
  font-weight: 600;
  text-transform: uppercase;
}

.card .title {
  font-family: sans-serif;
  font-size: 1.1em;
  position: absolute;
  left: 0em;
  bottom: 2em;
  font-weight: bold;
}

.card .price {
  font-family: sans-serif;
  font-size: 1em;
  position: absolute;
  left: 0em;
  bottom: 0.1em;
}

.card:hover::after {
  bottom: 0;
}

.card:active {
  transform: scale(0.98);
}

.card:active::after {
  content: "Added !";
  height: 3.125em;
}

.text {
  max-width: 55px;
}

.image {
  background: #ffffff;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}

.font-btn {
  font-weight: bold;
}

td {
  font-weight: bold;
}

.eiei {
  color: rgb(0, 0, 0);
  font-weight: bold;
}
</style>
