<script setup lang="ts">
import { onMounted, ref } from "vue";

import { mdiMagnify } from "@mdi/js";
import { useCategoryStore } from "@/stores/category";
import { useProductStore } from "@/stores/product";
import { useOrderStore } from "@/stores/order";
import OrderList from "./order/OrderList.vue";
import TotalMoney from "./order/TotalMoney.vue";
import ButtonCart from "./order/ButtonCart.vue";
import PayDialog from "./PayDialog.vue";
import product from "@/services/product";
const tab = ref("Menu");
const type = ref(["Drink", "Bakery", "Food"]);

const selected = ref(["Recommend"]);
const drinktype = ref(["Recommend", "Coffee", "Milk", "Tea", "Soda"]);

const orderStore = useOrderStore();
const categoryStore = useCategoryStore();
const productStore = useProductStore();

const backendURL = import.meta.env.VITE_BACKEND_URL;
onMounted(async () => {
  await categoryStore.getCategorys();
  //await productStore.getProducts();
  await productStore.getProductsByCategory(productStore.category);
  console.log(categoryStore.categorys);
});
</script>

<template>
  <PayDialog></PayDialog>
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
                :items="drinktype"
                label="Type"
                class="pa-3"
                variant="outlined"
                v-model="selected"
                density="comfortable"
                style="height: 11vh"
              >
              </v-select>
            </v-col>

            <v-col cols="4">
              <v-text-field
                style="height: 7vh"
                density="comfortable"
                variant="outlined"
                label="Search"
                :append-inner-icon="mdiMagnify"
                clearable
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
                  :value="item"
                >
                  <v-btn
                    style="width: 33vh; height: 29vh; background-color: #84776f"
                    class="ma-2 mt-2 ml-4"
                    @click="orderStore.addCart(item)"
                  >
                    <v-card
                      style="width: 33vh; height: 30vh"
                      class="mx-auto card"
                    >
                      <v-img
                        class="align-end image mt-0"
                        style="height: 14vh; width: 20vw"
                        :src="`${backendURL}/products/image/${item.product_image}`"
                      >
                      </v-img>
                      <v-card-title class="title"
                        >{{ item.product_name }}
                      </v-card-title>
                      <v-card-subtitle class="price"
                        >Price:{{ item.product_price }}</v-card-subtitle
                      >
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

          <OrderList />
          <TotalMoney />
          <ButtonCart />
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
  left: 0.625em;
  bottom: 1em;
  font-weight: bold;
}

.card .price {
  font-family: sans-serif;
  font-size: 1em;
  position: absolute;
  left: 0.625em;
  bottom: 0.625em;
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
</style>
