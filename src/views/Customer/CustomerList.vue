<script lang="ts" setup>
import { useCustomerStore } from "@/stores/customer";
import { onMounted } from "vue";
import {
  mdiDelete,
  mdiPencil,
  mdiAccountMultiplePlus,
  mdiMagnify,
} from "@mdi/js";
const customerStore = useCustomerStore();

onMounted(async () => {
  await customerStore.getCustomer();
});
</script>

<template>
  <v-container style="background-color: #e7e7e7">
    <v-row justify="end">
      <v-col cols="2" offset="12">
        <v-text-field
          v-model="customerStore.keyword"
          density="comfortable"
          variant="outlined"
          label="Search"
          :append-inner-icon="mdiMagnify"
          clearable
          class="pt-3"
        ></v-text-field>
        <v-btn
          color="#8D7B68"
          style="font-weight: bold; color: #f0e3dd"
          :prepend-icon="mdiAccountMultiplePlus"
          @click="customerStore.dialog = true"
          >Add Customer</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col>
        <v-table class="table">
          <thead style="background-color: #a4907c; color: #f0e3dd" fixed-header>
            <tr>
              <th>Name</th>
              <th>Tel</th>
              <th>Point</th>
              <th>Start Date</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of customerStore.customers" :key="item.customer_id">
              <td>{{ item.customer_name }}</td>
              <td>{{ item.customer_tel }}</td>
              <td>{{ item.customer_point }}</td>
              <td>
                {{ JSON.stringify(item.createdDate).substring(11, 9) }}/{{
                  JSON.stringify(item.createdDate).substring(8, 6)
                }}/{{ JSON.stringify(item.createdDate).substring(1, 5) }}
                {{ JSON.stringify(item.createdDate).substring(12, 17) }}
              </td>
              <td>
                <v-btn
                  :icon="mdiPencil"
                  color="#665A48"
                  class="ma-1"
                  variant="tonal"
                  @click="customerStore.editCustomer(item)"
                ></v-btn>
                <v-btn
                  :icon="mdiDelete"
                  color="#B46060"
                  class="ma-1"
                  variant="tonal"
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
    <v-pagination
      :length="customerStore.lastPage"
      v-model="customerStore.page"
    ></v-pagination>
  </v-container>
</template>
<style scoped>
td {
  text-align: center;
}

.table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  max-width: 100vw;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
</style>
