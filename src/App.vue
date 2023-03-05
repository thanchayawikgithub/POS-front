<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import FullLayout from "@/layouts/FullLayout.vue";

import LoadingDialog from "./components/LoadingDialog.vue";
import MessageDialog from "./components/MessageDialog.vue";
import { onMounted } from "vue";
import MessageBox from "./components/MessageBox.vue";

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
