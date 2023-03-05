<script setup lang="ts">
import { useMaterialStore } from "../../stores/material";

import { onMounted } from "vue";
const materialStore = useMaterialStore();

onMounted(async () => {
  await materialStore.getMaterials();
});
const addNew = () => {
  materialStore.dialog = true;
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4"
        ><v-card>
          <v-btn
            height="200px"
            width="100%"
            class="text-h3"
            style="background-color: rosybrown"
            @click="addNew"
            >+</v-btn
          >
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="4"
        v-for="item in materialStore.materials"
        :key="item.mat_id"
        ><v-card height="200px" width="100%">
          <v-card-title>
            NO.{{ item.mat_id }}({{ item.mat_name }})</v-card-title
          >
          <v-card-text>
            (Min:{{ item.mat_min_quantity }})( Qty:{{ item.mat_quantity }}) (
            Unit:{{ item.mat_unit }})
          </v-card-text>
          <v-card-text
            >(Price Per Unit:{{ item.mat_price_per_unit }}$)</v-card-text
          >
          <v-card-actions class="justify-center">
            <v-btn
              color="error"
              @click="
                (materialStore.deleteDialog = true),
                  (materialStore.checkDialog = item.mat_id!)
              "
              >Delete</v-btn
            >

            <v-btn color="secondary" @click="materialStore.editMaterial(item)">
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
