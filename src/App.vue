<script setup lang="ts">
import MainView from "./views/MainView.vue";
import LoginView from "./views/LoginView.vue";

import { onMounted } from "vue";
import { useLoginStore } from "@/stores/login";
import MessageBox from "./components/MessageBox.vue";
const loginStore = useLoginStore();
onMounted(() => {
  loginStore.loadData();
});
</script>

<template style="background-color: #dac7b4">
  <LoginView v-if="!loginStore.isLogin" />
  <MainView
    v-if="loginStore.isLogin"
    @logout="loginStore.logout"
    :login-name="loginStore.loginName"
  />
  <MessageBox></MessageBox>
</template>

<style scoped></style>
