import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const id = ref<'deleteOrder' | 'newOrder' | null>(null);
  const props = ref<Record<string, number>>({});

  function open(_id: string, _props: Record<string, number>): void {
    id.value = _id;
    props.value = _props;
  }

  function close(): void {
    id.value = null;
    props.value = {};
  }

  return { id, props, open, close };
});
