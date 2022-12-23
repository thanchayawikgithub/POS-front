<script setup lang="ts">
import MainView from "./views/MainView.vue";
import LoginView from "./views/LoginView.vue";

import { onMounted } from "vue";
import { useLoginStore } from "@/stores/login";
const loginStore = useLoginStore();
onMounted(() => {
  loginStore.loadData();
});
</script>

<template>
  <LoginView v-if="!loginStore.isLogin" />
  <MainView
    v-if="loginStore.isLogin"
    @logout="loginStore.logout"
    :login-name="loginStore.loginName"
  />
</template>

<style scoped></style>
