<script setup lang="ts">
import { mdiCoffee } from "@mdi/js";
import { ref } from "vue";
import type Menu from "@/types/User";
import { useMenuStore } from "@/stores/Menu";
const menuStores = useMenuStore();
const props = withDefaults(
  defineProps<{
    rating: number;
  }>(),
  {
    rating: 1,
  }
);
const emits = defineEmits<{
  (e: "change", rating: number): void;
}>();

const count = ref(props.rating);
function inc() {
  count.value++;
  emits("change", count.value);
}
function dec() {
  count.value--;
  emits("change", count.value);
}
</script>
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2"> </v-col>
        <v-col cols="3" class="text-center"><h5>Name</h5></v-col>
        <v-col cols="5" class="text-center"><h5>Quantity</h5></v-col>
        <v-col cols="0" class="text-center"><h5>Price</h5></v-col>
      </v-row>
      <v-card
        class="pa-5"
        width="110%"
        height="100%"
        v-for="item in menuStores.menu"
        :key="item.id"
      >
        <v-row>
          <v-col cols="2">
            <v-img height="100%" width="100%" :src="item.pic"></v-img>
          </v-col>
          <v-col cols="3">
            <v-card-text> {{ item.name }}</v-card-text>
          </v-col>
          <v-col cols="1" class="text-right"
            ><v-card-actions class="justify-center">
              <v-btn color="error"> - </v-btn>
            </v-card-actions></v-col
          >
          <v-col cols="2" class="text-center">
            <v-card-text>{{ count }}</v-card-text>
          </v-col>
          <v-col cols="1" class="text-left"
            ><v-card-actions class="justify-center">
              <v-btn color="secondary"> + </v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="3" class="text-center"
            ><v-card-text>{{ item.price }}</v-card-text></v-col
          >
        </v-row>
      </v-card>
      <br />
    </v-container>

    <v-card>
      <v-divider></v-divider>
    </v-card>
    <br />
  </div>

  <div></div>
</template>
