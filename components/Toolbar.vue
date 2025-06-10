<script setup lang="ts">
const tabs = ref([
  {icon: 'i-lucide-heart', disabled: false},
  {icon: 'i-lucide-calendar', disabled: true},
  {icon: 'i-lucide-users', disabled: true},
  {icon: 'i-lucide-notebook', disabled: true},
  {icon: 'i-lucide-user', disabled: false},
]);

const {tabSize} = useAppBreakpoints();

onMounted(() => {
  watch(tabSize, (value) => {
    tabSize.value = value ? 'xs' : 'sm';
  }, {immediate: true});
});
</script>

<template>
  <div class="flex md:hidden fixed bottom-0 left-0 right-0 bg-(--ui-bg-elevated) p-2 shadow-lg z-10">
    <UTabs
        :size="tabSize"
        :items="tabs"
        class="w-full"
        color="neutral"
    />
  </div>
</template>

<style scoped lang="scss">

</style>
