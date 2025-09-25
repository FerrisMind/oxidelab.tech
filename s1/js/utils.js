// Utility functions
const Utils = {
  // Debounce function
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  // Throttle function
  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // Smooth scroll to element
  scrollToElement(element, offset = 0) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  },

  // Check if element is in viewport
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Get element offset from top
  getOffsetTop(element) {
    let offsetTop = 0;
    do {
      if (!isNaN(element.offsetTop)) {
        offsetTop += element.offsetTop;
      }
    } while ((element = element.offsetParent));
    return offsetTop;
  },

  // Add event listener with cleanup
  addEventListenerWithCleanup(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
  },

  // Create element with attributes
  createElement(tag, attributes = {}, textContent = "") {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "className") {
        element.className = value;
      } else if (key === "innerHTML") {
        element.innerHTML = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    if (textContent) {
      element.textContent = textContent;
    }
    return element;
  },

  // Format number with commas
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  // Generate random ID
  generateId(prefix = "id") {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Check if device is mobile
  isMobile() {
    return window.innerWidth < 768;
  },

  // Check if device is tablet
  isTablet() {
    return window.innerWidth >= 768 && window.innerWidth < 1024;
  },

  // Check if device is desktop
  isDesktop() {
    return window.innerWidth >= 1024;
  },

  // Get current breakpoint
  getBreakpoint() {
    if (this.isMobile()) return "mobile";
    if (this.isTablet()) return "tablet";
    if (this.isDesktop()) return "desktop";
    return "unknown";
  },

  // Animate element - DISABLED
  // animateElement(element, animation, duration = 300) {
  //   // Animation functionality removed for static site
  // },

  // Fade in element - DISABLED
  // fadeIn(element, duration = 300) {
  //   // Animation functionality removed for static site
  // },

  // Fade out element - DISABLED
  // fadeOut(element, duration = 300) {
  //   // Animation functionality removed for static site
  // },

  // Toggle element visibility - SIMPLIFIED
  toggleElement(element, show) {
    if (show) {
      element.style.display = "block";
      element.style.opacity = "1";
    } else {
      element.style.display = "none";
      element.style.opacity = "0";
    }
  },

  // Copy text to clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(textArea);
        return true;
      } catch (err) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  },

  // Get query parameter
  getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  },

  // Set query parameter
  setQueryParam(name, value) {
    const url = new URL(window.location);
    url.searchParams.set(name, value);
    window.history.replaceState({}, "", url);
  },

  // Remove query parameter
  removeQueryParam(name) {
    const url = new URL(window.location);
    url.searchParams.delete(name);
    window.history.replaceState({}, "", url);
  },

  // Local storage helpers
  storage: {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (err) {
        return defaultValue;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (err) {
        return false;
      }
    },
    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (err) {
        return false;
      }
    },
    clear() {
      try {
        localStorage.clear();
        return true;
      } catch (err) {
        return false;
      }
    },
  },
};

// Export for use in other modules
window.Utils = Utils;
