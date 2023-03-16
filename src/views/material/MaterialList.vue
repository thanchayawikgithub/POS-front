<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";
import { onMounted } from "vue";
import MaterialDialog from "./MaterialDialog.vue";
import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";

const materialStore = useMaterialStore();

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
  <MaterialDialog />
  <v-container>
    <v-row>
      <v-col cols="6" offset="8">
        <v-btn
          class="mr-4"
          color="primary"
          :prepend-icon="mdiPlus"
          @click="materialStore.dialog = true"
          >Check Material</v-btn
        >
        <v-btn
          color="primary"
          :prepend-icon="mdiPlus"
          @click="materialStore.dialog = true"
          >Add New</v-btn
        >
      </v-col>
    </v-row>
    <v-row cols="12">
      <v-col>
        <v-table>
          <thead>
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
                  height="4vh"
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
                  color="secondary"
                  class="ma-1"
                  @click="materialStore.editMaterial(item)"
                ></v-btn>
                <v-btn
                  :icon="mdiDelete"
                  color="error"
                  class="ma-1"
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
