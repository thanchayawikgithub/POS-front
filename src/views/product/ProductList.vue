<script setup lang="ts">
import { useProductStore } from "@/stores/product";
import { onMounted } from "vue";

import { mdiPlus, mdiDelete, mdiPencil, mdiMagnify } from "@mdi/js";
import ProductDialog from "./ProductDialog.vue";
const productsStore = useProductStore();
onMounted(async () => {
  await productsStore.getProducts();
});
const backendURL = import.meta.env.VITE_BACKEND_URL;

// function change(index: number, rating: number) {
//   console.log("action" + index + " :" + rating);
//   productsStore.getProducts.[index].rating = rating;
// }
</script>

<template>
  <ProductDialog></ProductDialog>
  <v-container>
    <v-row justify="end">
      <v-text-field
        v-model="productsStore.keyword"
        style="height: 5vh"
        density="comfortable"
        variant="outlined"
        label="Search"
        :append-inner-icon="mdiMagnify"
        clearable
        class="pa-3"
      ></v-text-field
      ><v-col cols="2" offset="12">
        <v-btn
          color="primary"
          :prepend-icon="mdiPlus"
          @click="productsStore.dialog = true"
          >Add New</v-btn
        >
      </v-col></v-row
    >
    <v-row cols="12">
      <v-col>
        <v-table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Size</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of productsStore.products" :key="item.product_id">
              <td>{{ item.product_id }}</td>
              <td>{{ item.product_name }}</td>
              <td>{{ item.product_type }}</td>
              <td>{{ item.product_size }}</td>
              <td>{{ item.product_price }}</td>
              <td>{{ item.categoryId }}</td>
              <td>
                <v-img
                  style="height: 7vh; width: 3vw"
                  :src="`${backendURL}/products/image/${item.product_image}`"
                >
                </v-img>
              </td>
              <td>
                <v-btn
                  :icon="mdiPencil"
                  color="secondary"
                  class="ma-1"
                  @click="productsStore.editProduct(item)"
                ></v-btn>
                <v-btn
                  :icon="mdiDelete"
                  color="error"
                  class="ma-1"
                  @click="
                    (productsStore.deleteDialog = true),
                      (productsStore.checkDialog = item.product_id!)
                  "
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-pagination
          :length="productsStore.lastPage"
          v-model="productsStore.page"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>
