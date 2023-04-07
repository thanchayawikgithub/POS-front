<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import { ref } from "vue";
import type { VForm } from "vuetify/components";
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
  <v-dialog v-model="customerStore.dialog" persistent width="1024">
    <v-card>
      <v-card-title>
        <span class="text-h5">Customer Register</span>
      </v-card-title>

      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="customerStore.editedCustomer.customer_name"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length >= 1 || 'Length must more than 1',
                  ]"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="Tel*"
                  required
                  v-model="customerStore.editedCustomer.customer_tel"
                  :rules="[
                    (v) => !!v || 'Item is required',
                    (v) => v.length == 10 || 'Length must be equal to 10',
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Point*"
                  required
                  v-model="customerStore.editedCustomer.customer_point"
                  :rules="[
                    (v) => v >= 0 || 'poin must be equal to or greater than 0',
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" variant="text" @click="customerStore.dialog = false">
          Close
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
      </v-card-actions>
    </v-card></v-dialog
  >
</template>
