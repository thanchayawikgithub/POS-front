<script lang="ts" setup>
import { useStoreStore } from "@/stores/store";
import { onMounted } from "vue";

onMounted(async () => {
  await storeStore.getStore();
});
const storeStore = useStoreStore();
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4"
        v-for="item in storeStore.stores"
        :key="item.store_id"
        ><v-card height="200px" width="100%">
          <v-card-title>
            No.{{ item.store_id }}({{ item.store_name }})
          </v-card-title>

          <v-card-text> Province.{{ item.store_province }} </v-card-text>
          <v-card-text> District:{{ item.store_district }} </v-card-text>
          <v-card-text>
            Sub_District:{{ item.store_sub_district }}
          </v-card-text>
          <v-card-text> Tel:{{ item.store_tel }} </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
