<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import { onMounted } from "vue";
import { mdiDelete, mdiPencil } from "@mdi/js";
onMounted(async () => {
  await customerStore.getCustomer();
});
const customerStore = useCustomerStore();
const addNew = () => {
  customerStore.dialog = true;
};
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4"
        ><v-card>
          <v-btn
            height="250px"
            width="100%"
            class="text-h3"
            style="background-color: #af9070"
            @click="addNew"
            >+</v-btn
          >
        </v-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
        v-for="item in customerStore.customers"
        :key="item.customer_id"
        ><v-card height="250px" width="100%">
          <v-card-title> ID: {{ item.customer_id }} </v-card-title>
          <v-card-title> Name: {{ item.customer_name }}</v-card-title>
          <v-card-text> Tel.{{ item.customer_tel }} </v-card-text>
          <v-card-text> Point:{{ item.customer_point }} </v-card-text>

          <v-card-actions class="justify-center">
            <v-btn
              :prepend-icon="mdiDelete"
              color="error"
              @click="
                (customerStore.deleteDialog = true),
                  (customerStore.checkDialog = item.customer_id!)
              "
              >Delete</v-btn
            >

            <v-btn
              :prepend-icon="mdiPencil"
              color="secondary"
              @click="customerStore.editCustomer(item)"
            >
              Edit
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
