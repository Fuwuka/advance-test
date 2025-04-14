<script setup lang="ts">
import OrdersTableHeader from '@/components/OrdersTableHeader.vue';
import OrdersTableRow from '@/components/OrdersTableRow.vue';
</script>

<template>
  <main class="orders">
    <table class="table">
      <OrdersTableHeader />
      <tbody>
        <OrdersTableRow />
        <OrdersTableRow />
        <OrdersTableRow />
      </tbody>
    </table>
  </main>
</template>

<style scoped>
.orders {
  padding-top: 127px;
  padding-right: 22px;
}
.table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  background: var(--color-background-dark);
}
.table :deep(th),
.table :deep(td) {
  border: 1px solid var(--color-text);
  text-align: center;
}
.table :deep(th) {
  padding: 8px 12px;
}
.table :deep(td) {
  padding: 12px 12px;
}
:deep(.table-cell) {
  width: 100%;
}
:deep(.table-cell-number) {
  max-width: 5%;
}
:deep(.table-cell-name) {
  max-width: 20%;
}
:deep(.table-cell-address) {
  max-width: 25%;
}
:deep(.table-cell-date) {
  max-width: 20%;
}
:deep(.table-cell-status) {
  max-width: 10%;
}
:deep(.table-cell-comment) {
  max-width: 20%;
}
</style>
