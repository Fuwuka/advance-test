<script setup lang="ts">
import { useModalStore } from '@/stores/modal';

function openDeleteOrderModal(): void {
  const modalStore = useModalStore();

  modalStore.open('deleteOrder', { id: 1 });
}
</script>

<template>
  <tr class="table-row">
    <td class="table-cell table-cell-number">1</td>
    <td class="table-cell table-cell-name">Иван Иванов</td>
    <td class="table-cell table-cell-address">Знаменка ул., 19, Москва</td>
    <td class="table-cell table-cell-date">11 ноября 2022</td>
    <td class="table-cell table-cell-status">Выполнено</td>
    <td class="table-cell table-cell-comment">привезти не позднее 18:00</td>

    <div class="table-actions">
      <a class="table-action">
        <img alt="update" class="icon" src="@/assets/icon-update.svg" width="18" height="17" />
      </a>
      <a @click="openDeleteOrderModal" class="table-action">
        <img alt="delete" class="icon" src="@/assets/icon-delete.svg" width="18" height="17" />
      </a>
    </div>
  </tr>
</template>

<style scoped>
.table-row {
  position: relative;
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
