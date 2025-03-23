<script lang="ts" setup>
import { useBreakpoints } from "@vueuse/core";

const tabs = ref([
    {
        label: "Желаемое",
        icon: "i-lucide-heart",
    },
    {
        label: "События",
        icon: "i-lucide-calendar",
    },
    {
        label: "Друзья",
        icon: "i-lucide-users",
    },
    {
        label: "Заметки",
        icon: "i-lucide-notebook",
    },
    {
        label: "Профиль",
        icon: "i-lucide-user",
    },
]);

// Изначально устанавливаем tabSize как "sm" для согласованности между сервером и клиентом
const tabSize = ref<"xs" | "sm" | "md" | "lg" | "xl" | undefined>("sm");

// Перенесем логику breakpoints внутрь onMounted
onMounted(() => {
    const breakpoints = useBreakpoints({
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
    });

    const isLaptop = breakpoints.smaller("lg");

    // Следим за изменениями и обновляем tabSize только на клиенте
    watch(
        isLaptop,
        (value) => {
            tabSize.value = value ? "xs" : "sm";
        },
        { immediate: true }
    );
});
</script>

<template>
    <div class="w-full p-4 flex items-center justify-between bg-(--ui-bg-elevated)">
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
                <ThemeToggle />
            </div>
        </div>
        <div class="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <UButton
                variant="ghost"
                icon="i-lucide-menu"
            />
        </div>
    </div>
</template>

<style lang="scss"></style>
