<script setup lang="ts">
// import { mdiCoffee } from "@mdi/js";
import { ref } from "vue";
// import type Menu from "@/types/User";
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
    <v-container fluid>
      <v-card
        style="
          height: 50vh;
          width: 29vw;
          overflow-y: auto;
          background-color: #af9070;
        "
        class="pl-0"
        flat
      >
        <v-row>
          <v-col cols="1"> </v-col>
          <v-col cols="4" class="text-center pl-4">
            <h5>Name</h5>
          </v-col>
          <v-col cols="3" class="text-center pl-2">
            <h5>Quantity</h5>
          </v-col>
          <v-col cols="3" class="text-center pl-5">
            <h5>Price</h5>
          </v-col>
        </v-row>
        <v-card
          class="pa-3 mb-2 mt-3"
          v-for="item in menuStores.menu"
          :key="item.id"
          color="#dac7b4"
          style="
            border-radius: 5px;
            border: 2px solid;
            width: 27vw;
            height: 11vh;
          "
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
                <v-btn
                  color="#CC0000"
                  @click="dec()"
                  style="font-weight: bolder"
                >
                  -
                </v-btn>
              </v-card-actions></v-col
            >
            <v-col cols="2" class="text-center">
              <v-card-text>{{ count }}</v-card-text>
            </v-col>
            <v-col cols="1" class="text-left"
              ><v-card-actions class="justify-center">
                <v-btn
                  color="#009900"
                  @click="inc()"
                  style="font-weight: bolder"
                >
                  +
                </v-btn>
              </v-card-actions>
            </v-col>
            <v-col cols="3" class="text-center"
              ><v-card-text>{{ item.price * count }}</v-card-text></v-col
            >
          </v-row>
        </v-card>
      </v-card>
    </v-container>

    <v-card>
      <v-divider style="background-color: black"></v-divider>
    </v-card>
    <br />
  </div>

  <div></div>
</template>
