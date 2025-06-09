<script setup lang="ts">
const tabs = ref([
  { label: 'Желаемое', icon: 'i-lucide-heart' },
  { label: 'События', icon: 'i-lucide-calendar' },
  { label: 'Друзья', icon: 'i-lucide-users' },
  { label: 'Заметки', icon: 'i-lucide-notebook' },
  { label: 'Профиль', icon: 'i-lucide-user' },
]);

const { tabSize } = useAppBreakpoints();

onMounted(() => {
  watch(tabSize, (value) => {
    tabSize.value = value ? 'xs' : 'sm';
  }, { immediate: true });
});
</script>

<template>
  <div class="toolbar flex md:hidden fixed bottom-0 left-0 right-0 bg-(--ui-bg-elevated) p-2 shadow-lg z-10">
    <UTabs
      :size="tabSize"
      variant="pills"
      :items="tabs"
      class="w-full"
      :ui="{
        wrapper: 'w-full',
        container: 'w-full',
        list: 'w-full flex justify-around',
        item: 'flex-1 text-center',
        trigger: 'flex flex-col items-center justify-center py-2 px-1 gap-1 text-xs'
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.toolbar {
  border-top: 1px solid var(--ui-border-color);
}
</style>
