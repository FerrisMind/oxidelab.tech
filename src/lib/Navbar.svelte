<script lang="ts">
  import { i18n } from './i18n.svelte';

  let scrolled = $state(false);
  let mobileMenuOpen = $state(false);
  
  $effect(() => {
    const handleScroll = () => {
      scrolled = window.scrollY > 20;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });
  
  const navLinks = $derived([
    { href: '#features', label: i18n.t.nav.features },
    { href: '#models', label: i18n.t.nav.models },
    { href: '#privacy', label: i18n.t.nav.privacy },
    { href: '#download', label: i18n.t.nav.download },
  ]);
</script>

<header class="navbar" class:scrolled>
  <div class="navbar-container">
    <a href="/" class="logo" aria-label="Oxide Lab Home">
      <!-- Real Oxide Lab Logo -->
      <svg class="logo-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logo-gradient" x1="434.13" y1="35.75" x2="989.28" y2="661.72" gradientUnits="userSpaceOnUse">
            <stop offset="0" stop-color="#FF7F04"/>
            <stop offset="1" stop-color="#EE2C0B"/>
          </linearGradient>
        </defs>
        <path fill="#1E88E5" d="M275.3,641.7L12,362.8v394.3c0,10.9,4,21.3,11.3,28.9l202.1,214c7.3,7.7,17,12,27.3,12h372.4L411.3,785.7L275.3,641.7L275.3,641.7z"/>
        <path fill="#1E88E5" d="M659.7,1012h229.1c3,0,6-0.1,9-0.4L715,817.1c0,0-18.4-20.7-35.3-28.6c-3.9-1.7-7.6-2.9-11-3c-18.7-0.4-158,0-223.1,0.1L659.7,1012L659.7,1012z"/>
        <path fill="url(#logo-gradient)" d="M360.4,235.8c21.5,0.4,172.9-0.1,256.5-0.1c9.4,0,18.5,3.9,24.9,10.8l84.1,89c6,6.4,9.4,14.8,9.4,23.5v435.5c0,8.7,3.3,17.1,9.3,23.5l168.9,179.6c9.7,10.3,24.7,13.6,37.8,8.3c35.5-14.4,60.7-50.9,60.7-93.5V272.1c0-11.4-4.3-22.3-11.9-30.3L795,24.5c-7.6-8-17.9-12.6-28.6-12.6H128.9l0,0c-2.2,0-3.3,2.6-1.8,4.3l183.5,194.3C310.4,210.7,341.9,235.5,360.4,235.8L360.4,235.8z"/>
        <path fill="#1E88E5" d="M275.3,607.4V226.4c0-8.8-3.4-17.2-9.4-23.5L96.6,23.7c-9.3,0.6-18.3,2.7-26.7,6.1C36,43.4,12,78.1,12,118.8v209.9L275.3,607.4z"/>
      </svg>
      <span class="logo-text">Oxide<span class="logo-accent">Lab</span></span>
    </a>
    
    <nav class="nav-links" class:open={mobileMenuOpen}>
      {#each navLinks as link}
        <a 
          href={link.href} 
          class="nav-link"
          onclick={() => mobileMenuOpen = false}
        >
          {link.label}
        </a>
      {/each}
    </nav>
    
    <div class="nav-actions">
      <div class="lang-switcher">
        <button 
          class="lang-btn" 
          class:active={i18n.currentLocale === 'en'} 
          onclick={() => i18n.setLocale('en')}
          title="English"
        >
          EN
        </button>
        <button 
          class="lang-btn" 
          class:active={i18n.currentLocale === 'ru'} 
          onclick={() => i18n.setLocale('ru')}
          title="Русский"
        >
          RU
        </button>
        <button 
          class="lang-btn" 
          class:active={i18n.currentLocale === 'pt-BR'} 
          onclick={() => i18n.setLocale('pt-BR')}
          title="Português"
        >
          PT
        </button>
      </div>

      <a 
        href="https://github.com/FerrisMind/Oxide-Lab" 
        target="_blank" 
        rel="noopener noreferrer"
        class="btn btn-ghost github-btn"
        aria-label="View on GitHub"
      >
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span class="btn-text">GitHub</span>
      </a>
      <a href="#download" class="btn btn-primary download-btn">
        {i18n.t.nav.download}
      </a>
    </div>
    
    <button 
      class="mobile-menu-btn" 
      onclick={() => mobileMenuOpen = !mobileMenuOpen}
      aria-label="Toggle menu"
      aria-expanded={mobileMenuOpen}
    >
      <span class="hamburger" class:open={mobileMenuOpen}></span>
    </button>
  </div>
</header>

<style>
  .navbar {
    position: fixed;
    top: var(--space-md);
    left: var(--space-md);
    right: var(--space-md);
    z-index: 1000;
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--radius-xl);
    background: rgba(26, 26, 46, 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid var(--color-border);
    transition: all var(--transition-normal);
  }
  
  .navbar.scrolled {
    background: rgba(26, 26, 46, 0.95);
    border-color: var(--color-muted-foreground);
    box-shadow: var(--shadow-lg);
  }
  
  .navbar-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1280px;
    margin: 0 auto;
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    color: var(--color-foreground);
    text-decoration: none;
  }
  
  .logo-icon {
    width: 36px;
    height: 36px;
  }
  
  .logo-text {
    font-family: var(--font-sans);
    font-size: 1.25rem;
    font-weight: 700;
  }
  
  .logo-accent {
    background: var(--gradient-brand);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .nav-links {
    display: flex;
    gap: var(--space-xl);
  }
  
  .nav-link {
    color: var(--color-muted-foreground);
    font-weight: 500;
    transition: color var(--transition-fast);
    position: relative;
  }
  
  .nav-link:hover {
    color: var(--color-foreground);
  }
  
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gradient-brand);
    transform: scaleX(0);
    transition: transform var(--transition-fast);
  }
  
  .nav-link:hover::after {
    transform: scaleX(1);
  }
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  
  .lang-switcher {
    display: flex;
    background: rgba(255, 255, 255, 0.05);
    padding: 2px;
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    margin-right: var(--space-sm);
  }
  
  .lang-btn {
    padding: 4px 8px;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--color-muted-foreground);
    border: none;
    background: transparent;
    border-radius: calc(var(--radius-lg) - 2px);
    cursor: pointer;
    transition: all var(--transition-fast);
  }
  
  .lang-btn:hover {
    color: var(--color-foreground);
  }
  
  .lang-btn.active {
    background: var(--color-brand-orange);
    color: white;
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
  
  .mobile-menu-btn {
    display: none;
    padding: var(--space-sm);
    background: transparent;
    border: none;
    cursor: pointer;
  }
  
  .hamburger {
    display: block;
    width: 24px;
    height: 2px;
    background: var(--color-foreground);
    position: relative;
    transition: all var(--transition-fast);
  }
  
  .hamburger::before,
  .hamburger::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background: var(--color-foreground);
    transition: all var(--transition-fast);
  }
  
  .hamburger::before {
    top: -8px;
  }
  
  .hamburger::after {
    bottom: -8px;
  }
  
  .hamburger.open {
    background: transparent;
  }
  
  .hamburger.open::before {
    top: 0;
    transform: rotate(45deg);
  }
  
  .hamburger.open::after {
    bottom: 0;
    transform: rotate(-45deg);
  }
  
  @media (max-width: 768px) {
    .navbar {
      top: var(--space-sm);
      left: var(--space-sm);
      right: var(--space-sm);
    }
    
    .nav-links {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: var(--space-md);
      padding: var(--space-lg);
      background: rgba(26, 26, 46, 0.98);
      border-radius: var(--radius-xl);
      border: 1px solid var(--color-border);
      flex-direction: column;
      gap: var(--space-lg);
    }
    
    .nav-links.open {
      display: flex;
    }
    
    .nav-actions .btn-text {
      display: none;
    }

    .github-btn {
      display: none;
    }
    
    .mobile-menu-btn {
      display: block;
    }
  }
</style>
