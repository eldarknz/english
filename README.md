# English daily

Адаптивное статическое приложение для изучения английского: слова, материалы, тексты и тесты. Контент хранится в `content/` и обнаруживается автоматически при сборке.

## Запуск

```bash
npm ci
npm run dev
npm run typecheck
npm run validate:content
npm run build
npm run preview
```

Стек: React, TypeScript, Vite, React Router HashRouter, Markdown (`gray-matter`, `react-markdown`, `remark-gfm`), JSON и обычный CSS.

## Контент

- `content/vocabulary/*.json`: `id`, `title`, `description`, `items`; у записи обязательны `id`, `term`, `translation`, `example`, `tags`.
- `content/materials/**/*.md` и `content/texts/**/*.md`: YAML front matter с `id`, `title`, `level`, `category`, `tags`, затем Markdown.
- `content/tests/*.json`: `id`, `title`, `description`, `level`, `tags`, `questions`; вопрос содержит `id`, `prompt`, `options`, `correctOptionId`, `explanation`.

Добавьте файл в соответствующую папку: ручной импорт, регистрация и маршрут не нужны. Проверка ловит ошибки YAML/JSON, дубли id и некорректные вопросы. Контент и правильные ответы входят в статическую сборку, поэтому не подходят для конфиденциальных заметок.

## Публикация

Workflow `.github/workflows/deploy.yml` запускается после push в `main` или вручную, выполняет проверки и публикует `dist` через GitHub Pages. В настройках репозитория выберите `Settings → Pages → Source → GitHub Actions`, если это ещё не сделано. После успешного деплоя адрес: `https://eldarknz.github.io/english/`.

Первая версия не включает сервер, аккаунты, синхронизацию, редактор в браузере, сохранение попыток и таймер.
