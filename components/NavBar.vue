<script lang="ts" setup>
const tabs = ref([
  {label: 'Желаемое', icon: 'i-lucide-heart'},
  {label: 'События', icon: 'i-lucide-calendar'},
  {label: 'Друзья', icon: 'i-lucide-users'},
  {label: 'Заметки', icon: 'i-lucide-notebook'},
  {label: 'Профиль', icon: 'i-lucide-user'},
]);

const {tabSize} = useAppBreakpoints();

onMounted(() => {
  // Следим за изменениями и обновляем tabSize только на клиенте
  watch(
      tabSize, (value) => {
        tabSize.value = value ? 'xs' : 'sm';
      },
      {immediate: true},
  );
});
</script>

<template>
  <div class="w-full p-4 flex items-center bg-(--ui-bg-elevated) fixed">
    <div class="flex md:hidden mr-10">
      <UButton
          variant="ghost"
          icon="i-lucide-menu"
      />
    </div>
    <div class="text-xl md:text-2xl font-bold mr-1">Givogift</div>
    <div class="hidden md:flex items-center w-full">
      <div class="w-full flex justify-center items-center">
        <UTabs
            :size="tabSize"
            variant="link"
            :items="tabs"
            class="flex items-center justify-center"
            :ui="{ trigger: 'gap-1  md:w-25 lg:w-30' }"
        />
      </div>
      <div class="flex items-center gap-2">
        <UButton
            variant="ghost"
            icon="i-lucide-bell"
        />
        <UButton
            variant="ghost"
            icon="i-lucide-settings"
        />
        <ThemeToggle/>
      </div>
    </div>
    <div class="ml-auto flex md:hidden items-center gap-2">
      <ThemeToggle/>
    </div>
  </div>
</template>

<style lang="scss"></style>
