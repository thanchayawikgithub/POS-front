<script lang="ts" setup>
import { useStoreStore } from "@/stores/Store";
import { onMounted } from "vue";

const storeStore = useStoreStore();

onMounted(async () => {
  await storeStore.getStore();
});
</script>

<template>
  <v-container>
    <v-row cols="12">
      <v-col>
        <v-table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Province</th>
              <th>District</th>
              <th>Sub_district</th>
              <th>tel</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item of storeStore.stores" :key="item.store_id">
              <td>{{ item.store_id }}</td>
              <td>{{ item.store_name }}</td>
              <td>{{ item.store_province }}</td>
              <td>{{ item.store_district }}</td>
              <td>{{ item.store_sub_district }}</td>
              <td>{{ item.store_tel }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
