<script setup lang="ts">
import { mdiCoffee } from "@mdi/js";
import { ref } from "vue";
import type Menu from "@/types/User";
</script>
<template>
  <div>
    <v-container>
      <v-card class="pa-5" width="600px" height="100">
        <v-row>
          <v-col cols="1">
            <v-img height="50px" width="50px" src="mocca.jpg"></v-img>
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
          <v-col cols="0" align-self="auto"
            ><v-card-actions class="justify-left">
              <v-btn color="secondary"> + </v-btn>
            </v-card-actions>
          </v-col>
          <v-col cols="0"><v-card-text>60</v-card-text></v-col>
        </v-row>
      </v-card>
      <br />
      <v-card class="pa-5" width="600px" height="100">
        <v-row>
          <v-col cols="1">
            <v-img height="50px" width="50px" src="americano.jpg"></v-img>
          </v-col>
          <v-col cols="3">
            <v-card-text> Amaricano</v-card-text>
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
    <v-container>
      <v-row>
        <v-col> </v-col>
      </v-row>
    </v-container>
    <v-card>
      <v-divider></v-divider>
    </v-card>
  </div>

  <div></div>
</template>
