<script lang="ts" setup>
const model = defineModel<1 | 2 | 3 | 4 | 5>({
    required: true,
});

const hoveredRating = ref(0);

const handleHover = (index: number) => {
    hoveredRating.value = index;
};

const handleClick = (index: number) => {
    model.value = index as 1 | 2 | 3 | 4 | 5;
};

const isActive = (index: number) => {
    return index <= (hoveredRating.value || model.value);
};
</script>

<template>
    <div>
        <UButtonGroup>
            <UButton
                v-for="index in 5"
                :key="index"
                variant="ghost"
                icon="i-lucide-star"
                class="m-0 active:bg-(--ui-primary)/20"
                :class="{ 'bg-(--ui-primary)/10': isActive(index) }"
                @mouseenter="handleHover(index)"
                @mouseleave="() => (hoveredRating = 0)"
                @click="handleClick(index)"
            />
        </UButtonGroup>
    </div>
</template>

<style lang="scss"></style>
