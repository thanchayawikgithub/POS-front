<script setup lang="ts">
import { mdiCoffee } from "@mdi/js";
</script>
<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left"></th>
          <th class="text-left"></th>
          <th class="text-right"></th>
          <th class="text-center"></th>
          <th class="text-left"></th>
          <th class="text-left">Order</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <v-img height="50px" width="50px" src="mocca.jpg"></v-img>
          </td>
          <td>Mocca</td>
          <td>
            <v-card-actions class="justify-center">
              <v-btn color="error"> - </v-btn>
            </v-card-actions>
          </td>
          <td class="text-center">1</td>
          <td>
            <v-card-actions class="justify-left">
              <v-btn color="secondary"> + </v-btn>
            </v-card-actions>
          </td>

          <td class="text-center">60</td>
        </tr>
        <tr>
          <td>
            <v-img height="50px" width="50px" src="americano.jpg"></v-img>
          </td>
          <td>Amaricano</td>
          <td>
            <v-card-actions class="justify-center">
              <v-btn color="error"> - </v-btn>
            </v-card-actions>
          </td>
          <td class="text-center">1</td>
          <td>
            <v-card-actions class="justify-left">
              <v-btn color="secondary"> + </v-btn>
            </v-card-actions>
          </td>

          <td class="text-center">70</td>
        </tr>
      </tbody>
    </v-table>
  </div>

  <div></div>
</template>
