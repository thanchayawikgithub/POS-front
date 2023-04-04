<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import { onMounted } from "vue";
import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";
const date = new Date();
const customerStore = useCustomerStore();

onMounted(async () => {
  await customerStore.getCustomer();
});
</script>

<template>
  <v-container style="background-color: #e7e7e7">
    <v-row justify="end">
      <v-col cols="2" offset="12">
        <v-btn
          color="#f6ad8d"
          style="font-weight: bold"
          :prepend-icon="mdiPlus"
          @click="customerStore.dialog = true"
          >Add Customer</v-btn
        >
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Tel</th>
              <th>Point</th>
              <th>Start Date</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of customerStore.customers" :key="item.customer_id">
              <td>{{ item.customer_id }}</td>
              <td>{{ item.customer_name }}</td>
              <td>{{ item.customer_tel }}</td>
              <td>{{ item.customer_point }}</td>
              <td>
                {{ JSON.stringify(item.createdDate).substring(1, 11) }}
                {{ JSON.stringify(item.createdDate).substring(12, 17) }}
              </td>
              <td>
                <v-btn
                  :icon="mdiPencil"
                  color="secondary"
                  class="ma-1"
                  @click="customerStore.editCustomer(item)"
                ></v-btn>
                <v-btn
                  :icon="mdiDelete"
                  color="error"
                  class="ma-1"
                  @click="
                    (customerStore.deleteDialog = true),
                      (customerStore.checkDialog = item.customer_id!)
                  "
                ></v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
td {
  text-align: center;
}
</style>
