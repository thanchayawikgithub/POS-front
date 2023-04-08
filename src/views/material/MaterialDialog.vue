<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";
import { ref } from "vue";
import type { VForm } from "vuetify/components";
const form = ref<VForm | null>(null);
const materialStore = useMaterialStore();
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await materialStore.saveMaterial();
  }
}
</script>
<template>
  <v-dialog v-model="materialStore.dialog" persistent width="1024">
    <v-sheet
      elevation="15"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 mx-auto"
    >
      <v-card-title class="text-center">
        <span class="text-h5">Material Profile</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="materialStore.editedMaterial.mat_name"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 3 || 'Length must more than 3',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Min Quantity*"
                  required
                  v-model="materialStore.editedMaterial.mat_min_quantity"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Quantity*"
                  required
                  v-model="materialStore.editedMaterial.mat_quantity"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Unit*"
                  required
                  v-model="materialStore.editedMaterial.mat_unit"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Price Per Unit*"
                  required
                  v-model="materialStore.editedMaterial.mat_price_per_unit"
                  :rules="[(v) => !!v || 'Item is required']"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-divider class="mb-0"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="materialStore.dialog = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-sheet>
  </v-dialog>
</template>
