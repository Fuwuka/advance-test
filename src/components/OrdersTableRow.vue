<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';
import { useOrdersPageStore } from '@/stores/orders-page';
import type { Order } from '@/types/order';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  order: Order;
}>();

const authStore = useAuthStore();
const { isAdmin } = storeToRefs(authStore);

const isDone = props.order.status === 'Выполнен';

function openDeleteOrderModal(): void {
  const modalStore = useModalStore();

  modalStore.open('deleteOrder', { id: props.order.id });
}

function refreshOrder(): void {
  const ordersPageStore = useOrdersPageStore();

  ordersPageStore.refreshOrder(props.order.id);
}
</script>

<template>
  <tr :class="{ 'table-row-done': isDone }" class="table-row">
    <td class="table-cell table-cell-number">{{ order.id }}</td>
    <td class="table-cell table-cell-name">{{ order.name }}</td>
    <td class="table-cell table-cell-address">{{ order.address }}</td>
    <td class="table-cell table-cell-date">{{ order.date }}</td>
    <td class="table-cell table-cell-status">{{ order.status }}</td>
    <td class="table-cell table-cell-comment">{{ order.comment }}</td>

    <div class="table-actions">
      <a v-if="!isDone" @click="refreshOrder" class="table-action">
        <img alt="update" class="icon" src="@/assets/icon-update.svg" width="18" height="17" />
      </a>
      <a v-if="isAdmin" @click="openDeleteOrderModal" class="table-action">
        <img alt="delete" class="icon" src="@/assets/icon-delete.svg" width="18" height="17" />
      </a>
    </div>
  </tr>
</template>

<style scoped>
.table-row {
  position: relative;
}
.table-row-done {
  color: rgba(0, 0, 0, 0.4);
}
.table-actions {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: calc(100% + 7px);
  display: flex;
}
.table-action {
  margin-right: 6px;
  line-height: 0;
}
</style>
