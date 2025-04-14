<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderNav from './components/HeaderNav.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/auth';
import DeleteOrderModal from './components/DeleteOrderModal.vue';

const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);
</script>

<template>
  <HeaderNav v-if="isAuthorized" />
  <RouterView />
  <DeleteOrderModal />
</template>

<style scoped></style>
