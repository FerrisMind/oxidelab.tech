const fs = require("fs");
const path = require("path");

console.log("🔍 Диагностика проблем с хостингом...\n");

const outDir = path.join(__dirname, "out");

// Проверяем структуру файлов
function checkFileStructure() {
  console.log("📁 Проверка структуры файлов:");

  const requiredFiles = ["index.html", "404.html", ".htaccess", "favicon.ico"];

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
  requiredDirs.forEach((dir) => {
    const dirPath = path.join(outDir, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`✅ ${dir}/ - найдена`);
    } else {
      console.log(`❌ ${dir}/ - НЕ НАЙДЕНА!`);
    }
  });
}

// Проверяем JavaScript файлы
function checkJavaScriptFiles() {
  console.log("\n📜 Проверка JavaScript файлов:");

  const jsDir = path.join(outDir, "_next", "static", "chunks");
  if (fs.existsSync(jsDir)) {
    const files = fs.readdirSync(jsDir);
    const jsFiles = files.filter((file) => file.endsWith(".js"));

    console.log(`✅ Найдено ${jsFiles.length} JavaScript файлов`);

    // Проверяем несколько файлов
    jsFiles.slice(0, 3).forEach((file) => {
      const filePath = path.join(jsDir, file);
      const content = fs.readFileSync(filePath, "utf8");

      if (content.startsWith("<!DOCTYPE") || content.startsWith("<html")) {
        console.log(`❌ ${file} - содержит HTML код!`);
      } else if (
        content.startsWith("(function") ||
        content.startsWith("!function") ||
        content.startsWith("((b=")
      ) {
        console.log(`✅ ${file} - содержит JavaScript код`);
      } else {
        console.log(`⚠️  ${file} - неизвестный формат`);
      }
    });
  }
}

// Проверяем изображения
function checkImages() {
  console.log("\n🖼️  Проверка изображений:");

  const staticDir = path.join(outDir, "static");
  if (fs.existsSync(staticDir)) {
    const files = fs.readdirSync(staticDir);
    const imageFiles = files.filter(
      (file) =>
        file.endsWith(".png") ||
        file.endsWith(".jpg") ||
        file.endsWith(".jpeg") ||
        file.endsWith(".svg") ||
        file.endsWith(".webp")
    );

    console.log(`✅ Найдено ${imageFiles.length} изображений`);
    imageFiles.forEach((file) => {
      console.log(`   📄 ${file}`);
    });
  }
}

// Проверяем HTML файлы
function checkHTMLFiles() {
  console.log("\n📄 Проверка HTML файлов:");

  const htmlFiles = ["index.html", "404.html"];
  htmlFiles.forEach((file) => {
    const filePath = path.join(outDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");

      // Проверяем пути
      const absolutePaths = content.match(/href="\/[^"]*"/g) || [];
      const absoluteSrcs = content.match(/src="\/[^"]*"/g) || [];

      if (absolutePaths.length > 0) {
        console.log(
          `❌ ${file} - содержит ${absolutePaths.length} абсолютных путей в href`
        );
      } else {
        console.log(`✅ ${file} - все href пути относительные`);
      }

      if (absoluteSrcs.length > 0) {
        console.log(
          `❌ ${file} - содержит ${absoluteSrcs.length} абсолютных путей в src`
        );
      } else {
        console.log(`✅ ${file} - все src пути относительные`);
      }
    }
  });
}

// Создаем инструкцию по исправлению
function createFixInstructions() {
  console.log("\n🔧 Инструкции по исправлению:");
  console.log("1. Убедитесь, что ВСЕ файлы загружены на хостинг");
  console.log("2. Проверьте, что index.html находится в корне домена");
  console.log("3. Убедитесь, что .htaccess файл загружен и работает");
  console.log("4. Проверьте права доступа к файлам на хостинге");
  console.log("5. Откройте test-js.html для диагностики загрузки JS");
  console.log("6. Проверьте, что сервер поддерживает .htaccess");

  console.log("\n📋 Файлы для загрузки:");
  console.log("• index.html (в корне домена)");
  console.log("• 404.html");
  console.log("• .htaccess");
  console.log("• favicon.ico");
  console.log("• ВСЯ папка _next/");
  console.log("• ВСЯ папка static/");
}

// Основная функция
function main() {
  if (!fs.existsSync(outDir)) {
    console.log("❌ Папка out/ не найдена! Сначала выполните npm run build");
    return;
  }

  checkFileStructure();
  checkJavaScriptFiles();
  checkImages();
  checkHTMLFiles();
  createFixInstructions();

  console.log("\n✅ Диагностика завершена!");
}

main();
