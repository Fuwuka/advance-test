import router from '@/router';
import { defineStore } from 'pinia';
import AuthService from '@/services/auth';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const initialUser = localStorage.getItem('user');

  const user = ref(initialUser ? JSON.parse(initialUser) : null);

  async function login(username: string, password: string): Promise<void> {
    const response = await AuthService.login({ username, password });

    if (response) {
      user.value = response;
      loginSuccess();
    }
  }

  function loginSuccess(): void {
    localStorage.setItem('user', JSON.stringify(user.value));

    router.push('/');
  }

  function logout(): void {
    user.value = null;
    AuthService.logout();

    router.push('/login');
  }

  return { user, login, loginSuccess, logout };
});
