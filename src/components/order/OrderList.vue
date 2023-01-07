<script setup lang="ts">
import { mdiCoffee } from "@mdi/js";
import { ref } from "vue";
import type Menu from "@/types/User";
import { useMenuStore } from "@/stores/Menu";
const menuStores = useMenuStore();
</script>
<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2"> </v-col>
        <v-col cols="3" class="text-center"><h5>name</h5></v-col>
        <v-col cols="5" class="text-center"><h5>quantity</h5></v-col>
        <v-col cols="0" class="text-center"><h5>price</h5></v-col>
      </v-row>
      <v-card class="pa-5" width="110%" height="100%">
        <v-row>
          <v-col cols="2">
            <v-img height="100%" width="100%" src="mocca.jpg"></v-img>
          </v-col>
          <v-col cols="3">
            <v-card-text> Mocca</v-card-text>
          </v-col>
          <v-col cols="1"
            ><v-card-actions class="justify-center">
              <v-btn color="error"> - </v-btn>
            </v-card-actions></v-col
          >
          <v-col cols="1">
            <v-card-text>1</v-card-text>
          </v-col>
          <v-col cols="0"
            ><v-card-actions class="justify-left">
              <v-btn color="secondary"> + </v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="0"><v-card-text>60</v-card-text></v-col>
        </v-row>
      </v-card>
      <br />
      <v-card class="pa-5" width="110%" height="100%">
        <v-row>
          <v-col cols="2">
            <v-img height="100%" width="100%" src="americano.jpg"></v-img>
          </v-col>
          <v-col cols="3">
            <v-card-text> Americano</v-card-text>
          </v-col>
          <v-col cols="1"
            ><v-card-actions class="justify-center">
              <v-btn color="error"> - </v-btn>
            </v-card-actions></v-col
          >
          <v-col cols="1">
            <v-card-text>1</v-card-text>
          </v-col>
          <v-col cols="0" align-self="auto"
            ><v-card-actions class="justify-left">
              <v-btn color="secondary"> + </v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="0"><v-card-text>70</v-card-text></v-col>
        </v-row>
      </v-card>
    </v-container>
    <br />
    <v-card>
      <v-divider></v-divider>
    </v-card>
    <br />
  </div>

  <div></div>
</template>
