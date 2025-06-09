<template>
  <UApp>
    <NuxtLayout>
      <NavBar />
      <div class="content-container pb-[60px] md:pb-0">
        <NuxtPage />
      </div>
      <Toolbar />
    </NuxtLayout>
  </UApp>
</template>

<style>
.content-container {
  min-height: 100vh;
}
</style>
