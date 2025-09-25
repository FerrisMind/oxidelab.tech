// Main application initialization
const App = {
  // Initialize the application
  init() {
    this.setupProtection();
    this.initializeModules();
    this.setupGlobalEventListeners();
    this.setupPerformanceOptimizations();
    console.log("Oxide Lab static website initialized");
  },

  // Setup content protection
  setupProtection() {
    // Disable context menu
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      return false;
    });

    // Disable hotkeys for copying
    document.addEventListener("keydown", (e) => {
      // Ctrl+C, Ctrl+A, Ctrl+V, Ctrl+X, Ctrl+S, F12, Ctrl+Shift+I, Ctrl+U
      if (
        e.ctrlKey &&
        (e.keyCode === 67 ||
          e.keyCode === 65 ||
          e.keyCode === 86 ||
          e.keyCode === 88 ||
          e.keyCode === 83 ||
          e.keyCode === 85)
      ) {
        e.preventDefault();
        return false;
      }
      // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (
        e.keyCode === 123 ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67))
      ) {
        e.preventDefault();
        return false;
      }
    });

    // Disable text selection
    document.addEventListener("selectstart", (e) => {
      e.preventDefault();
      return false;
    });

    // Disable drag and drop
    document.addEventListener("dragstart", (e) => {
      e.preventDefault();
      return false;
    });

    // Disable right-click on images
    document.addEventListener("dragstart", (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
        return false;
      }
    });
  },

  // Initialize all modules
  async initializeModules() {
    // Initialize modules in order
    try {
      console.log("Initializing I18n module...");
      await I18n.init();
      console.log("I18n module initialized");

      Header.init();
      Hero.init();
      Features.init();
      SystemRequirements.init();
      Footer.init();
    } catch (error) {
      console.error("Error initializing modules:", error);
    }
  },

  // Setup global event listeners
  setupGlobalEventListeners() {
    // Language change listener
    document.addEventListener("languageChanged", () => {
      this.handleLanguageChange();
    });

    // Window resize listener
    window.addEventListener(
      "resize",
      Utils.debounce(() => {
        this.handleResize();
      }, 250)
    );

    // Page visibility change
    document.addEventListener("visibilitychange", () => {
      this.handleVisibilityChange();
    });

    // Before unload
    window.addEventListener("beforeunload", () => {
      this.handleBeforeUnload();
    });

    // Error handling
    window.addEventListener("error", (e) => {
      this.handleError(e);
    });

    // Unhandled promise rejection
    window.addEventListener("unhandledrejection", (e) => {
      this.handlePromiseRejection(e);
    });
  },

  // Handle language change
  handleLanguageChange() {
    console.log("Language changed, updating all modules...");

    // Update all modules that depend on language
    if (typeof SystemRequirements !== "undefined") {
      SystemRequirements.updateLanguage();
    }

    // Update image sources
    I18n.updateImageSources();

    // Force content update
    I18n.updateContent();
  },

  // Handle window resize
  handleResize() {
    // Update mobile menu state
    if (Utils.isMobile() && typeof Header !== "undefined") {
      Header.closeMobileMenu();
    }

    // Recalculate layouts if needed
    this.recalculateLayouts();
  },

  // Handle page visibility change
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden, pause animations or reduce activity
      this.pauseAnimations();
    } else {
      // Page is visible, resume animations
      this.resumeAnimations();
    }
  },

  // Handle before unload
  handleBeforeUnload() {
    // Save any pending data
    this.savePendingData();
  },

  // Handle errors
  handleError(event) {
    console.error("Global error:", event.error);
    // You could send error reports to a service here
  },

  // Handle unhandled promise rejections
  handlePromiseRejection(event) {
    console.error("Unhandled promise rejection:", event.reason);
    // You could send error reports to a service here
  },

  // Recalculate layouts
  recalculateLayouts() {
    // Force reflow for any elements that need it
    const elements = document.querySelectorAll(
      ".hero, .features, .system-requirements"
    );
    elements.forEach((element) => {
      element.style.transform = "translateZ(0)";
    });
  },

  // Pause animations
  pauseAnimations() {
    document.body.classList.add("paused");
  },

  // Resume animations
  resumeAnimations() {
    document.body.classList.remove("paused");
  },

  // Save pending data
  savePendingData() {
    // Save any form data or user preferences
    Utils.storage.set("lastVisit", new Date().toISOString());
  },

  // Setup performance optimizations
  setupPerformanceOptimizations() {
    // Lazy load images
    this.setupLazyLoading();

    // Preload critical resources
    this.preloadCriticalResources();

    // Intersection observer for animations - DISABLED
    // this.setupIntersectionObserver();
  },

  // Setup lazy loading for images
  setupLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach((img) => {
        img.src = img.dataset.src;
        img.classList.remove("lazy");
      });
    }
  },

  // Preload critical resources
  preloadCriticalResources() {
    // Preload critical images
    const criticalImages = ["assets/screen1_ru.png", "assets/screen1_en.png"];

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  },

  // Setup intersection observer for animations - DISABLED
  // setupIntersectionObserver() {
  //   // Animation functionality removed for static site
  // },

  // Utility method to check if app is ready
  isReady() {
    return document.readyState === "complete";
  },

  // Method to get app version
  getVersion() {
    return "1.0.0";
  },

  // Method to get app info
  getInfo() {
    return {
      name: "Oxide Lab Static Website",
      version: this.getVersion(),
      language: I18n.getCurrentLanguage(),
      breakpoint: Utils.getBreakpoint(),
      isMobile: Utils.isMobile(),
      isTablet: Utils.isTablet(),
      isDesktop: Utils.isDesktop(),
    };
  },
};

// Initialize app when DOM is ready
(async function initializeApp() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", async () => {
      console.log("DOM loaded, initializing app...");
      await App.init();
    });
  } else {
    console.log("DOM already loaded, initializing app...");
    await App.init();
  }
})();

// Export for debugging
window.App = App;
