<script lang="ts">
  import { i18n } from './i18n.svelte';

  const currentYear = new Date().getFullYear();
  
  const links = $derived({
    product: [
      { label: i18n.t.nav.features, href: '#features' },
      { label: i18n.t.nav.models, href: '#models' },
      { label: i18n.t.nav.privacy, href: '#privacy' },
      { label: i18n.t.nav.download, href: '#download' }
    ],
    resources: [
      { label: 'Documentation', href: 'https://github.com/FerrisMind/Oxide-Lab#readme' },
      { label: 'GitHub', href: 'https://github.com/FerrisMind/Oxide-Lab' },
      { label: 'Releases', href: 'https://github.com/FerrisMind/Oxide-Lab/releases' },
      { label: 'Issues', href: 'https://github.com/FerrisMind/Oxide-Lab/issues' }
    ],
    legal: [
      { label: 'License (Apache-2.0)', href: 'https://github.com/FerrisMind/Oxide-Lab/blob/main/LICENSE' },
      { label: 'Third Party Licenses', href: 'https://github.com/FerrisMind/Oxide-Lab/blob/main/THIRD_PARTY_LICENSES.md' }
    ]
  });
</script>

<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo" aria-label="Oxide Lab Home">
          <!-- Real Oxide Lab Logo -->
          <svg class="logo-icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="footer-logo-gradient" x1="434.13" y1="35.75" x2="989.28" y2="661.72" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#FF7F04"/>
                <stop offset="1" stop-color="#EE2C0B"/>
              </linearGradient>
            </defs>
            <path fill="#1E88E5" d="M275.3,641.7L12,362.8v394.3c0,10.9,4,21.3,11.3,28.9l202.1,214c7.3,7.7,17,12,27.3,12h372.4L411.3,785.7L275.3,641.7L275.3,641.7z"/>
            <path fill="#1E88E5" d="M659.7,1012h229.1c3,0,6-0.1,9-0.4L715,817.1c0,0-18.4-20.7-35.3-28.6c-3.9-1.7-7.6-2.9-11-3c-18.7-0.4-158,0-223.1,0.1L659.7,1012L659.7,1012z"/>
            <path fill="url(#footer-logo-gradient)" d="M360.4,235.8c21.5,0.4,172.9-0.1,256.5-0.1c9.4,0,18.5,3.9,24.9,10.8l84.1,89c6,6.4,9.4,14.8,9.4,23.5v435.5c0,8.7,3.3,17.1,9.3,23.5l168.9,179.6c9.7,10.3,24.7,13.6,37.8,8.3c35.5-14.4,60.7-50.9,60.7-93.5V272.1c0-11.4-4.3-22.3-11.9-30.3L795,24.5c-7.6-8-17.9-12.6-28.6-12.6H128.9l0,0c-2.2,0-3.3,2.6-1.8,4.3l183.5,194.3C310.4,210.7,341.9,235.5,360.4,235.8L360.4,235.8z"/>
            <path fill="#1E88E5" d="M275.3,607.4V226.4c0-8.8-3.4-17.2-9.4-23.5L96.6,23.7c-9.3,0.6-18.3,2.7-26.7,6.1C36,43.4,12,78.1,12,118.8v209.9L275.3,607.4z"/>
          </svg>
          <span class="logo-text">Oxide<span class="logo-accent">Lab</span></span>
        </a>
        <p class="brand-description">
          {i18n.t.footer.description}
        </p>
        <div class="social-links">
          <a 
            href="https://github.com/FerrisMind/Oxide-Lab" 
            target="_blank" 
            rel="noopener noreferrer"
            class="social-link"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
      
      <div class="footer-links">
        <div class="link-group">
          <h4>{i18n.t.footer.product}</h4>
          <ul>
            {#each links.product as link}
              <li>
                <a href={link.href}>{link.label}</a>
              </li>
            {/each}
          </ul>
        </div>
        
        <div class="link-group">
          <h4>{i18n.t.footer.resources}</h4>
          <ul>
            {#each links.resources as link}
              <li>
                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
              </li>
            {/each}
          </ul>
        </div>
        
        <div class="link-group">
          <h4>{i18n.t.footer.legal}</h4>
          <ul>
            {#each links.legal as link}
              <li>
                <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p class="copyright">
        © {currentYear} FerrisMind. {i18n.t.footer.license}
      </p>
      <p class="credits">
        {i18n.t.footer.builtWith} 
        <a href="https://www.rust-lang.org/" target="_blank" rel="noopener noreferrer">Rust</a>, 
        <a href="https://tauri.app/" target="_blank" rel="noopener noreferrer">Tauri</a>, and 
        <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer">Svelte</a>
      </p>
    </div>
  </div>
</footer>

<style>
  .footer {
    background: #0f0f1a;
    border-top: 1px solid var(--color-border);
    padding: var(--space-4xl) 0 var(--space-2xl);
  }
  
  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 2fr;
    gap: var(--space-4xl);
    margin-bottom: var(--space-3xl);
  }
  
  .logo {
    display: inline-flex;
    align-items: center;
    gap: var(--space-sm);
    color: var(--color-foreground);
    text-decoration: none;
    margin-bottom: var(--space-lg);
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
  
  .brand-description {
    font-size: 0.95rem;
    max-width: 300px;
    margin-bottom: var(--space-lg);
  }
  
  .social-links {
    display: flex;
    gap: var(--space-md);
  }
  
  .social-link {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-muted-foreground);
    transition: all var(--transition-fast);
    cursor: pointer;
  }
  
  .social-link:hover {
    color: var(--color-brand-orange);
  }
  
  .social-link svg {
    width: 100%;
    height: 100%;
  }
  
  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl);
  }
  
  .link-group h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-foreground);
    margin-bottom: var(--space-lg);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .link-group ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
  
  .link-group a {
    color: var(--color-muted-foreground);
    font-size: 0.95rem;
    transition: color var(--transition-fast);
  }
  
  .link-group a:hover {
    color: var(--color-brand-orange);
  }
  
  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: var(--space-xl);
    border-top: 1px solid var(--color-border);
  }
  
  .copyright,
  .credits {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
  }
  
  .credits a {
    color: var(--color-muted-foreground);
    transition: color var(--transition-fast);
  }
  
  .credits a:hover {
    color: var(--color-brand-orange);
  }
  
  @media (max-width: 1024px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: var(--space-3xl);
    }
    
    .footer-links {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (max-width: 640px) {
    .footer-links {
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
    }
    
    .footer-bottom {
      flex-direction: column;
      gap: var(--space-md);
      text-align: center;
    }
  }
</style>
