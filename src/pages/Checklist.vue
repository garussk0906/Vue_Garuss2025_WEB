<template>
  <div class="page">
    <div class="header-wrapper">
      <h2>Чек‑лист</h2>
      <button @click="goBack" class="back-btn">Назад</button>
    </div>

    <!-- Добавление нового дела -->
    <div class="add-task-container">
      <input
        v-model="newTaskText"
        @keyup.enter="addTask"
        placeholder="Введите задачу"
        class="task-input"
      />
      <button @click="addTask" class="add-btn">Добавить</button>
    </div>


    <!-- Список дел -->
    <ul class="tasks-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <div v-if="!task.editing" class="task-view">
          <input type="checkbox" v-model="task.completed" />
          <span :class="{ completed: task.completed }">{{ task.text }}</span>
          <button @click="startEdit(task.id)" class="edit-btn">✎</button>
          <button @click="deleteTask(task.id)" class="delete-btn">✕</button>
        </div>
          <div v-else class="task-edit">
            <input v-model="task.editText" @keyup.enter="saveEdit(task.id)" class="edit-input" />
            <button @click="saveEdit(task.id)" class="save-btn">Сохранить</button>
            <button @click="cancelEdit(task.id)" class="cancel-btn">Отмена</button>
          </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Массив задач
const tasks = ref([])
let nextId = 1

// Текст нового задания
const newTaskText = ref('')

// Использование useRouter для навигации
const router = useRouter()

function addTask() {
  const text = newTaskText.value.trim()
  if (!text) return
  tasks.value.push({
    id: nextId++,
    text,
    completed: false,
    editing: false,
    editText: text,
  })
  newTaskText.value = ''
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
}

function startEdit(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.editing = true
    task.editText = task.text
  }
}

function saveEdit(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    const trimmed = task.editText.trim()
    if (trimmed) task.text = trimmed
    task.editing = false
  }
}

function cancelEdit(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.editing = false
    task.editText = task.text
  }
}

function goBack() {
  router.push('/')
}

</script>

<style scoped>

.page {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-wrapper h2 {
  margin: 0;
  text-align: center;
}

.header-wrapper .back-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.add-task-container {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 0;
}

.add-task-container .task-input {
  flex: 1;
  margin-right: 0.5rem;
}

.add-task-container .add-btn {
  margin-left: 0;
}

.task-input,
.edit-input {
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 250px;
  transition: border-color 0.2s;
}

.task-input:focus,
.edit-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.add-btn,
.back-btn,
.edit-btn,
.delete-btn,
.save-btn,
.cancel-btn {
  cursor: pointer;
  border: none;
  color: #fff;
  padding: 0.45rem 0.9rem;
  border-radius: 4px;
  font-weight: 500;
  transition: background 0.2s, transform 0.1s;
}

.add-btn { background: #1976d2; }
.back-btn { background: #2c2f30; }
.edit-btn { background: #1976d2; }
.delete-btn { background: #d32f2f; }
.save-btn { background: #388e3c; }
.cancel-btn { background: #757575; }

.add-btn:hover,
.back-btn:hover,
.edit-btn:hover,
.delete-btn:hover,
.save-btn:hover,
.cancel-btn:hover {
  opacity: 0.9;
}

.add-btn:active,
.edit-btn:active,
.delete-btn:active,
.save-btn:active,
.cancel-btn:active {
  transform: scale(0.97);
}

.header-wrapper .back-btn:active {
  transform: translateY(-50%) scale(1);
}

.tasks-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 100%;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f5f5f5;
  padding: 0.75rem 1rem;
  margin-bottom: 0.75rem;
  border-radius: 6px;
  transition: background 0.2s;
}

.task-item:hover {
  background: #eaeaea;
}

.task-view {
  display: flex;
  align-items: center;
  flex: 1;
}

.task-view span {
  flex: 1;
  margin-left: 0.6rem;
  text-align: left;
  transition: color 0.2s, text-decoration 0.2s;
}

.completed {
  text-decoration: line-through;
  color: #777;
}

.task-edit {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
}
</style>