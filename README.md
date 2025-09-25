# DevBlog

Приложение для просмотра и поиска статей.

## 🚀 Особенности

- **Серверный рендеринг (SSR)**
- **Адаптивный дизайн**
- **Кеширование данных**
- **Обработка ошибок**
- **Полное покрытие тестами**

## 🛠 Технологический стек

### Основные технологии
- **Next.js 14**
- **React 18**
- **TypeScript**
- **Tailwind CSS**

### Управление данными
- **React Query (@tanstack/react-query)**
- **Axios**

### Тестирование и качество кода
- **Vitest browser mode**
- **Playwright**
- **ESLint**

### Дополнительные инструменты
- **React Error Boundary**
- **MSW (Mock Service Worker)**

## 🏗 Архитектура проекта

```
src/
├── app/                          # App Router (Next.js 13+)
│   ├── page.tsx                  # Главная страница
│   ├── layout.tsx                # Основной layout
│   ├── globals.css               # Глобальные стили
│   ├── _components/              # Компоненты главной страницы
│   │   ├── PostCard/             # Карточка поста
│   │   ├── PostsGrid/            # Сетка постов
│   │   └── usePosts.ts           # React Query хук
│   ├── posts/[id]/               # Динамические страницы постов
│   │   ├── page.tsx              # SSR страница поста
│   │   └── _components/          # Компоненты страницы поста
│   └── search/                   # Страница поиска
│       ├── page.tsx              # Страница поиска
│       └── _components/          # Компоненты поиска
├── components/                   # Переиспользуемые компоненты
│   ├── ReactQueryProvider.tsx    # Провайдер React Query
│   └── shared/                   # Общие компоненты
│       ├── Header/               # Шапка сайта
│       ├── LoadingSpinner/       # Индикатор загрузки
│       └── ErrorBoundary/        # Обработка ошибок
├── lib/                          # Утилиты и конфигурация
│   ├── api.ts                    # Axios конфигурация
│   └── react-query.ts            # Конфигурация React Query
├── types/                        # TypeScript типы
│   └── post.ts                   # Типы для постов
└── tests/                        # Настройки тестирования
    ├── setup.ts                  # Настройка тестовой среды
    └── baseTest.ts               # Базовые утилиты для тестов
```

## 🚀 Запуск

### Предварительные требования
- Node.js 18 или выше
- npm, yarn или pnpm

### Установка и запуск

```bash

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск продакшен версии
npm run start
```

Приложение будет доступно по адресу `http://localhost:3000` (как правило)

## 🧪 Тестирование

```bash
#Поскольку тесты в browser mode нам надо установить хромиум
npx playwright install chromium

# Запуск всех тестов
npm run test

# Линтинг кода
npm run lint
```


### Настройка React Query
- **Stale Time**: 5 минут для кеширования данных
- **Retry Logic**: до 3 попыток


## 📊 API

Приложение использует [JSONPlaceholder API](https://jsonplaceholder.typicode.com/):
- `GET /posts` — получение всех постов
- `GET /posts/{id}` — получение конкретного поста
