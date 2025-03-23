import { useBreakpoints } from "@vueuse/core";

export const useAppBreakpoints = () => {
    const tabSize = ref<"xs" | "sm" | "md" | "lg" | "xl" | undefined>(undefined);

    // Перенесем логику breakpoints внутрь onMounted
    onMounted(() => {
        const breakpoints = useBreakpoints({
            xs: 0,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
        });

        tabSize.value = Boolean(breakpoints.active().value) ? (breakpoints.active().value as "xs" | "sm" | "md" | "lg" | "xl") : undefined;
    });

    return { tabSize };
};
