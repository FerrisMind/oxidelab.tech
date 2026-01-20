<script lang="ts">
  import { i18n } from './i18n.svelte';

  let visible = $state(false);
  
  $effect(() => {
    const timer = setTimeout(() => {
      visible = true;
    }, 100);
    return () => clearTimeout(timer);
  });
</script>

<section class="hero" id="hero">
  <div class="hero-background">
    <div class="gradient-orb orb-1"></div>
    <div class="gradient-orb orb-2"></div>
    <div class="gradient-orb orb-3"></div>
    <div class="grid-pattern"></div>
  </div>
  
  <div class="container hero-content" class:visible>
    <div class="badge">
      <span class="badge-dot"></span>
      {i18n.t.hero.badge}
    </div>
    
    <h1 class="hero-title">
      {i18n.t.hero.title}<br/>
      <span class="glow-text">{i18n.t.hero.titleGlow}</span>
    </h1>
    
    <p class="hero-description">
      {i18n.t.hero.description}
    </p>
    
    <div class="hero-actions">
      <a href="#download" class="btn btn-primary btn-lg">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        {i18n.t.hero.ctaDownload}
      </a>
      <a href="https://github.com/FerrisMind/Oxide-Lab" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-lg">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        {i18n.t.hero.ctaGithub}
      </a>
    </div>
    
    <div class="hero-stats">
      <div class="stat">
        <span class="stat-value">100%</span>
        <span class="stat-label">{i18n.t.hero.statLocal}</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="stat-value">10+</span>
        <span class="stat-label">{i18n.t.hero.statModels}</span>
      </div>
      <div class="stat-divider"></div>
      <div class="stat">
        <span class="stat-value">0</span>
        <span class="stat-label">{i18n.t.hero.statCloud}</span>
      </div>
    </div>
  </div>
  
  <div class="hero-image-wrapper" class:visible>
    <div class="hero-image-glow"></div>
    <div class="hero-image">
      <div class="app-window">
        <div class="window-preview">
          <img 
            src="https://raw.githubusercontent.com/FerrisMind/Oxide-Lab/main/.github/assets/screenshots/chat-dark.png" 
            alt="Oxide Lab Interface" 
            class="app-screenshot"
          />
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: calc(80px + var(--space-3xl)) var(--space-lg) var(--space-3xl);
    overflow: hidden;
  }
  
  .hero-background {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }
  
  .gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.5;
  }
  
  .orb-1 {
    width: 600px;
    height: 600px;
    background: rgba(238, 44, 11, 0.25);
    top: -200px;
    right: -100px;
    animation: float 8s ease-in-out infinite;
  }
  
  .orb-2 {
    width: 400px;
    height: 400px;
    background: rgba(30, 136, 229, 0.2);
    bottom: -100px;
    left: -100px;
    animation: float 10s ease-in-out infinite reverse;
  }
  
  .orb-3 {
    width: 300px;
    height: 300px;
    background: rgba(255, 127, 4, 0.15);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: float 12s ease-in-out infinite;
  }
  
  .grid-pattern {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(238, 44, 11, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(238, 44, 11, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }
  
  .hero-content {
    text-align: center;
    z-index: 1;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .hero-content.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    margin-bottom: var(--space-xl);
  }
  
  .badge-dot {
    width: 8px;
    height: 8px;
    background: var(--color-success);
    border-radius: 50%;
    animation: pulse-glow 2s ease-in-out infinite;
  }
  
  .hero-title {
    margin-bottom: var(--space-lg);
    line-height: 1.1;
  }
  
  .hero-description {
    font-size: 1.25rem;
    max-width: 600px;
    margin: 0 auto var(--space-2xl);
    line-height: 1.7;
  }
  
  .hero-actions {
    display: flex;
    gap: var(--space-md);
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: var(--space-3xl);
  }
  
  .btn-lg {
    padding: var(--space-lg) var(--space-2xl);
    font-size: 1.1rem;
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
  
  .hero-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-xl);
    flex-wrap: wrap;
  }
  
  .stat {
    text-align: center;
  }
  
  .stat-value {
    display: block;
    font-family: var(--font-sans);
    font-size: 2rem;
    font-weight: 800;
    color: var(--color-foreground);
    line-height: 1;
  }
  
  .stat-label {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
  }
  
  .stat-divider {
    width: 1px;
    height: 40px;
    background: var(--color-border);
  }
  
  .hero-image-wrapper {
    position: relative;
    margin-top: var(--space-3xl);
    z-index: 1;
    opacity: 0;
    transform: translateY(50px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
  }
  
  .hero-image-wrapper.visible {
    opacity: 1;
    transform: translateY(0);
  }
  
  .hero-image-glow {
    position: absolute;
    inset: -50px;
    background: radial-gradient(ellipse at center, rgba(238, 44, 11, 0.2) 0%, transparent 70%);
    pointer-events: none;
  }
  
  .hero-image {
    position: relative;
  }
  
  .app-window {
    background: rgba(26, 26, 46, 0.95);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-2xl);
    overflow: hidden;
    box-shadow: var(--shadow-xl), 0 0 80px rgba(238, 44, 11, 0.15);
    max-width: 1128px;
    width: 90vw;
  }
  
  .window-preview {
    background: #0f0f1a;
    line-height: 0;
  }
  
  .app-screenshot {
    width: 100%;
    height: auto;
    display: block;
  }
  
  @keyframes blink {
    50% { opacity: 0; }
  }
  
  @media (max-width: 768px) {
    .hero {
      padding-top: calc(60px + var(--space-2xl));
    }
    
    .hero-description {
      font-size: 1.1rem;
    }
    
    .hero-actions {
      flex-direction: column;
      align-items: center;
    }
    
    .btn-lg {
      width: 100%;
      max-width: 300px;
    }
    
    .stat-divider {
      display: none;
    }
    
    .hero-stats {
      gap: var(--space-2xl);
    }
  }
</style>
