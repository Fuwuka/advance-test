<script setup lang="ts">
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';
import * as Yup from 'yup';
import { Form, Field } from 'vee-validate';
import { useOrdersPageStore } from '@/stores/orders-page';
import { useAuthStore } from '@/stores/auth';
import { watch } from 'vue';

const modalStore = useModalStore();

const { id } = storeToRefs(modalStore);
const { close } = modalStore;

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const submitError = null;
const isSubmitting = false;

const initialValues = {
  name: user.value?.name
};
const schema = Yup.object().shape({
  name: Yup.string().required('Введите ваше имя'),
  address: Yup.string().required('Введите ваш адрес'),
  comment: Yup.string().max(200, 'Слишком длинный комментарий'),
});

async function onSubmit(values: Record<string, string>) {
  const ordersPageStore = useOrdersPageStore();

  const date = new Date();
  const localeDate = date
  .toLocaleDateString('ru-RU', { year: undefined, month: 'long', day: 'numeric' });

  await ordersPageStore.createOrder({
    name: values.name,
    address: values.address,
    comment: values.comment || undefined,
    status: 'Новый',
    date: `${localeDate} ${date.getFullYear()}`
  });

  close();
}

watch(user, (_user) => {
  initialValues.name = _user?.name;
})
</script>

<template>
  <div v-if="id === 'newOrder'" class="modal" @click.self="close">
    <div class="modal-container">
      <div class="modal-title">Добавить заказ</div>
      <Form
        @submit="onSubmit"
        :initial-values="initialValues"
        :validation-schema="schema"
        v-slot="{ errors }"
        ref="form"
        class="form">
        <div class="form-group form-group-small">
          <Field
            name="name"
            placeholder="Введите ваше имя"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.name }"
          />
          <div class="form-error">{{ errors.name }}</div>
        </div>
        <div class="form-group form-group-small">
          <Field
            name="address"
            placeholder="Введите ваш адрес"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.address }"
          />
          <div class="form-error">{{ errors.address }}</div>
        </div>
        <div class="form-group form-group-small">
          <Field
            name="comment"
            placeholder="Комментарий"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.comment }"
          />
          <div class="form-error">{{ errors.comment }}</div>
        </div>
        <div v-if="submitError" class="form-error">{{ submitError }}</div>
        <button class="button button-small form-button" :disabled="isSubmitting">
          Добавить заказ
        </button>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-container {
  background: var(--color-background);
  padding: 63px 44px 42px;
  width: 100%;
  height: calc(100% - var(--header-height));
  margin-top: var(--header-height);
  max-width: 1280px;
}
.modal-actions {
  margin-top: 68px;
  display: flex;
  justify-content: center;
}
.modal-title {
  margin-bottom: 33px;
}
.form-group {
  max-width: 162px;
}
.form-group:last-of-type {
  margin-bottom: 29px;
}
.form-error {
  max-width: 162px;
}
.form-button {
  background: var(--color-background-dark);
}
</style>
