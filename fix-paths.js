const fs = require("fs");
const path = require("path");

console.log("🔧 Исправляю пути в HTML файлах...");

const outDir = path.join(__dirname, "out");

// Функция для исправления путей в HTML файле
function fixPathsInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Заменяем абсолютные пути на относительные
  content = content.replace(/href="\/_next\//g, 'href="./_next/');
  content = content.replace(/src="\/_next\//g, 'src="./_next/');
  content = content.replace(/href="\/static\//g, 'href="./static/');
  content = content.replace(/src="\/static\//g, 'src="./static/');

  fs.writeFileSync(filePath, content);
  console.log(`✅ Исправлен файл: ${path.basename(filePath)}`);
}

// Исправляем все HTML файлы
const htmlFiles = ["index.html", "404.html"];

htmlFiles.forEach((file) => {
  const filePath = path.join(outDir, file);
  if (fs.existsSync(filePath)) {
    fixPathsInFile(filePath);
  }
});

// Также исправляем файлы в подпапках
const subDirs = ["404"];
subDirs.forEach((dir) => {
  const dirPath = path.join(outDir, dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
      if (file.endsWith(".html")) {
        fixPathsInFile(path.join(dirPath, file));
      }
    });
  }
});

console.log("✅ Все пути исправлены!");
