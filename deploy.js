const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 Начинаю подготовку сайта к загрузке на хостинг...\n");

try {
  // 1. Установка зависимостей
  console.log("📦 Устанавливаю зависимости...");
  execSync("npm install", { stdio: "inherit" });

  // 2. Сборка проекта
  console.log("\n🔨 Собираю проект...");
  execSync("npm run build", { stdio: "inherit" });

  // 3. Проверка наличия папки out
  const outDir = path.join(__dirname, "out");
  if (!fs.existsSync(outDir)) {
    throw new Error("Папка out не найдена! Сборка не удалась.");
  }

  // 4. Копирование .htaccess в папку out
  const htaccessSource = path.join(__dirname, "public", ".htaccess");
  const htaccessDest = path.join(outDir, ".htaccess");

  if (fs.existsSync(htaccessSource)) {
    fs.copyFileSync(htaccessSource, htaccessDest);
    console.log("✅ Скопирован .htaccess файл");
  }

  // 5. Создание инструкции по загрузке
  const instructions = `
# 📋 Инструкция по загрузке на хостинг

## Что загружать:
Загрузите ВСЕ содержимое папки 'out/' в корневую папку вашего домена на хостинге.

## Структура для загрузки:
out/
├── index.html          ← Главная страница
├── .htaccess          ← Настройки сервера
├── _next/             ← Статические ресурсы Next.js
├── static/            ← Ваши изображения
└── ...другие файлы

## Шаги:
1. Откройте панель управления хостингом
2. Перейдите в файловый менеджер
3. Откройте папку вашего домена (обычно public_html/ или www/)
4. Загрузите ВСЕ файлы из папки 'out/'
5. Убедитесь, что index.html находится в корне домена

## Проверка:
- Откройте ваш домен в браузере
- Проверьте все страницы и функции
- Убедитесь, что изображения загружаются

## Готово! 🎉
Ваш сайт готов к загрузке на хостинг.
`;

  fs.writeFileSync(
    path.join(__dirname, "ИНСТРУКЦИЯ_ЗАГРУЗКИ.txt"),
    instructions
  );

  console.log("\n✅ Готово! Сайт успешно подготовлен к загрузке на хостинг.");
  console.log("\n📁 Папка для загрузки: out/");
  console.log("📄 Инструкция сохранена в файл: ИНСТРУКЦИЯ_ЗАГРУЗКИ.txt");
  console.log("\n🎯 Следующие шаги:");
  console.log('1. Откройте папку "out/"');
  console.log("2. Загрузите ВСЕ файлы из этой папки на ваш хостинг");
  console.log("3. Убедитесь, что index.html находится в корне домена");
} catch (error) {
  console.error("\n❌ Ошибка при подготовке сайта:", error.message);
  process.exit(1);
}
