<template>
  <div class="page">
    <div class="header-wrapper">
      <h2>Блокнот</h2>
      <button @click="goBack" class="back-btn">Назад</button>
    </div>

    <div class="notebook-container">
      <!-- Левая панель со списком записей -->
      <div class="sidebar">
        <div class="add-note-container">
          <button @click="createNewNote" class="add-btn">+ Новая запись</button>
        </div>
        
        <ul class="notes-list">
          <li 
            v-for="note in notes" 
            :key="note.id" 
            :class="['note-item', { active: selectedNote && selectedNote.id === note.id }]"
            @click="selectNote(note.id)"
          >
            <div class="note-title">{{ note.title || 'Без названия' }}</div>
            <div class="note-date">{{ formatDate(note.date) }}</div>
            <button @click.stop="deleteNote(note.id)" class="delete-btn">✕</button>
          </li>
        </ul>
      </div>

      <!-- Правая панель с текстовым редактором -->
      <div class="editor">
        <div v-if="selectedNote" class="editor-content">
          <input
            v-model="selectedNote.title"
            placeholder="Название записи"
            class="title-input"
          />
          <textarea
            v-model="selectedNote.content"
            placeholder="Начните писать..."
            class="content-textarea"
          ></textarea>
          <div class="editor-actions">
            <button @click="saveNote" class="save-btn">Сохранить</button>
          </div>
        </div>
        <div v-else class="empty-state">
          <p>Выберите запись из списка слева или создайте новую</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Массив записей
const notes = ref([])
let nextId = 1

// Выбранная запись
const selectedNote = ref(null)

// Использование useRouter для навигации
const router = useRouter()

function createNewNote() {
  const newNote = {
    id: nextId++,
    title: '',
    content: '',
    date: new Date().toISOString()
  }
  notes.value.unshift(newNote) // Добавляем в начало списка
  selectedNote.value = newNote
}

function selectNote(id) {
  const note = notes.value.find(n => n.id === id)
  if (note) {
    selectedNote.value = note
  }
}

function saveNote() {
  if (selectedNote.value) {
    selectedNote.value.date = new Date().toISOString()
    // Обновляем запись в массиве
    const index = notes.value.findIndex(n => n.id === selectedNote.value.id)
    if (index !== -1) {
      notes.value[index] = { ...selectedNote.value }
    }
  }
}

function deleteNote(id) {
  // Удаляем из массива
  notes.value = notes.value.filter(n => n.id !== id)
  
  // Если удаленная запись была выбрана, очищаем выбор
  if (selectedNote.value && selectedNote.value.id === id) {
    selectedNote.value = null
  }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function goBack() {
  router.push('/')
}

</script>

<style scoped>
/* Основные стили страницы */
.page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  height: 80vh;
  display: flex;
  flex-direction: column;
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

/* Контейнер блокнота */
.notebook-container {
  display: flex;
  flex: 1;
  gap: 1rem;
  min-height: 0;
}

/* Левая панель со списком записей */
.sidebar {
  width: 280px;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
}

.add-note-container {
  margin-bottom: 1rem;
}

.add-note-container .add-btn {
  width: 100%;
  cursor: pointer;
  border: none;
  color: #fff;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: background 0.2s, transform 0.1s;
  background: #1976d2;
}

.add-note-container .add-btn:hover {
  opacity: 0.9;
}

.add-note-container .add-btn:active {
  transform: scale(0.98);
}

.notes-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
  overflow-y: auto;
}

.note-item {
  background: #ffffff;
  border-radius: 6px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  position: relative;
  border: 2px solid transparent;
}

.note-item:hover {
  background: #e3f2fd;
}

.note-item.active {
  background: #e3f2fd;
  border-color: #1976d2;
}

.note-title {
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #333;
}

.note-date {
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.delete-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #d32f2f;
  border: none;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.note-item:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: #c62828;
}

/* Правая панель с редактором */
.editor {
  flex: 1;
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
}

.editor-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.title-input {
  padding: 0.75rem;
  font-size: 1.2rem;
  font-weight: 500;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 1rem;
  transition: border-color 0.2s;
}

.title-input:focus {
  outline: none;
  border-color: #1976d2;
}

.content-textarea {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  resize: none;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  transition: border-color 0.2s;
}

.content-textarea:focus {
  outline: none;
  border-color: #1976d2;
}

.editor-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.save-btn {
  cursor: pointer;
  border: none;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 500;
  transition: background 0.2s, transform 0.1s;
  background: #388e3c;
}

.save-btn:hover {
  opacity: 0.9;
}

.save-btn:active {
  transform: scale(0.98);
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  font-style: italic;
}

.empty-state p {
  text-align: center;
  margin: 0;
}

/* Кнопки */
.add-btn,
.back-btn,
.delete-btn,
.save-btn {
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
.delete-btn { background: #d32f2f; }
.save-btn { background: #388e3c; }

.add-btn:hover,
.back-btn:hover,
.delete-btn:hover,
.save-btn:hover {
  opacity: 0.9;
}

.add-btn:active,
.back-btn:active,
.delete-btn:active,
.save-btn:active {
  transform: scale(0.97);
}

.header-wrapper .back-btn:active {
  transform: translateY(-50%) scale(1);
}

/* Адаптивность */
@media (max-width: 768px) {
  .notebook-container {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .page {
    height: auto;
    min-height: 80vh;
  }
}
</style>