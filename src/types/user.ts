export type User = {
  user: string;
  name: string;
  role: 'ADMIN' | 'USER';
  password: string;
};
