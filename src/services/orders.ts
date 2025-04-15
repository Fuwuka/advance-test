import type { Order } from '@/types/order';
import axios, { type AxiosResponse } from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/events`;

class OrdersService {
  public search(sortDesc: boolean, sortBy?: 'address' | 'date'): Promise<Array<Order>> {
    const descParams = sortDesc ? '-' : '';
    const params = sortBy ? `?_sort=${descParams}${sortBy}` : '';

    return axios.get(API_URL + params).then((response: AxiosResponse<Array<Order>>) => {
      return response.data;
    });
  }

  public getOrder(orderID: number): Promise<Order> {
    return axios.get(`${API_URL}/${orderID}`).then((response: AxiosResponse<Order>) => {
      return response.data;
    });
  }

  public createOrder(order: Partial<Order>): Promise<Order> {
    return axios.post(API_URL, order).then((response: AxiosResponse<Order>) => {
      return response.data;
    });
  }

  public deleteOrder(orderID: number): Promise<void> {
    return axios.delete(`${API_URL}/${orderID}`);
  }
}

export default new OrdersService();
