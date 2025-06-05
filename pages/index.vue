<script lang="ts" setup>
const rating = ref<1 | 2 | 3 | 4 | 5>(3);
</script>

<template>
  <div class="size-full flex items-center justify-center">
    <Rating v-model="rating" class="mt-4"/>
  </div>
</template>

<style lang="scss"></style>
