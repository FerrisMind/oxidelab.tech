// Header functionality
const Header = {
  header: null,
  mobileMenuToggle: null,
  mobileMenu: null,
  languageSwitcher: null,
  isScrolled: false,
  isDarkTheme: false,

  // Initialize header
  init() {
    this.header = document.getElementById("header");
    this.mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    this.mobileMenu = document.getElementById("mobile-menu");
    this.languageSwitcher = document.getElementById("language-switcher");
    this.logoDefault = document.getElementById("logo-default");
    this.logoMono = document.getElementById("logo-mono");

    if (!this.header) return;

    this.setupEventListeners();
    this.updateLanguageSwitcher();
    this.updateLogoVisibility();
  },

  // Setup event listeners
  setupEventListeners() {
    // Scroll listener for header background
    const handleScroll = Utils.throttle(() => {
      this.handleScroll();
    }, 16);

    window.addEventListener("scroll", handleScroll);

    // Mobile menu toggle
    if (this.mobileMenuToggle) {
      this.mobileMenuToggle.addEventListener("click", () => {
        this.toggleMobileMenu();
      });
    }

    // Language switcher
    if (this.languageSwitcher) {
      this.languageSwitcher.addEventListener("click", async () => {
        await I18n.toggleLanguage();
      });
    }

    // Listen for language changes
    document.addEventListener("languageChanged", () => {
      this.updateLanguageSwitcher();
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (this.mobileMenu && this.mobileMenu.classList.contains("open")) {
        if (!this.header.contains(e.target)) {
          this.closeMobileMenu();
        }
      }
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerHeight = this.header.offsetHeight;
          Utils.scrollToElement(targetElement, headerHeight + 20);
        }
      });
    });
  },

  // Handle scroll events
  handleScroll() {
    const scrollY = window.scrollY;
    const heroSectionHeight = window.innerHeight;

    const scrolled = scrollY > 10;
    const darkTheme = scrollY > heroSectionHeight - 80;

    if (scrolled !== this.isScrolled) {
      this.isScrolled = scrolled;
      this.updateHeaderState();
    }

    if (darkTheme !== this.isDarkTheme) {
      this.isDarkTheme = darkTheme;
      this.updateHeaderState();
    }
  },

  // Update header visual state
  updateHeaderState() {
    if (!this.header) return;

    this.header.classList.toggle("scrolled", this.isScrolled);
    this.header.classList.toggle("dark-theme", this.isDarkTheme);
    this.updateLogoVisibility();

    // Apply dark theme to footer as well
    const footer = document.getElementById("footer");
    if (footer) {
      footer.classList.toggle("dark-theme", this.isDarkTheme);
    }
  },

  // Update logo visibility based on header state
  updateLogoVisibility() {
    // Попробуем найти элементы заново, если они не найдены
    if (!this.logoDefault) {
      this.logoDefault = document.getElementById("logo-default");
    }
    if (!this.logoMono) {
      this.logoMono = document.getElementById("logo-mono");
    }

    if (!this.logoDefault || !this.logoMono) {
      return;
    }

    // Показываем монохромный логотип только при скролле на светлом фоне
    const shouldShowMono = this.isScrolled && !this.isDarkTheme;

    if (shouldShowMono) {
      this.logoDefault.style.opacity = "0";
      this.logoMono.style.opacity = "1";
    } else {
      this.logoDefault.style.opacity = "1";
      this.logoMono.style.opacity = "0";
    }
  },

  // Toggle mobile menu
  toggleMobileMenu() {
    if (!this.mobileMenu || !this.mobileMenuToggle) return;

    const isOpen = this.mobileMenu.classList.contains("open");

    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  },

  // Open mobile menu
  openMobileMenu() {
    if (!this.mobileMenu || !this.mobileMenuToggle) return;

    this.mobileMenu.classList.add("open");
    this.mobileMenuToggle.classList.add("active");
    this.mobileMenuToggle.setAttribute("aria-expanded", "true");

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  },

  // Close mobile menu
  closeMobileMenu() {
    if (!this.mobileMenu || !this.mobileMenuToggle) return;

    this.mobileMenu.classList.remove("open");
    this.mobileMenuToggle.classList.remove("active");
    this.mobileMenuToggle.setAttribute("aria-expanded", "false");

    // Restore body scroll
    document.body.style.overflow = "";
  },

  // Update language switcher text
  updateLanguageSwitcher() {
    if (this.languageSwitcher) {
      this.languageSwitcher.textContent =
        I18n.getCurrentLanguage().toUpperCase();
    }
  },

  // Update header text colors based on state
  updateTextColors() {
    const navLinks = document.querySelectorAll(".nav-link");
    const languageSwitcher = this.languageSwitcher;
    const mobileMenuToggle = this.mobileMenuToggle;

    const textColorClass =
      this.isScrolled && !this.isDarkTheme
        ? "text-foreground"
        : "text-primary-foreground";

    navLinks.forEach((link) => {
      link.className = `nav-link ${textColorClass}`;
    });

    if (languageSwitcher) {
      languageSwitcher.className = `language-switcher ${textColorClass}`;
    }

    if (mobileMenuToggle) {
      mobileMenuToggle.className = `mobile-menu-toggle ${textColorClass}`;
    }
  },

  // Show/hide header based on scroll direction
  handleScrollDirection() {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
      const scrollY = window.scrollY;
      const scrollDirection = scrollY > lastScrollY ? "down" : "up";

      if (scrollY > 100) {
        this.header.style.transform =
          scrollDirection === "down" ? "translateY(-100%)" : "translateY(0)";
      } else {
        this.header.style.transform = "translateY(0)";
      }

      lastScrollY = scrollY;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick);
  },

  // Add scroll progress indicator
  addScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(to right, #ff6b35, #f7931e);
            z-index: 9999;
            transition: width 0.1s ease;
        `;

    document.body.appendChild(progressBar);

    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + "%";
    };

    window.addEventListener("scroll", Utils.throttle(updateProgress, 16));
  },
};

// Export for use in other modules
window.Header = Header;
