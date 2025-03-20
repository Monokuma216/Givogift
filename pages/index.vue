<script lang="ts" setup>

</script>

<template>
  <!-- <div class="flex justify-center items-center h-screen">
    <UText>Hello</UText>
  </div> -->
  <div class="flex flex-col gap-4 h-screen overflow-y-auto w-full">
    <UContainer v-for="item in 10" class="flex rounded-lg m-4 h-70 bg-radial from-zinc-800 to-zinc-900 to-70%" style="height: 370px; min-height: 370px;">
      <UText>Hello</UText>
    </UContainer>
  </div>
</template>

<style lang="scss"></style>
