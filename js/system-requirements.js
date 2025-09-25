// System requirements functionality
const SystemRequirements = {
  minimalRequirements: null,
  recommendedRequirements: null,
  requirements: {
    minimal: [
      { icon: "monitor", key: "os" },
      { icon: "cpu", key: "cpu" },
      { icon: "memory", key: "ram" },
      { icon: "gpu", key: "gpu" },
      { icon: "storage", key: "storage" },
      { icon: "wifi", key: "internet" },
    ],
    recommended: [
      { icon: "monitor", key: "os" },
      { icon: "cpu", key: "cpu" },
      { icon: "memory", key: "ram" },
      { icon: "gpu", key: "gpu" },
      { icon: "storage", key: "storage" },
      { icon: "ssd", key: "ssd" },
    ],
  },

  // Initialize system requirements
  init() {
    this.minimalRequirements = document.getElementById("minimal-requirements");
    this.recommendedRequirements = document.getElementById(
      "recommended-requirements"
    );

    if (!this.minimalRequirements || !this.recommendedRequirements) return;

    this.renderRequirements();
    // this.setupAnimations(); // DISABLED for static site
  },

  // Render requirements
  renderRequirements() {
    this.renderRequirementList(
      this.minimalRequirements,
      this.requirements.minimal,
      "minimal"
    );
    this.renderRequirementList(
      this.recommendedRequirements,
      this.requirements.recommended,
      "recommended"
    );
  },

  // Render individual requirement list
  renderRequirementList(container, requirements, type) {
    if (!container) return;

    container.innerHTML = "";

    requirements.forEach((req, index) => {
      const requirementItem = this.createRequirementItem(req, type, index);
      container.appendChild(requirementItem);
    });
  },

  // Create requirement item element
  createRequirementItem(req, type, index) {
    const item = document.createElement("div");
    item.className = "requirement-item";
    // item.style.animationDelay = `${index * 0.1}s`; // DISABLED for static site

    const icon = this.createRequirementIcon(req.icon);
    const text = document.createElement("p");
    text.className = "requirement-text";
    text.textContent = this.getRequirementText(type, req.key);

    item.appendChild(icon);
    item.appendChild(text);

    return item;
  },

  // Create requirement icon
  createRequirementIcon(iconType) {
    const iconContainer = document.createElement("div");
    iconContainer.className = "requirement-icon";

    const icon = document.createElement("i");
    icon.className = `ph ${this.getPhosphorRequirementIcon(iconType)}`;
    icon.style.fontSize = "24px";
    icon.style.color = "hsl(var(--accent))";

    iconContainer.appendChild(icon);

    return iconContainer;
  },

  // Get Phosphor icon class for requirement icon
  getPhosphorRequirementIcon(iconType) {
    const iconMap = {
      monitor: "ph-monitor",
      cpu: "ph-cpu",
      memory: "ph-memory",
      gpu: "ph-graphics-card",
      storage: "ph-hard-drive",
      wifi: "ph-wifi-high",
      ssd: "ph-hard-drive",
    };

    return iconMap[iconType] || "ph-monitor";
  },

  // Get requirement text based on type and key
  getRequirementText(type, key) {
    const currentLang = I18n.getCurrentLanguage();
    const translations = {
      ru: {
        minimal: {
          os: "ОС: Windows 10/11 (x64)",
          cpu: "Процессор: Intel Core i3 / AMD Ryzen 3 или эквивалент",
          ram: "Оперативная память: 3 ГБ RAM",
          gpu: "Видеокарта: Встроенная графика (работает на CPU) или NVIDIA GTX 1060 (3 ГБ VRAM) или новее",
          storage: "Место на диске: 2 ГБ свободного места",
          internet: "Интернет: Только для загрузки моделей",
        },
        recommended: {
          os: "ОС: Windows 10/11 (x64)",
          cpu: "Процессор: Intel Core i5 / AMD Ryzen 5 (6+ ядер)",
          ram: "Оперативная память: 8 ГБ RAM",
          gpu: "Видеокарта: NVIDIA GTX 1070 (8 ГБ VRAM) или новее",
          storage: "Место на диске: 20 ГБ свободного места",
          ssd: "Накопитель: SSD для быстрой загрузки моделей",
        },
      },
      en: {
        minimal: {
          os: "OS: Windows 10/11 (x64)",
          cpu: "CPU: Intel Core i3 / AMD Ryzen 3 or equivalent",
          ram: "RAM: 3 GB",
          gpu: "GPU: Integrated graphics (runs on CPU) or NVIDIA GTX 1060 (3 GB VRAM) and higher",
          storage: "Storage: 2 GB free space",
          internet: "Internet: Only for downloading models",
        },
        recommended: {
          os: "OS: Windows 10/11 (x64)",
          cpu: "CPU: Intel Core i5 / AMD Ryzen 5 (6+ cores)",
          ram: "RAM: 8 GB",
          gpu: "GPU: NVIDIA GTX 1070 (8 GB VRAM) and higher",
          storage: "Storage: 20 GB free space",
          ssd: "Drive: SSD for fast model loading",
        },
      },
    };

    return translations[currentLang]?.[type]?.[key] || key;
  },

  // Setup scroll animations - DISABLED
  // setupAnimations() {
  //   // Animation functionality removed for static site
  // },

  // Add interactive effects - DISABLED
  // addInteractiveEffects() {
  //   // Interactive effects removed for static site
  // },

  // Update requirements when language changes
  updateLanguage() {
    this.renderRequirements();
  },
};

// Export for use in other modules
window.SystemRequirements = SystemRequirements;
