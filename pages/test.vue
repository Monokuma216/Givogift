<script setup lang="ts">
const {data: users, pending, error} = await useFetch('/api/users');
</script>

<template>
  <div v-if="pending">Загрузка...</div>
  <div v-else-if="error">Ошибка: {{ error.message }}</div>
  <div v-else>
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
  </div>
</template>
