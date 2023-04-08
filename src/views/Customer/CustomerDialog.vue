<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import { ref } from "vue";
import type { VForm } from "vuetify/components";
import { mdiPhone, mdiAccountBox } from "@mdi/js";
const form = ref<VForm | null>(null);

const customerStore = useCustomerStore();

async function save() {
  const { valid } = await form.value!.validate();
  if (valid) {
    await customerStore.saveCustomer();
  }
}
</script>

<template>
  <v-dialog v-model="customerStore.dialog" persistent width="600">
    <v-sheet
      elevation="15"
      max-width="600"
      rounded="lg"
      width="100%"
      class="pa-4 mx-auto"
    >
      <v-card-title style="text-align: center">
        <span class="text-h5">Customer Register</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  class="mt-2"
                  label="Name*"
                  required
                  :prepend-inner-icon="mdiAccountBox"
                  v-model="customerStore.editedCustomer.customer_name"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 1 || 'Length must more than 1',
                  ]"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  class="pt-0"
                  required
                  :prepend-inner-icon="mdiPhone"
                  label="Phone Number*"
                  v-model="customerStore.editedCustomer.customer_tel"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length == 10 || 'Length must be equal to 10',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12"> </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-divider class="mb-0"></v-divider>
      <v-card-actions class="mb-0">
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="customerStore.dialog = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-sheet></v-dialog
  >
</template>
