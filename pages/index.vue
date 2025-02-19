<script lang="ts" setup>
import MarkdownIt from 'markdown-it'
import taskLists from 'markdown-it-task-lists'
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(taskLists, { label: true })

const content = ref('')
const loading = ref(false)
const error = ref('')

interface DocResponse {
  content: string
}

const { data, error: fetchError, refresh } = await useFetch<DocResponse>('/api/doc')

function formatContent(text: string) {
  const html = md.render(text.trim())
  const sections: {
    level: number
    header: string
    content: string
    isLastInLevel: boolean
  }[] = []

  // Находим все заголовки и их контент
  const regex = /<h([1-3])[^>]*>(.*?)<\/h\1>/g
  const matches = [...html.matchAll(regex)]

  // Создаем структуру секций с учетом вложенности
  for (let i = 0; i < matches.length; i++) {
    const [headerHtml, level] = matches[i]
    const currentHeaderStart = html.indexOf(headerHtml)
    const nextHeaderStart = i < matches.length - 1
      ? html.indexOf(matches[i + 1][0])
      : html.length

    // Получаем контент между текущим заголовком и следующим
    const contentStart = currentHeaderStart + headerHtml.length
    const contentEnd = nextHeaderStart
    const content = html.slice(contentStart, contentEnd).trim()

    // Проверяем, есть ли следующий заголовок того же или более высокого уровня
    const nextLevel = i < matches.length - 1 ? Number(matches[i + 1][1]) : 0
    const currentLevel = Number(level)

    sections.push({
      level: currentLevel,
      header: headerHtml,
      content: content || '', // Если контента нет, используем пустую строку
      isLastInLevel: nextLevel <= currentLevel, // Флаг для определения последнего заголовка в уровне
    })
  }

  // Строим вложенную структуру
  const buildNestedStructure = (items: typeof sections, currentLevel = 1): string => {
    let result = ''

    for (let i = 0; i < items.length; i++) {
      const section = items[i]
      if (section.level !== currentLevel)
        continue

      let childContent = ''
      let nextIndex = i + 1

      // Собираем все дочерние элементы до следующего заголовка текущего или более высокого уровня
      while (
        nextIndex < items.length
        && items[nextIndex].level > currentLevel
      ) {
        nextIndex++
      }

      // Рекурсивно обрабатываем дочерние элементы
      if (nextIndex > i + 1) {
        childContent = buildNestedStructure(
          items.slice(i + 1, nextIndex),
          currentLevel + 1,
        )
      }

      result += `
        <div class="heading-section level-${section.level}">
          <div class="header-wrapper">
            ${section.header}
            <button class="toggle-btn">▼</button>
          </div>
          <div class="collapsible-content">
            ${section.content}
            ${childContent}
          </div>
        </div>
      `
    }

    return result
  }

  return buildNestedStructure(sections)
}

watchEffect(() => {
  if (fetchError.value) {
    error.value = fetchError.value?.message || 'Произошла ошибка'
  }
  else {
    content.value = formatContent(data.value?.content || '')
  }
})

let intervalId: ReturnType<typeof setInterval>

onMounted(() => {
  // Добавляем обработчик кликов для сворачивания/разворачивания
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    const headerWrapper = target.closest('.header-wrapper')
    if (headerWrapper) {
      const section = headerWrapper.closest('.heading-section')
      if (section) {
        section.classList.toggle('collapsed')
        const toggleBtn = headerWrapper.querySelector('.toggle-btn')
        if (toggleBtn) {
          toggleBtn.textContent = section.classList.contains('collapsed') ? '▶' : '▼'
        }
      }
    }
  })

  // Существующий код интервала
  intervalId = setInterval(() => {
    refresh()
  }, 30000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="container">
    <div v-if="loading" class="loading">
      Загрузка...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else v-once class="content" v-html="content" />
  </div>
</template>

<style lang="scss">
h1 {
  font-size: 2rem;
  font-weight: bold;
  color: firebrick;
}

h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: burlywood;
}

h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: yellowgreen;
}

a {
  transition: color 0.3s ease-in-out;
  color: lightgoldenrodyellow;
  font-weight: bold;

  &:hover {
    color: rgb(255, 255, 158);
  }
}

li > strong {
  color: gold;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: red;
  padding: 1rem;
  border: 1px solid red;
  border-radius: 4px;
}

.content {
  .heading-section {
    margin-bottom: 1rem;

    &.level-1 {
      margin-left: 0;
    }

    &.level-2 {
      margin-left: 1.5rem;
    }

    &.level-3 {
      margin-left: 3rem;
    }

    .header-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .toggle-btn {
      background: none;
      border: none;
      color: inherit;
      font-size: 0.8em;
      cursor: pointer;
      padding: 0.2rem;
      transition: transform 0.2s ease;
      color: #fff;
    }

    .collapsible-content {
      transition: all 0.3s ease-out;
      overflow: hidden;
      max-height: 2000px;
      opacity: 1;
      padding-left: 1rem;
      border-left: 2px solid rgba(255, 255, 255, 0.1);
      margin-left: 0.5rem;

      // Важно: убираем отступ для вложенных секций
      .heading-section {
        margin-left: 0;
      }
    }

    &.collapsed {
      & > .collapsible-content {
        max-height: 0;
        opacity: 0;
        padding: 0;
        margin: 0;
        border-left-color: transparent;
      }

      & > .header-wrapper .toggle-btn {
        transform: rotate(-90deg);
      }
    }
  }

  /* li {
    margin: 0.5rem 0;
  } */

  /* .task-list-item {
    list-style-type: none;
    margin-left: -1.5em;
  } */

  /* .task-list-item-checkbox {
    margin-right: 0.5em;
  } */

  /* .task-list-item.checked {
    text-decoration: line-through;
    color: #666;
  } */
}
</style>
