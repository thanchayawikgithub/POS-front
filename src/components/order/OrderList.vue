<script setup lang="ts">
import { mdiCoffee } from "@mdi/js";
</script>
<template>
  <div>
    <v-container>
      <v-row>
        <v-table>
          <thead>
            <th Class="text-left">
              <v-icon :class="mdiCoffee"></v-icon> Order List
            </th>
            <th></th>
          </thead>
          <tbody>
            <td></td>
            <td></td>
          </tbody>
        </v-table>
      </v-row>
      <v-row>
        <v-col> Member: </v-col>
        <v-col> </v-col>
      </v-row>
      <v-row>
        <v-col> Telephone Number: </v-col>
        <v-col> </v-col>
      </v-row>
      <v-row>
        <v-col> Number Of Points: </v-col>
        <v-col> </v-col>
      </v-row>
    </v-container>
  </div>
  <div></div>
</template>
