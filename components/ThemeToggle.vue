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

console.log({ colorMode: { ...colorMode }, isDark: isDark.value });
</script>

<template>
    <ClientOnly v-if="!colorMode?.forced">
        <UButton
            :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
            variant="ghost"
            @click="isDark = !isDark"
        />

        <template #fallback>
            <UButton
                variant="ghost"
                @click="isDark = !isDark"
                loading
            />
        </template>
    </ClientOnly>
</template>

<style scoped></style>
