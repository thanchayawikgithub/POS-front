<script lang="ts" setup>
import { ref } from "vue";
import { mdiTrashCanOutline } from "@mdi/js";
import type { VForm } from "vuetify/components";
import { useCheckMaterialStore } from "@/stores/checkMaterial";
import { useMaterialStore } from "@/stores/material";

const form = ref<VForm | null>(null);
const checkMaterialStore = useCheckMaterialStore();
const materialStore = useMaterialStore();
</script>
<template>
  <v-dialog v-model="checkMaterialStore.dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Check Material</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container class="overflow-y-auto">
            <v-table style="height: 50vh">
              <v-row
                v-for="item of materialStore.materials"
                :key="item.mat_id"
                style="width: 61vw"
              >
                <v-col cols="6"
                  ><v-text-field readonly>{{
                    item.mat_name
                  }}</v-text-field></v-col
                >
                <v-col cols="2">
                  <v-text-field
                    label="Quantity*"
                    required
                    v-model="item.mat_remain"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="item.mat_exp"
                    label="Date*"
                    type="Date"
                  ></v-text-field>
                </v-col>
                <v-col cols="0">
                  <v-btn
                    :icon="mdiTrashCanOutline"
                    class="mt-3"
                    style="font-weight: bolder"
                    variant="plain"
                    @click="checkMaterialStore.delList(item)"
                  >
                  </v-btn>
                </v-col>
              </v-row>
            </v-table>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red-darken-1"
          variant="text"
          @click="
            (checkMaterialStore.dialog = false), checkMaterialStore.clearList()
          "
        >
          Close
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="checkMaterialStore.openCheckMaterial()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
