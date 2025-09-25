// Footer functionality
const Footer = {
  footer: null,
  footerDownloadBtn: null,
  currentYear: null,

  // Initialize footer
  init() {
    this.footer = document.getElementById("footer");
    this.footerDownloadBtn = document.getElementById("footer-download-btn");
    this.currentYear = document.getElementById("current-year");

    if (!this.footer) return;

    this.setupEventListeners();
    this.updateCurrentYear();
    // this.setupAnimations(); // DISABLED for static site
  },

  // Setup event listeners
  setupEventListeners() {
    // Footer download button
    if (this.footerDownloadBtn) {
      this.footerDownloadBtn.addEventListener("click", () => {
        this.handleFooterDownloadClick();
      });
    }

    // Social links
    const socialLinks = document.querySelectorAll(".social-link");
    socialLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        this.handleSocialLinkClick(e, link);
      });
    });

    // Smooth scroll for internal links
    const internalLinks = this.footer.querySelectorAll('a[href^="#"]');
    internalLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          Utils.scrollToElement(targetElement);
        }
      });
    });
  },

  // Handle footer download button click
  handleFooterDownloadClick() {
    // Scroll to hero section for download
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      Utils.scrollToElement(heroSection);
    } else {
      // Fallback: scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // Trigger download dropdown if available
    const downloadBtn = document.getElementById("download-btn");
    if (downloadBtn) {
      downloadBtn.click();
    }
  },

  // Handle social link click
  handleSocialLinkClick(e, link) {
    const href = link.getAttribute("href");

    // Add click tracking (if analytics is available)
    this.trackSocialClick(href);

    // Add visual feedback
    this.addClickFeedback(link);
  },

  // Track social link clicks
  trackSocialClick(url) {
    // This would integrate with analytics
    console.log("Social link clicked:", url);

    // Example: Google Analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", "click", {
        event_category: "social",
        event_label: url,
      });
    }
  },

  // Add visual feedback for clicks
  addClickFeedback(element) {
    element.style.transform = "scale(0.95)";
    element.style.transition = "transform 0.1s ease";

    setTimeout(() => {
      element.style.transform = "scale(1)";
    }, 100);
  },

  // Update current year
  updateCurrentYear() {
    if (this.currentYear) {
      this.currentYear.textContent = new Date().getFullYear();
    }
  },

  // Setup scroll animations - DISABLED
  // setupAnimations() {
  //   // Animation functionality removed for static site
  // },

  // Add hover effects - DISABLED
  // addHoverEffects() {
  //   // Hover effects removed for static site
  // },

  // Add scroll progress indicator
  addScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.style.cssText = `
            position: fixed;
            bottom: 0;
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

  // Add back to top button
  addBackToTopButton() {
    const backToTopBtn = document.createElement("button");
    backToTopBtn.className = "back-to-top";
    backToTopBtn.innerHTML = "↑";
    backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(to right, #ff6b35, #f7931e);
            color: #1a1b39;
            border: none;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;

    document.body.appendChild(backToTopBtn);

    // Show/hide button based on scroll position
    const toggleButton = () => {
      if (window.scrollY > 300) {
        backToTopBtn.style.opacity = "1";
        backToTopBtn.style.visibility = "visible";
      } else {
        backToTopBtn.style.opacity = "0";
        backToTopBtn.style.visibility = "hidden";
      }
    };

    window.addEventListener("scroll", Utils.throttle(toggleButton, 16));

    // Scroll to top when clicked
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Hover effects
    backToTopBtn.addEventListener("mouseenter", () => {
      backToTopBtn.style.transform = "scale(1.1)";
    });

    backToTopBtn.addEventListener("mouseleave", () => {
      backToTopBtn.style.transform = "scale(1)";
    });
  },

  // Add newsletter signup (if needed)
  addNewsletterSignup() {
    const newsletterForm = document.createElement("form");
    newsletterForm.className = "newsletter-form";
    newsletterForm.innerHTML = `
            <div class="newsletter-content">
                <h4>Stay Updated</h4>
                <p>Get notified about new releases and updates</p>
                <div class="newsletter-input-group">
                    <input type="email" placeholder="Enter your email" required>
                    <button type="submit">Subscribe</button>
                </div>
            </div>
        `;

    newsletterForm.style.cssText = `
            margin-top: 2rem;
            padding: 1.5rem;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            text-align: center;
        `;

    const footerText = this.footer.querySelector(".footer-text");
    if (footerText) {
      footerText.appendChild(newsletterForm);
    }

    // Handle form submission
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      this.handleNewsletterSignup(email);
    });
  },

  // Handle newsletter signup
  handleNewsletterSignup(email) {
    console.log("Newsletter signup:", email);
    // Here you would integrate with your email service
    alert("Thank you for subscribing!");
  },
};

// Export for use in other modules
window.Footer = Footer;
