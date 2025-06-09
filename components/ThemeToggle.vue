<script setup lang="ts">
const colorMode = useColorMode()

// Используем явную переменную для отслеживания текущей темы
const currentTheme = ref(colorMode.value)

// Обновляем currentTheme при изменении colorMode.value
watch(() => colorMode.value, (newValue) => {
  currentTheme.value = newValue
}, { immediate: true })

// Функция для переключения темы
function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

// Добавим флаг для отслеживания готовности компонента
const isClient = ref(false)

// Устанавливаем флаг после маунтинга компонента
onMounted(() => {
  isClient.value = true
  // Принудительно синхронизируем currentTheme после монтирования на клиенте
  currentTheme.value = colorMode.value
})
</script>

<template>
  <UButton
    v-if="isClient"
    :icon="currentTheme === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
    variant="ghost"
    @click="toggleTheme()"
  />
  <UButton
    v-else
    variant="ghost"
    loading
  />
</template>

<style scoped></style>
