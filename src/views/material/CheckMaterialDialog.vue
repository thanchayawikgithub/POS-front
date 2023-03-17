<script lang="ts" setup>
import { useCheckMaterialDetailStore } from "@/stores/checkMaterialDetail";
import { ref } from "vue";
import { mdiTrashCanOutline } from "@mdi/js";
import type { VForm } from "vuetify/components";
const form = ref<VForm | null>(null);
const CheckMaterialDetailStore = useCheckMaterialDetailStore();
async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    // await CheckMaterialDetailStore.saveMaterial();
  }
}
</script>
<template>
  <v-dialog v-model="CheckMaterialDetailStore.dialog" persistent width="1024">
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
                  v-model="select"
                  :items="items"
                  label="I use chips"
                  multiple
                  chips
                ></v-combobox>
              </v-col>
              <v-col>
                <v-btn color="primary">Add New</v-btn>
              </v-col>
            </v-row>
            <v-table
              v-for="item in CheckMaterialDetailStore.orderList"
              :key="item.mat_id"
            >
              <v-row>
                <v-col cols="6">
                  <v-list lines="one">
                    <v-list-item
                      v-for="item in items"
                      :key="item.title"
                      :title="item.title"
                      subtitle="..."
                    ></v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    label="Quantity*"
                    required
                    v-model="CheckMaterialDetailStore"
                    :rules="[(v) => !!v || 'Item is required']"
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    label="Date"
                    model-value="mm/dd/yyyy"
                    type="Date"
                    suffix="Date"
                  ></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-btn
                    :icon="mdiTrashCanOutline"
                    style="font-weight: bolder"
                    variant="plain"
                  >
                  </v-btn>
                </v-col>
              </v-row>
            </v-table>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="CheckMaterialDetailStore.dialog = false"
        >
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
