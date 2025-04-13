import { defineStore } from 'pinia';
import { ref, type Ref } from 'vue';
import { useAuthStore } from './auth';

export const useLoginPageStore = defineStore('login-page', () => {
  const isSubmitting = ref(false);
  const loginError: Ref<string | null> = ref(null);

  async function login(username: string, password: string): Promise<void> {
    isSubmitting.value = true;
    loginError.value = null;

    const authStore = useAuthStore();

    try {
      await authStore.login(username, password);
    } catch (error) {
      loginFailure((error as Error).message);
    }
  }

  function loginFailure(error: string): void {
    isSubmitting.value = false;
    loginError.value = error;
  }

  function resetState(): void {
    isSubmitting.value = false;
    loginError.value = null;
  }

  return { isSubmitting, loginError, login, loginFailure, resetState };
});
