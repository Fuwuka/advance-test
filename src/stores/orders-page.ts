import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Order } from '@/types/order';
import OrdersService from '@/services/orders';
import type { OrdersSortBy } from '@/types/orders-sort-by';

export const useOrdersPageStore = defineStore('orders-page', () => {
  const isSubmitting = ref(false);
  const isLoading = ref(false);
  const submitError = ref<string | null>(null);
  const orders = ref<Array<Order>>([]);
  const sortBy = ref<OrdersSortBy>();
  const sortDesc = ref(false);

  async function loadOrders(): Promise<void> {
    isLoading.value = true;

    try {
      const response = await OrdersService.search(sortDesc.value, sortBy.value);

      isLoading.value = false;
      orders.value = response;
    } catch {
      isLoading.value = false;
    }
  }

  async function createOrder(order: Partial<Order>): Promise<void> {
    isSubmitting.value = true;
    submitError.value = null;

    try {
      const response = await OrdersService.createOrder(order);

      isSubmitting.value = false;
      orders.value = [...orders.value, response];
    } catch (error) {
      isSubmitting.value = false;
      submitError.value = (error as Error).message;
    }
  }

  async function deleteOrder(orderID: number): Promise<void> {
    isSubmitting.value = true;
    submitError.value = null;

    try {
      await OrdersService.deleteOrder(orderID);

      isSubmitting.value = false;
      orders.value = orders.value.filter((_order) => _order.id != orderID);
    } catch (error) {
      isSubmitting.value = false;
      submitError.value = (error as Error).message;
    }
  }

  async function refreshOrder(orderID: number): Promise<void> {
    const order = await OrdersService.getOrder(orderID);

    orders.value = orders.value.map((_order) => (_order.id === order.id ? order : _order));
  }

  function sortOrders(_sortBy: OrdersSortBy): void {
    sortDesc.value = _sortBy === sortBy.value ? !sortDesc.value : false;
    sortBy.value = _sortBy;

    loadOrders();
  }

  function resetState(): void {
    isSubmitting.value = false;
    isLoading.value = false;
    submitError.value = null;
    orders.value = [];
  }

  return {
    isSubmitting,
    isLoading,
    submitError,
    orders,
    sortBy,
    sortDesc,
    loadOrders,
    createOrder,
    deleteOrder,
    refreshOrder,
    sortOrders,
    resetState,
  };
});
