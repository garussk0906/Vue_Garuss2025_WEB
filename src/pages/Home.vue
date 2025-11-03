<template>
  <div class="home">
    <h1>Добро пожаловать!</h1>
    <p>Представляю проект Гарусс Екатерины гр. 330916у</p>
    <div class="buttons">
      <button @click="goChecklist">Чек-лист</button>
      <button @click="goNotebook">Блокнот</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goChecklist() {
  router.push({ name: 'checklist' })
}

function goNotebook() {
  router.push({ name: 'notebook' })
}

</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 2rem;
}

.buttons button {
  margin: 1rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #1976d2;
  color: white;
  cursor: pointer;
}


</style>