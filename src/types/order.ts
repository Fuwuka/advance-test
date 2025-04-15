export type Order = {
  id: number;
  name: string;
  address: string;
  date: string;
  status: 'Выполнен' | 'Новый';
  comment?: string;
};
