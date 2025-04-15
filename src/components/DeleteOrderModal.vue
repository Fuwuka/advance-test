<script setup lang="ts">
import { useModalStore } from '@/stores/modal';
import { useOrdersPageStore } from '@/stores/orders-page';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore();
const { id, props } = storeToRefs(modalStore);
const { close } = modalStore;

const ordersPageStore = useOrdersPageStore();
const { isSubmitting } = storeToRefs(ordersPageStore);

async function deleteOrder(): Promise<void> {
  await ordersPageStore.deleteOrder(props.value.id);

  close();
}
</script>

<template>
  <div
    v-if="id === 'deleteOrder'"
    class="modal"
    @click.self="close"
  >
    <div class="modal-container">
      <div>Вы действительно хотите удалить заказ?</div>
      <div class="modal-actions">
        <button @click="deleteOrder" :disabled="isSubmitting" class="button button-small">Ок</button>
        <button @click="close" :disabled="isSubmitting" class="button button-small">Отмена</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.1);
}
.modal-container {
  background: var(--color-background);
  padding: 63px 44px 42px;
}
.modal-actions {
  margin-top: 68px;
  display: flex;
  justify-content: center;
}
.button:first-of-type {
  margin-right: 55px;
}
</style>
