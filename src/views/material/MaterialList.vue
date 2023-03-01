<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";
import { onMounted } from "vue";
import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";

const materialStore = useMaterialStore();

onMounted(async () => {
  await materialStore.getMaterials();
});
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="5" offset="11">
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
              <th>ID</th>
              <th>Name</th>
              <th>Min Quantity</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Price Per Unit</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of materialStore.materials" :key="item.mat_id">
              <td>{{ item.mat_id }}</td>
              <td>{{ item.mat_name }}</td>
              <td>{{ item.mat_min_quantity }}</td>
              <td>{{ item.mat_quantity }}</td>
              <td>{{ item.mat_unit }}</td>
              <td>{{ item.mat_price_per_unit }}</td>
              <td>
                <!-- <v-btn
                  :icon="mdiPencil"
                  color="secondary"
                  class="ma-1"
                  @click="editUser(item)"
                ></v-btn>
                <v-btn
                  :icon="mdiDelete"
                  color="error"
                  class="ma-1"
                  @click="deleteUser(item.id)"
                ></v-btn> -->
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
