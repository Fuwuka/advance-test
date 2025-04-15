<script setup lang="ts">
import { useOrdersPageStore } from '@/stores/orders-page';
import type { OrdersSortBy } from '@/types/orders-sort-by';

function sortOrders(sortBy: OrdersSortBy): void {
  const ordersPageStore = useOrdersPageStore();

  ordersPageStore.sortOrders(sortBy);
}
</script>

<template>
  <thead>
    <tr>
      <th class="table-cell table-cell-number">№</th>
      <th class="table-cell table-cell-name">Имя клиента</th>
      <th class="table-cell table-cell-address">
        <a @click="() => sortOrders('address')">Адрес</a>
      </th>
      <th class="table-cell table-cell-date">
        <a @click="() => sortOrders('date')">Дата заказа</a>
      </th>
      <th class="table-cell table-cell-status">Статус</th>
      <th class="table-cell table-cell-comment">Комментарий</th>
    </tr>
  </thead>
</template>

<style scoped></style>
