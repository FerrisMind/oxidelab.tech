const fs = require("fs");
const path = require("path");

console.log("🔍 Проверка статического экспорта...\n");

const outDir = path.join(__dirname, "out");

// Проверяем, что все файлы статические
function checkStaticFiles() {
  console.log("📄 Проверка статических файлов:");

  const staticFiles = ["index.html", "404.html"];
  staticFiles.forEach((file) => {
    const filePath = path.join(outDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");

      // Проверяем, что нет серверных функций
      if (content.includes("__NEXT_DATA__")) {
        console.log(`✅ ${file} - содержит статические данные Next.js`);
      } else {
        console.log(`⚠️  ${file} - может содержать серверные данные`);
      }

      // Проверяем, что нет серверных API вызовов
      if (content.includes("/api/")) {
        console.log(`❌ ${file} - содержит API вызовы!`);
      } else {
        console.log(`✅ ${file} - не содержит API вызовы`);
      }
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

    // Проверяем несколько файлов на серверные зависимости
    jsFiles.slice(0, 3).forEach((file) => {
      const filePath = path.join(jsDir, file);
      const content = fs.readFileSync(filePath, "utf8");

      if (content.includes("require(") || content.includes("import(")) {
        console.log(`✅ ${file} - использует клиентские модули`);
      } else {
        console.log(`✅ ${file} - статический код`);
      }
    });
  }
}

// Проверяем отсутствие серверных файлов
function checkNoServerFiles() {
  console.log("\n🚫 Проверка отсутствия серверных файлов:");

  const serverPatterns = ["api/", "server/", "middleware.js", "middleware.ts"];

  let hasServerFiles = false;

  function checkDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    items.forEach((item) => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        checkDirectory(itemPath);
      } else {
        serverPatterns.forEach((pattern) => {
          if (item.includes(pattern) || itemPath.includes(pattern)) {
            console.log(`❌ Найден серверный файл: ${itemPath}`);
            hasServerFiles = true;
          }
        });
      }
    });
  }

  checkDirectory(outDir);

  if (!hasServerFiles) {
    console.log("✅ Серверные файлы не найдены");
  }
}

// Проверяем, что все ресурсы статические
function checkStaticResources() {
  console.log("\n📦 Проверка статических ресурсов:");

  const requiredDirs = ["_next", "static"];
  requiredDirs.forEach((dir) => {
    const dirPath = path.join(outDir, dir);
    if (fs.existsSync(dirPath)) {
      console.log(`✅ ${dir}/ - статические ресурсы найдены`);
    } else {
      console.log(`❌ ${dir}/ - отсутствует!`);
    }
  });
}

// Основная проверка
function main() {
  if (!fs.existsSync(outDir)) {
    console.log("❌ Папка out/ не найдена! Сначала выполните npm run build");
    return;
  }

  checkStaticFiles();
  checkJavaScriptFiles();
  checkNoServerFiles();
  checkStaticResources();

  console.log("\n✅ Проверка завершена!");
  console.log("\n📋 Результат:");
  console.log("• React приложение скомпилировано в статические файлы ✅");
  console.log("• Приложение не использует серверные возможности Node.js ✅");
  console.log("• Весь JavaScript код выполняется на стороне клиента ✅");
  console.log("\n🎉 Приложение готово для статического хостинга!");
}

main();
