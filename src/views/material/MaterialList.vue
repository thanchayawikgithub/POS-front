<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";
import { onMounted } from "vue";

import {
  mdiDelete,
  mdiPencil,
  mdiMagnify,
  mdiClipboardEdit,
  mdiCartArrowDown,
} from "@mdi/js";
import CheckMaterialDialog from "./CheckMaterialDialog.vue";
import { useCheckMaterialStore } from "@/stores/checkMaterial";
import { useVendorStore } from "@/stores/vendor";

const materialStore = useMaterialStore();
const checkMaterialStore = useCheckMaterialStore();
const vendorStore = useVendorStore();

onMounted(async () => {
  await materialStore.getMaterials();
});

function statusColor(quantity: number, min: number) {
  if (quantity === 0) {
    return "red";
  } else if (quantity >= min) {
    return "green";
  } else if (quantity < min) {
    return "yellow";
  }
}
function statusText(quantity: number, min: number) {
  if (quantity === 0) {
    return "Sold Out";
  } else if (quantity >= min) {
    return "In Stock";
  } else if (quantity < min) {
    return "Low Stock";
  }
}
</script>

<template>
  <CheckMaterialDialog></CheckMaterialDialog>
  <v-container style="background-color: #e7e7e7"
    ><v-row class="pb-0 pl-3">
      <v-text-field
        v-model="materialStore.keyword"
        density="comfortable"
        variant="outlined"
        label="Search"
        :append-inner-icon="mdiMagnify"
        clearable
        class="pt-3"
      ></v-text-field>

      <v-col cols="4" class="mt-2">
        <v-btn
          color="#8D7B68"
          style="font-weight: bold; color: #f0e3dd"
          :prepend-icon="mdiClipboardEdit"
          class="mr-4 ml-6"
          @click="checkMaterialStore.dialog = true"
          >Check Material</v-btn
        >
        <v-btn
          color="#8D7B68"
          style="font-weight: bold; color: #f0e3dd"
          :prepend-icon="mdiCartArrowDown"
          @click="vendorStore.dialog = true"
          >Order</v-btn
        >
      </v-col>
    </v-row>
    <v-row cols="12" class="mt-0">
      <v-col>
        <v-table class="table">
          <thead style="background-color: #a4907c; color: #f0e3dd" fixed-header>
            <tr>
              <th class="text-center">Name</th>
              <th class="text-center">Min Quantity</th>
              <th class="text-center">Quantity</th>
              <th class="text-center">Unit</th>
              <th class="text-center">Price Per Unit</th>
              <th class="text-center">MatreiaL Shop Name</th>
              <th class="text-center">Status</th>
              <th class="text-center">Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of materialStore.materials" :key="item.mat_id">
              <td>{{ item.mat_name }}</td>
              <td class="text-center">{{ item.mat_min_quantity }}</td>
              <td class="text-center">{{ item.mat_quantity }}</td>
              <td class="text-center">{{ item.mat_unit }}</td>
              <td class="text-center">฿ {{ item.mat_price_per_unit }}</td>
              <td class="text-center">{{ item.mat_shop_name }}</td>
              <td>
                <v-card
                  height="30px"
                  width="6vw"
                  align="center"
                  :color="statusColor(item.mat_quantity, item.mat_min_quantity)"
                  style="color: aquamarine"
                  class="mx-auto"
                >
                  <v-card-subtitle
                    class="pt-1"
                    style="font-size: 11px; font-weight: bold"
                    >{{
                      statusText(item.mat_quantity, item.mat_min_quantity)
                    }}</v-card-subtitle
                  >
                </v-card>
              </td>
              <td class="text-center">
                <v-btn
                  :icon="mdiPencil"
                  color="#665A48"
                  class="ma-1"
                  variant="tonal"
                  @click="materialStore.editMaterial(item)"
                ></v-btn>
                <v-btn
                  :icon="mdiDelete"
                  color="#B46060"
                  class="ma-1"
                  variant="tonal"
                  @click="
                    (materialStore.deleteDialog = true),
                      (materialStore.checkDialog = item.mat_id!)
                  "
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-pagination
          :length="materialStore.lastPage"
          v-model="materialStore.page"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  max-width: 100vw;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
</style>
