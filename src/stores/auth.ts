import router from '@/router';
import { defineStore } from 'pinia';
import AuthService from '@/services/auth';
import { computed, ref } from 'vue';
import type { User } from '@/types/user';

export const useAuthStore = defineStore('auth', () => {
  const initialUser = localStorage.getItem('user');

  const user = ref<User | null>(initialUser ? JSON.parse(initialUser) : null);

  const isAuthorized = computed(() => !!user.value);
  const isAdmin = computed(() => !!user.value && user.value.role === 'ADMIN');

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

  return { user, isAuthorized, isAdmin, login, loginSuccess, logout };
});
