<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

function logout(): void {
  authStore.logout();
}

function openNewOrderModal(): void {
  modalStore.open('newOrder');
}
</script>

<template>
  <header class="header">
    <div class="header-wrapper">
      <nav>
        <RouterLink to="/" class="header-link">Все заказы</RouterLink>
        <a @click="openNewOrderModal" class="link header-link">Добавить заказ</a>
      </nav>
      <div>
        <div class="header-name">{{ user?.name }}</div>
        <button @click="logout" class="button button-small header-button">Выйти</button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--color-background-blue);
  height: var(--header-height);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.header-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px 12px 22px;
}
.header-link {
  color: var(--color-white);
  margin-right: 38px;
}
.header-name {
  display: inline-block;
  margin-right: 28px;
}
.header-button {
  display: inline-block;
  background: var(--color-background-dark);
}
</style>
