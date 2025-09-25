// Hero section functionality
const Hero = {
  heroSection: null,
  downloadBtn: null,
  downloadDropdown: null,
  screenshot: null,
  modal: null,
  modalImage: null,
  modalClose: null,

  // Initialize hero section
  init() {
    this.heroSection = document.getElementById("hero");
    this.downloadBtn = document.getElementById("download-btn");
    this.downloadDropdown = document.getElementById("download-dropdown");
    this.screenshot = document.getElementById("screenshot");
    this.modal = document.getElementById("screenshot-modal");
    this.modalImage = document.getElementById("modal-image");
    this.modalClose = document.getElementById("modal-close");

    if (!this.heroSection) return;

    this.setupEventListeners();
    this.createParticles();
  },

  // Setup event listeners
  setupEventListeners() {
    // Download button dropdown
    if (this.downloadBtn && this.downloadDropdown) {
      this.downloadBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleDownloadDropdown();
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !this.downloadBtn.contains(e.target) &&
          !this.downloadDropdown.contains(e.target)
        ) {
          this.closeDownloadDropdown();
        }
      });
    }

    // Dropdown items click handlers
    if (this.downloadDropdown) {
      const dropdownItems =
        this.downloadDropdown.querySelectorAll(".dropdown-item");
      dropdownItems.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          this.handleDownloadClick(item);
        });
      });
    }

    // Screenshot modal
    if (this.screenshot) {
      this.screenshot.addEventListener("click", () => {
        this.openScreenshotModal();
      });
    }

    if (this.modalClose) {
      this.modalClose.addEventListener("click", () => {
        this.closeScreenshotModal();
      });
    }

    if (this.modal) {
      this.modal.addEventListener("click", (e) => {
        if (e.target === this.modal) {
          this.closeScreenshotModal();
        }
      });
    }

    // Close modal with Escape key
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        this.modal &&
        this.modal.classList.contains("open")
      ) {
        this.closeScreenshotModal();
      }
    });

    // Download button actions
    const downloadItems = document.querySelectorAll(".dropdown-item");
    downloadItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.handleDownloadClick(item);
      });
    });

    // Footer download button
    const footerDownloadBtn = document.getElementById("footer-download-btn");
    if (footerDownloadBtn) {
      footerDownloadBtn.addEventListener("click", () => {
        this.scrollToHero();
      });
    }
  },

  // Toggle download dropdown
  toggleDownloadDropdown() {
    if (!this.downloadDropdown) return;

    const isOpen = this.downloadDropdown.classList.contains("open");
    console.log("Toggle dropdown, isOpen:", isOpen);

    if (isOpen) {
      this.closeDownloadDropdown();
    } else {
      this.openDownloadDropdown();
    }
  },

  // Open download dropdown
  openDownloadDropdown() {
    if (!this.downloadDropdown) return;

    this.downloadDropdown.classList.add("open");
  },

  // Close download dropdown
  closeDownloadDropdown() {
    if (!this.downloadDropdown) return;

    this.downloadDropdown.classList.remove("open");
  },

  // Handle download click
  handleDownloadClick(item) {
    const text = item.textContent.trim();
    console.log("Download clicked:", text);

    // Here you would implement actual download logic
    // For now, just show a message
    this.showDownloadMessage(text);

    this.closeDownloadDropdown();
  },

  // Show download message
  showDownloadMessage(text) {
    // Create temporary notification
    const notification = document.createElement("div");
    notification.className = "download-notification";
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(to right, #ff6b35, #f7931e);
            color: #1a1b39;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
    notification.textContent = `Скачивание: ${text}`;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0)";
    });

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  },

  // Open screenshot modal
  openScreenshotModal() {
    if (!this.modal) return;

    this.modal.classList.add("open");
    document.body.style.overflow = "hidden";

    // Update modal image source based on current language
    if (this.modalImage) {
      const currentLang = I18n.getCurrentLanguage();
      this.modalImage.src = `assets/screen1_${currentLang}.png`;
    }
  },

  // Close screenshot modal
  closeScreenshotModal() {
    if (!this.modal) return;

    this.modal.classList.remove("open");
    document.body.style.overflow = "";
  },

  // Scroll to hero section
  scrollToHero() {
    if (this.heroSection) {
      Utils.scrollToElement(this.heroSection);
    }
  },

  // Create floating particles
  createParticles() {
    if (!this.heroSection) return;

    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles-container";
    particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1;
        `;

    this.heroSection.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 20; i++) {
      this.createParticle(particlesContainer);
    }
  },

  // Create individual particle
  createParticle(container) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 80 + 10;
    const startY = Math.random() * 20 - 10;
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 5;

    particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${startX}%;
            top: ${startY}%;
            background: linear-gradient(to right, #ff6b35, #f7931e);
            border-radius: 50%;
            opacity: 0;
            box-shadow: 0 0 8px rgba(255, 107, 53, 0.7);
            animation: particle-flow ${duration}s linear ${delay}s infinite;
        `;

    container.appendChild(particle);
  },

  // Add CSS for particle animation
  addParticleStyles() {
    const style = document.createElement("style");
    style.textContent = `
            @keyframes particle-flow {
                0% {
                    opacity: 0;
                    transform: translateY(0) translateX(0);
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100vh) translateX(20px);
                }
            }
        `;
    document.head.appendChild(style);
  },

  // Animate hero elements on scroll
  animateOnScroll() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const heroElements = this.heroSection.querySelectorAll(
      ".hero-title, .hero-description, .hero-buttons"
    );
    heroElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.2}s`;
      observer.observe(element);
    });
  },
};

// Export for use in other modules
window.Hero = Hero;
