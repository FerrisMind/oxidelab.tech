// Features section functionality
const Features = {
  featuresGrid: null,
  features: [],

  // Initialize features section
  init() {
    this.featuresGrid = document.getElementById("features-grid");

    if (!this.featuresGrid) return;

    this.loadFeatures();
    this.renderFeatures();
    // this.setupAnimations(); // DISABLED for static site
  },

  // Load features data
  loadFeatures() {
    this.features = [
      {
        icon: "qwen",
        titleKey: "features.cards.qwen3.title",
        descriptionKey: "features.cards.qwen3.description",
      },
      {
        icon: "text",
        titleKey: "features.cards.cleanText.title",
        descriptionKey: "features.cards.cleanText.description",
      },
      {
        icon: "repeat",
        titleKey: "features.cards.smartGeneration.title",
        descriptionKey: "features.cards.smartGeneration.description",
      },
      {
        icon: "clock",
        titleKey: "features.cards.fastDialogs.title",
        descriptionKey: "features.cards.fastDialogs.description",
      },
      {
        icon: "cpu",
        titleKey: "features.cards.autoHardware.title",
        descriptionKey: "features.cards.autoHardware.description",
      },
      {
        icon: "chart",
        titleKey: "features.cards.progressTracking.title",
        descriptionKey: "features.cards.progressTracking.description",
      },
      {
        icon: "memory",
        titleKey: "features.cards.memoryModes.title",
        descriptionKey: "features.cards.memoryModes.description",
      },
      {
        icon: "chat",
        titleKey: "features.cards.chatTemplates.title",
        descriptionKey: "features.cards.chatTemplates.description",
      },
      {
        icon: "arrows",
        titleKey: "features.cards.deviceSwitching.title",
        descriptionKey: "features.cards.deviceSwitching.description",
      },
      {
        icon: "rocket",
        titleKey: "features.cards.rustPerformance.title",
        descriptionKey: "features.cards.rustPerformance.description",
      },
      {
        icon: "gear",
        titleKey: "features.cards.candleML.title",
        descriptionKey: "features.cards.candleML.description",
      },
      {
        icon: "wrench",
        titleKey: "features.cards.contextManagement.title",
        descriptionKey: "features.cards.contextManagement.description",
      },
      {
        icon: "shield",
        titleKey: "features.cards.crashProtection.title",
        descriptionKey: "features.cards.crashProtection.description",
      },
      {
        icon: "file",
        titleKey: "features.cards.fileProtection.title",
        descriptionKey: "features.cards.fileProtection.description",
      },
      {
        icon: "cancel",
        titleKey: "features.cards.operationCancel.title",
        descriptionKey: "features.cards.operationCancel.description",
      },
    ];
  },

  // Render features
  renderFeatures() {
    if (!this.featuresGrid) return;

    this.featuresGrid.innerHTML = "";

    this.features.forEach((feature, index) => {
      const featureCard = this.createFeatureCard(feature, index);
      this.featuresGrid.appendChild(featureCard);
    });
  },

  // Create feature card element
  createFeatureCard(feature, index) {
    const card = document.createElement("div");
    card.className = "feature-card";
    // card.style.animationDelay = `${index * 0.1}s`; // DISABLED for static site

    const icon = this.createFeatureIcon(feature.icon);
    const title = document.createElement("h3");
    title.className = "feature-title";
    title.textContent = I18n.t(feature.titleKey);

    const description = document.createElement("p");
    description.className = "feature-description";
    description.textContent = I18n.t(feature.descriptionKey);

    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(description);

    return card;
  },

  // Create feature icon
  createFeatureIcon(iconType) {
    const iconContainer = document.createElement("div");
    iconContainer.className = "feature-icon";

    if (iconType === "qwen") {
      // Special case for Qwen icon - use SVG
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "32");
      svg.setAttribute("height", "32");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("fill", "currentColor");
      svg.style.color = "hsl(var(--accent))";

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute(
        "d",
        "M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z"
      );

      svg.appendChild(path);
      iconContainer.appendChild(svg);
    } else {
      // Use Phosphor icons for all other icons
      const icon = document.createElement("i");
      icon.className = `ph ${this.getPhosphorIcon(iconType)}`;
      icon.style.fontSize = "32px";
      icon.style.color = "hsl(var(--accent))";

      iconContainer.appendChild(icon);
    }

    return iconContainer;
  },

  // Get Phosphor icon class for icon type
  getPhosphorIcon(iconType) {
    const iconMap = {
      qwen: "ph-qwen", // Custom Qwen icon - we'll keep the SVG for this one
      text: "ph-text-aa",
      repeat: "ph-repeat",
      clock: "ph-clock",
      cpu: "ph-cpu",
      chart: "ph-chart-bar",
      memory: "ph-memory",
      chat: "ph-chat-circle",
      arrows: "ph-arrows-clockwise",
      gear: "ph-gear",
      rocket: "ph-rocket",
      wrench: "ph-wrench",
      shield: "ph-shield",
      file: "ph-file-x",
      cancel: "ph-x-circle",
    };

    return iconMap[iconType] || "ph-text-aa";
  },

  // Setup scroll animations - DISABLED
  // setupAnimations() {
  //   // Animation functionality removed for static site
  // },

  // Add hover effects - DISABLED
  // addHoverEffects() {
  //   // Hover effects removed for static site
  // },

  // Update language
  updateLanguage() {
    this.renderFeatures();
  },
};

// Export for use in other modules
window.Features = Features;
