<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";
import { onMounted } from "vue";

import {
  mdiDelete,
  mdiPencil,
  mdiPlus,
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
  <v-container class="pl-0" style="background-color: #e7e7e7"
    ><v-row class="pl-16">
      <v-col cols="6" offset="8">
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
    <v-row cols="12">
      <v-col>
        <v-table>
          <thead style="background-color: #a4907c; color: #f0e3dd" fixed-header>
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center">Name</th>
              <th class="text-center">Min Quantity</th>
              <th class="text-center">Quantity</th>
              <th class="text-center">Unit</th>
              <th class="text-center">Price Per Unit</th>
              <th class="text-center">Status</th>
              <th class="text-center">Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of materialStore.materials" :key="item.mat_id">
              <td class="text-center">{{ item.mat_id }}</td>
              <td>{{ item.mat_name }}</td>
              <td class="text-center">{{ item.mat_min_quantity }}</td>
              <td class="text-center">{{ item.mat_quantity }}</td>
              <td class="text-center">{{ item.mat_unit }}</td>
              <td class="text-center">฿ {{ item.mat_price_per_unit }}</td>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
