<script lang="ts" setup>
const model = defineModel<1 | 2 | 3 | 4 | 5>({
  required: true,
})

const hoveredRating = ref(0)

const handleHover = (index: number) => {
  hoveredRating.value = index
}

const handleClick = (index: number) => {
  model.value = index as 1 | 2 | 3 | 4 | 5
}

const isActive = (index: number) => {
  return index <= (hoveredRating.value || model.value)
}
</script>

<template>
  <UButtonGroup>
    <UButton v-for="index in 5" :key="index" variant="ghost" icon="i-lucide-star" :class="{ 'active-star': isActive(index) }" @mouseenter="handleHover(index)" @mouseleave="() => hoveredRating = 0"
      @click="handleClick(index)" />
  </UButtonGroup>
</template>

<style lang="scss" scoped>
.active-star {
  @apply bg-primary-500 text-white;
}
</style>
