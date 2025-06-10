<script setup lang="ts">
const tabs = ref( [ { icon: 'i-lucide-heart' }, { icon: 'i-lucide-calendar' }, { icon: 'i-lucide-users' }, { icon: 'i-lucide-notebook' }, { icon: 'i-lucide-user' }, ] );

const { tabSize } = useAppBreakpoints();

onMounted( () => {
  watch( tabSize, ( value ) => {
    tabSize.value = value ? 'xs' : 'sm';
  }, { immediate: true } );
} );
</script>

<template>
  <div class="toolbar flex md:hidden fixed bottom-0 left-0 right-0 bg-(--ui-bg-elevated) p-2 shadow-lg z-10">
    <UTabs :size="tabSize" :items="tabs" class="w-full"/>
  </div>
</template>

<style scoped lang="scss">

</style>
