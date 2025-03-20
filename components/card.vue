<script lang="ts" setup>
const defaultImage =
  "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const props = defineProps<{
  image?: string;
}>();

const hoverable = ref(false);

const containerClass = computed(() => {
  return {
    "relative overflow-hidden": true,
    "rounded-2xl aspect-square w-1/10": true,
    "bg-zinc-800 bg-cover bg-center": true,
    [`bg-[url('${props.image}')]`]: props.image,
    [`bg-[url('${defaultImage}')]`]: !props.image,
  };
});
</script>

<template>
  <div :class="containerClass" @mouseenter="hoverable = true" @mouseleave="hoverable = false">
    <Transition name="fade">
      <div v-if="hoverable" class="absolute inset-0 flex items-center justify-center bg-black/10">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
