<script setup lang="ts">
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { onUnmounted } from 'vue';
import { useLoginPageStore } from '@/stores/login-page';
import { storeToRefs } from 'pinia';

const loginPageStore = useLoginPageStore();
const { isSubmitting, loginError } = storeToRefs(loginPageStore);

const schema = Yup.object().shape({
  username: Yup.string().required('Введите имя пользователя'),
  password: Yup.string()
    .required('Введите пароль')
    .min(8, 'Пароль должен содержать не менее 8 символов'),
});

function onSubmit(values: Record<string, string>) {
  const { username, password } = values;

  return loginPageStore.login(username, password);
}

onUnmounted(() => useLoginPageStore().resetState());
</script>

<template>
  <div class="container">
    <div class="wrapper">
      <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }" class="form">
      <div class="form-group">
        <Field
          name="username"
          placeholder="Имя пользователя"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.username }"
        />
        <div class="form-error">{{ errors.username }}</div>
      </div>
      <div class="form-group">
        <Field
          name="password"
          placeholder="Пароль"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
        />
        <div class="form-error">{{ errors.password }}</div>
      </div>
      <div v-if="loginError" class="form-error">{{ loginError }}</div>
      <button class="button form-button" :disabled="isSubmitting">Войти</button>
    </Form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  min-height: 100vh;
}
.wrapper {
  background-color: var(--color-background-dark);
  padding: 57px 108px 22px 38px;
}
.form-group {
  max-width: 180px;
  padding-right: 18px;
  box-sizing: content-box;
}
.form-group:last-of-type {
  margin-bottom: 37px;
}
.form-error {
  max-width: 180px;
}
.button {
  display: block;
  margin-left: auto;
  margin-top: 16px;
}
</style>
