<script setup lang="ts">
import MainView from "./views/MainView.vue";
import LoginView from "./views/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import LoadingDialog from "./components/LoadingDialog.vue";
import MessageDialog from "./components/MessageDialog.vue";
import { onMounted } from "vue";
import { useLoginStore } from "@/stores/login";
import MessageBox from "./components/MessageBox.vue";
const loginStore = useAuthStore();
onMounted(() => {
  loginStore.loadData();
});
</script>

<template style="background-color: #dac7b4">
  <LoginView v-if="!loginStore.islogin" />
  <MainView
    v-if="loginStore.islogin"
    @logout="loginStore.logout"
    :login-name="loginStore.authName"
  />
  <MessageBox></MessageBox>
  <LoadingDialog></LoadingDialog>
  <MessageDialog></MessageDialog>
</template>
<style scoped></style>
