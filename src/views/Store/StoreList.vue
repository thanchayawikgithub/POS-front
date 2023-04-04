<script lang="ts" setup>
import { useStoreStore } from "@/stores/Store";
import { onMounted } from "vue";
import { mdiMapMarker, mdiPhone, mdiCalendarRange } from "@mdi/js";
const storeStore = useStoreStore();

onMounted(async () => {
  await storeStore.getStore();
});
</script>

<template>
  <v-container style="background-color: #e7e7e7" fluid class="h-screen">
    <v-row>
      <v-col v-for="item of storeStore.stores" :key="item.store_id">
        <v-card-title align="center" style="font-size: 25px; font-weight: bold"
          >Our Cafe Locations</v-card-title
        >
        <v-card width="60vw" class="mx-auto">
          <v-container>
            <v-row>
              <v-col cols="7">
                <v-card-text
                  style="font-size: 21px; font-weight: bold"
                  class="pl-6"
                  >{{ item.store_name }}</v-card-text
                >
                <v-card-subtitle style="font-size: medium">
                  <v-icon :icon="mdiMapMarker" class="pb-1"></v-icon> Sub.{{
                    item.store_sub_district
                  }}
                  , {{ item.store_district }} District ,
                  {{ item.store_province }}
                </v-card-subtitle>
                <v-card-text style="font-size: medium" class="pl-4 pb-0">
                  <v-icon :icon="mdiCalendarRange" class="pb-1"></v-icon>open
                  every day , 09:00 – 19:00
                </v-card-text>
                <v-card-text style="font-size: medium"
                  ><v-icon :icon="mdiPhone" class="pb-1"></v-icon>
                  {{ item.store_tel }}</v-card-text
                >
              </v-col>
              <v-col cols="5">
                <v-img src="./Cafe.jpg" style="width: 40vw"></v-img
              ></v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>
