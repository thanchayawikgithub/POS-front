<script lang="ts" setup>
import { useMaterialStore } from "@/stores/material";

const materialStore = useMaterialStore();
</script>
<template>
  <v-row justify="center">
    <v-dialog v-model="materialStore.deleteDialog" persistent width="600">
      <v-card>
        <v-card-title class="text-h5"> Delete data. </v-card-title>
        <v-card-text> Are you sure you want to delete!!!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            variant="text"
            @click="materialStore.deleteDialog = false"
          >
            cancel
          </v-btn>
          <v-btn
            color="green-darken-1"
            variant="text"
            @click="
              materialStore.deleteMaterial(materialStore.checkDialog),
                (materialStore.deleteDialog = false)
            "
            >ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
