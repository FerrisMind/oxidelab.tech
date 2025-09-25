const fs = require("fs");
const path = require("path");

console.log("🔍 Диагностика проблем с хостингом...\n");

const outDir = path.join(__dirname, "out");

// Проверяем основные файлы
const requiredFiles = ["index.html", "favicon.ico", ".htaccess"];

console.log("📁 Проверка основных файлов:");
requiredFiles.forEach((file) => {
  const filePath = path.join(outDir, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - найден`);
  } else {
    console.log(`❌ ${file} - НЕ НАЙДЕН!`);
  }
});

// Проверяем папки
const requiredDirs = ["_next", "static"];

console.log("\n📂 Проверка папок:");
requiredDirs.forEach((dir) => {
  const dirPath = path.join(outDir, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`✅ ${dir}/ - найдена`);
  } else {
    console.log(`❌ ${dir}/ - НЕ НАЙДЕНА!`);
  }
});

// Проверяем содержимое index.html
console.log("\n📄 Анализ index.html:");
const indexPath = path.join(outDir, "index.html");
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, "utf8");

  // Проверяем наличие проблемных путей
  const absolutePaths = content.match(/href="\/[^"]*"/g) || [];
  const absoluteSrcs = content.match(/src="\/[^"]*"/g) || [];

  if (absolutePaths.length > 0) {
    console.log(`⚠️  Найдено ${absolutePaths.length} абсолютных путей в href:`);
    absolutePaths.slice(0, 3).forEach((path) => console.log(`   ${path}`));
  }

  if (absoluteSrcs.length > 0) {
    console.log(`⚠️  Найдено ${absoluteSrcs.length} абсолютных путей в src:`);
    absoluteSrcs.slice(0, 3).forEach((path) => console.log(`   ${path}`));
  }

  if (absolutePaths.length === 0 && absoluteSrcs.length === 0) {
    console.log("✅ Все пути относительные");
  }

  // Проверяем наличие DOCTYPE
  if (content.includes("<!DOCTYPE html>")) {
    console.log("✅ DOCTYPE найден");
  } else {
    console.log("❌ DOCTYPE НЕ НАЙДЕН!");
  }

  // Проверяем наличие title
  if (content.includes("<title>")) {
    console.log("✅ Title найден");
  } else {
    console.log("❌ Title НЕ НАЙДЕН!");
  }
}

// Создаем список файлов для загрузки
console.log("\n📋 Список файлов для загрузки на хостинг:");
function listFiles(dir, prefix = "") {
  const items = fs.readdirSync(dir);
  items.forEach((item) => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      console.log(`${prefix}📁 ${item}/`);
      listFiles(itemPath, prefix + "  ");
    } else {
      console.log(`${prefix}📄 ${item}`);
    }
  });
}

listFiles(outDir);

console.log("\n🎯 Рекомендации:");
console.log("1. Убедитесь, что ВСЕ файлы загружены на хостинг");
console.log("2. Проверьте, что index.html находится в корне домена");
console.log("3. Откройте test.html для проверки работы хостинга");
console.log("4. Проверьте права доступа к файлам на хостинге");
console.log("5. Убедитесь, что .htaccess файл загружен и работает");
