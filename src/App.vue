<script setup lang="ts">
import MainView from "./views/MainView.vue";
import LoginView from "./views/LoginView.vue";

import { computed, onMounted, ref } from "vue";
const loginName = ref("");
const isLogin = computed(() => {
  return loginName.value !== "";
});
const login = (userName: string): void => {
  loginName.value = userName;
  localStorage.setItem("loginName", userName);
};
const logout = () => {
  loginName.value = "";
  localStorage.removeItem("loginName");
};
const loadData = () => {
  loginName.value = localStorage.getItem("loginName") || "";
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <LoginView v-if="!isLogin" @login="login" />
  <MainView v-if="isLogin" @logout="logout" />
</template>

<style scoped></style>
