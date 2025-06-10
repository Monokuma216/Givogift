<template>
  <UApp>
    <NuxtLayout>
      <NavBar/>
      <div class="content-container pb-[56px] md:pb-0">
        <NuxtPage/>
      </div>
      <Toolbar/>
    </NuxtLayout>
  </UApp>
</template>

<style>
.content-container {
  min-height: calc(100dvh - 64px);
  overflow: auto;
}
</style>
