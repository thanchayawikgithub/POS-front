<script setup lang="ts"></script>
<template>
  <div class="tab">
    <v-container>
      <v-row class="text-center">
        <v-col
          ><v-btn width="100%" rounded color="#B86824" class="font-btn">
            Register Member
          </v-btn>
        </v-col>
        <v-col>
          <v-btn width="100%" rounded color="#EA9A56" class="font-btn">
            Search
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-table>
      <tbody>
        <tr>
          <td>Member :</td>
          <td class="">12345678</td>
        </tr>
        <tr>
          <td>Price :</td>
          <td>130</td>
        </tr>
        <tr>
          <td>Discount :</td>
          <td>5</td>
        </tr>
        <tr>
          <td>Total :</td>
          <td>125</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div></div>
</template>
<style scoped>
.tab {
  margin-top: 90px;
}
.font-btn {
  font-weight: bold;
}
</style>
