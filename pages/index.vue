<script lang="ts" setup>
const rating = ref<1 | 2 | 3 | 4 | 5>(2)
</script>

<template>
  <div class="w-full flex items-center justify-center h-full">
    <Rating v-model="rating" />
  </div>
</template>

<style lang="scss"></style>
