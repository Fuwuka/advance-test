import type { User } from '@/types/user';
import axios, { type AxiosResponse } from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

class AuthService {
  public login({ username, password }: { username: string; password: string }): Promise<User> {
    return axios.get(API_URL).then((response: AxiosResponse<Array<User>>) => {
      const user = response.data.find(
        (user) => user.user === username && user.password === password,
      );

      if (!user) {
        throw new Error('Неверное имя пользователя или пароль');
      }

      return user;
    });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export default new AuthService();
