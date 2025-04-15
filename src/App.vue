<script setup lang="ts">
import { RouterView } from 'vue-router';
import HeaderNav from './components/HeaderNav.vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from './stores/auth';
import DeleteOrderModal from './components/DeleteOrderModal.vue';
import NewOrderModal from './components/NewOrderModal.vue';

const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);
</script>

<template>
  <HeaderNav v-if="isAuthorized" />
  <RouterView />
  <DeleteOrderModal />
  <NewOrderModal />
</template>

<style scoped></style>
