// Internationalization module
const I18n = {
  currentLanguage: "ru",
  translations: {},
  isLoading: false,

  // Initialize i18n
  async init() {
    // Проверяем, был ли язык уже установлен в head скрипте
    const storedLanguage = this.getStoredLanguage();
    if (storedLanguage) {
      this.currentLanguage = storedLanguage;
      console.log("I18n init - using stored language:", storedLanguage);
    } else {
      this.currentLanguage = this.detectLanguage();
      this.updateLanguage();
      console.log("I18n init - using detected language:", this.currentLanguage);
    }

    // Сначала обновляем элементы, которые не требуют переводов
    this.updateImageSources();
    this.updateLanguageSwitcher();

    // Load translations for current language
    await this.loadTranslations(this.currentLanguage);

    // Always wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.updateContent();
        // Показываем контент после полной инициализации
        document.documentElement.classList.remove("hide-content");
        console.log("I18n init - content updated and shown");
      });
    } else {
      this.updateContent();
      // Показываем контент после полной инициализации
      document.documentElement.classList.remove("hide-content");
      console.log("I18n init - content updated and shown");
    }
  },

  // Load translations from JSON file
  async loadTranslations(lang) {
    if (this.isLoading) return;

    this.isLoading = true;
    console.log(`Loading translations for language: ${lang}`);

    try {
      const response = await fetch(`locales/${lang}.json`);
      if (!response.ok) {
        throw new Error(
          `Failed to load translations for ${lang}: ${response.status}`
        );
      }

      const translations = await response.json();
      this.translations[lang] = this.flattenTranslations(translations);
      console.log(`Translations loaded for ${lang}:`, this.translations[lang]);
    } catch (error) {
      console.error(`Error loading translations for ${lang}:`, error);
      // Fallback to empty translations
      this.translations[lang] = {};
    } finally {
      this.isLoading = false;
    }
  },

  // Flatten nested translation object
  flattenTranslations(obj, prefix = "") {
    let flattened = {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (
          typeof obj[key] === "object" &&
          obj[key] !== null &&
          !Array.isArray(obj[key])
        ) {
          Object.assign(flattened, this.flattenTranslations(obj[key], newKey));
        } else {
          flattened[newKey] = obj[key];
        }
      }
    }

    return flattened;
  },

  // Get stored language from localStorage
  getStoredLanguage() {
    return Utils.storage.get("language");
  },

  // Detect language from browser or URL
  detectLanguage() {
    const urlLang = Utils.getQueryParam("lang");
    if (urlLang && this.translations[urlLang]) {
      return urlLang;
    }

    const browserLang = navigator.language.split("-")[0];
    return this.translations[browserLang] ? browserLang : "ru";
  },

  // Set language
  async setLanguage(lang) {
    this.currentLanguage = lang;
    Utils.storage.set("language", lang);
    this.updateLanguage();

    // Load translations if not already loaded
    if (!this.translations[lang]) {
      await this.loadTranslations(lang);
    }

    this.updateContent();
    this.updateImageSources();

    // Обновляем переключатель языка
    this.updateLanguageSwitcher();

    // Dispatch language change event
    const event = new CustomEvent("languageChanged", {
      detail: { language: lang },
    });
    document.dispatchEvent(event);
  },

  // Toggle between languages
  async toggleLanguage() {
    const newLang = this.currentLanguage === "ru" ? "en" : "ru";
    console.log(
      `Switching language from ${this.currentLanguage} to ${newLang}`
    );
    await this.setLanguage(newLang);
  },

  // Update language attribute and meta tags
  updateLanguage() {
    // Обновляем только если значения отличаются от текущих
    if (document.documentElement.lang !== this.currentLanguage) {
      document.documentElement.lang = this.currentLanguage;
    }

    const expectedTitle =
      this.currentLanguage === "ru"
        ? "Oxide Lab - Революция ИИ теперь у вас дома!"
        : "Oxide Lab - AI Revolution now at your home!";

    if (document.title !== expectedTitle) {
      document.title = expectedTitle;
    }
  },

  // Update all content with translations
  updateContent() {
    const elements = document.querySelectorAll("[data-i18n]");
    console.log(
      `I18n updateContent - Found ${elements.length} elements with data-i18n attributes for language: ${this.currentLanguage}`
    );

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.t(key);
      console.log(`I18n updateContent - Translating ${key} to: ${translation}`);

      if (translation && translation !== key) {
        if (element.tagName === "INPUT" && element.type === "text") {
          element.placeholder = translation;
        } else {
          element.textContent = translation;
        }
      } else {
        console.warn(
          `I18n updateContent - Translation not found for key: ${key}`
        );
      }
    });

    // Validate translations after update
    this.validateTranslations();
  },

  // Update image sources based on language
  updateImageSources() {
    const screenshot = document.getElementById("screenshot");
    const modalImage = document.getElementById("modal-image");
    const imageSrc = `assets/screen1_${this.currentLanguage}.png`;

    if (screenshot && screenshot.src !== imageSrc) {
      screenshot.src = imageSrc;
      console.log("I18n updateImageSources - updated screenshot to:", imageSrc);
    }
    if (modalImage && modalImage.src !== imageSrc) {
      modalImage.src = imageSrc;
      console.log(
        "I18n updateImageSources - updated modal image to:",
        imageSrc
      );
    }
  },

  // Update language switcher text
  updateLanguageSwitcher() {
    const languageSwitcher = document.getElementById("language-switcher");
    if (languageSwitcher) {
      const newText = this.currentLanguage === "ru" ? "RU" : "EN";
      if (languageSwitcher.textContent !== newText) {
        languageSwitcher.textContent = newText;
        console.log("I18n updateLanguageSwitcher - updated to:", newText);
      }
    }
  },

  // Get translation for key
  t(key) {
    const translations = this.translations[this.currentLanguage];
    if (!translations) {
      console.warn(
        `No translations loaded for language: ${this.currentLanguage}`
      );
      return key;
    }

    const translation = translations[key];
    return translation || key;
  },

  // Get current language
  getCurrentLanguage() {
    return this.currentLanguage;
  },

  // Check if language is RTL
  isRTL() {
    return ["ar", "he", "fa", "ur"].includes(this.currentLanguage);
  },

  // Validate translations
  validateTranslations() {
    const elements = document.querySelectorAll("[data-i18n]");
    const missingTranslations = [];

    elements.forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.t(key);
      if (translation === key) {
        missingTranslations.push(key);
      }
    });

    if (missingTranslations.length > 0) {
      console.warn("Missing translations:", missingTranslations);
    } else {
      console.log("All translations are available");
    }

    return missingTranslations.length === 0;
  },
};

// Export for use in other modules
window.I18n = I18n;
