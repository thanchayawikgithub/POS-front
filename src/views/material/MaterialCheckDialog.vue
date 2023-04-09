<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";
import { mdiDeleteAlertOutline } from "@mdi/js";
const materialStore = useMaterialStore();
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="materialStore.deleteDialog" persistent width="600">
      <v-sheet
        elevation="15"
        max-width="600"
        rounded="lg"
        width="100%"
        class="pa-4 mx-auto"
      >
        <v-card-title class="text-center" style="font-size: 23px">
          Delete data
        </v-card-title>
        <v-divider class="mb-0"></v-divider>
        <v-card-text class="text-center pb-0">
          <v-icon size="60px" color="red">{{
            mdiDeleteAlertOutline
          }}</v-icon></v-card-text
        >
        <v-card-text class="text-h5 text-center pt-0">
          Are you sure you want to delete!!!</v-card-text
        >
        <v-divider class="mb-0"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            variant="text"
            @click="materialStore.deleteDialog = false"
          >
            No
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="
              materialStore.deleteMaterial(materialStore.checkDialog),
                (materialStore.deleteDialog = false)
            "
            >Yes
          </v-btn>
        </v-card-actions>
      </v-sheet>
    </v-dialog>
  </v-row>
</template>
