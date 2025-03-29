<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
    get() {
        return colorMode.value === "dark";
    },
    set() {
        colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
    },
});

// Добавим флаг для отслеживания готовности компонента
const isClient = ref(false);

// Устанавливаем флаг после маунтинга компонента
onMounted(() => {
    isClient.value = true;
});
</script>

<template>
    <UButton
        v-if="isClient"
        :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
        variant="ghost"
        @click="isDark = !isDark"
    />
    <UButton
        v-else
        variant="ghost"
        loading
    />
</template>

<style scoped></style>
