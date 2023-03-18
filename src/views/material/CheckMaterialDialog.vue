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
          <v-container>
            <v-row>
              <v-col cols="10">
                <v-combobox
                  v-model="checkMaterialStore.material"
                  :items="materialStore.materials"
                  item-title="mat_name"
                  item-value="mat_id"
                  placeholder="Select or Search Material"
                ></v-combobox>
              </v-col>
              <v-col>
                <v-btn color="primary" @click="checkMaterialStore.addList()"
                  >Add New</v-btn
                >
              </v-col>
            </v-row>
            <v-table>
              <v-row
                v-for="item of checkMaterialStore.checkMaterialList"
                :key="item.mat_id"
              >
                <v-col cols="6">{{ item.mat_name }}</v-col>
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
                    label="Date"
                    type="Date"
                  ></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-btn
                    :icon="mdiTrashCanOutline"
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
          color="blue-darken-1"
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
