<script setup lang="ts">
const {data: users, pending, error} = await useFetch('/api/users');
console.log({users, pending, error});
</script>

<template>
  <div>
    <div v-if="pending">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <div v-if="users?.length === 0">
      Список пуст
    </div>
    <div v-else>
      <div v-for="user in users" :key="user.id">
        {{ user.name }}
      </div>
    </div>
  </div>
</template>