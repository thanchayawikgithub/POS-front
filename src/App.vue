<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import FullLayout from "@/layouts/FullLayout.vue";

import MainView from "./views/MainView.vue";
import LoginView from "./views/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import LoadingDialog from "./components/LoadingDialog.vue";
import MessageDialog from "./components/MessageDialog.vue";
import { onMounted } from "vue";
import { useLoginStore } from "@/stores/login";
import MessageBox from "./components/MessageBox.vue";
const authStore = useAuthStore();
onMounted(() => {});
</script>

<template>
  <component
    :is="$route.meta.layout === 'MainLayout' ? MainLayout : FullLayout"
  ></component>
  <MessageBox></MessageBox>
  <LoadingDialog></LoadingDialog>
  <MessageDialog></MessageDialog>
</template>
<style scoped></style>
