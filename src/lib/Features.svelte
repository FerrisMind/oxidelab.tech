<script lang="ts">
  import { i18n } from './i18n.svelte';

  const features = $derived([
    {
      icon: 'shield',
      title: i18n.t.features.items[0].title,
      description: i18n.t.features.items[0].description,
      color: '#10B981'
    },
    {
      icon: 'cpu',
      title: i18n.t.features.items[1].title,
      description: i18n.t.features.items[1].description,
      color: '#1E88E5'
    },
    {
      icon: 'layers',
      title: i18n.t.features.items[2].title,
      description: i18n.t.features.items[2].description,
      color: '#8B5CF6'
    },
    {
      icon: 'zap',
      title: i18n.t.features.items[3].title,
      description: i18n.t.features.items[3].description,
      color: '#FF7F04'
    },
    {
      icon: 'globe',
      title: i18n.t.features.items[4].title,
      description: i18n.t.features.items[4].description,
      color: '#22D3EE'
    },
    {
      icon: 'code',
      title: i18n.t.features.items[5].title,
      description: i18n.t.features.items[5].description,
      color: '#EE2C0B'
    }
  ]);
</script>

<section class="features" id="features">
  <div class="container">
    <div class="section-header">
      <span class="section-label">{i18n.t.features.label}</span>
      <h2>{i18n.t.features.title}<br/><span class="glow-text">{i18n.t.features.titleGlow}</span></h2>
      <p class="section-description">
        {i18n.t.features.description}
      </p>
    </div>
    
    <div class="features-grid">
      {#each features as feature}
        <div class="feature-card">
          <div class="feature-icon" style="--icon-color: {feature.color}">
            {#if feature.icon === 'shield'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            {:else if feature.icon === 'cpu'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="4" y="4" width="16" height="16" rx="2"/>
                <rect x="9" y="9" width="6" height="6"/>
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
              </svg>
            {:else if feature.icon === 'layers'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                <polyline points="2 17 12 22 22 17"/>
                <polyline points="2 12 12 17 22 12"/>
              </svg>
            {:else if feature.icon === 'zap'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            {:else if feature.icon === 'globe'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            {:else if feature.icon === 'code'}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            {/if}
          </div>
          <h3 class="feature-title">{feature.title}</h3>
          <p class="feature-description">{feature.description}</p>
        </div>
      {/each}
    </div>
    
    <div class="tech-stack">
      <p class="tech-label">{i18n.t.features.techStack}</p>
      <div class="tech-icons">
        <a href="https://www.rust-lang.org/" target="_blank" rel="noopener noreferrer" class="tech-item" title="Rust">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" alt="Rust" class="tech-img" />
          <span>Rust</span>
        </a>
        <a href="https://tauri.app/" target="_blank" rel="noopener noreferrer" class="tech-item" title="Tauri">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tauri/tauri-original.svg" alt="Tauri" class="tech-img" />
          <span>Tauri v2</span>
        </a>
        <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer" class="tech-item" title="Svelte">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" alt="Svelte" class="tech-img" />
          <span>Svelte 5</span>
        </a>
        <a href="https://github.com/huggingface/candle" target="_blank" rel="noopener noreferrer" class="tech-item" title="Candle">
          <img src="https://unpkg.com/@lobehub/icons-static-svg@latest/icons/huggingface-color.svg" alt="Candle" class="tech-img" />
          <span>Candle</span>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .features {
    position: relative;
    background: linear-gradient(180deg, var(--color-background) 0%, #12121f 50%, var(--color-background) 100%);
  }
  
  .section-header {
    text-align: center;
    margin-bottom: var(--space-3xl);
  }
  
  .section-label {
    display: inline-block;
    font-family: var(--font-sans);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-brand-orange);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: var(--space-md);
  }
  
  .section-header h2 {
    margin-bottom: var(--space-lg);
  }
  
  .section-description {
    font-size: 1.125rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl);
    margin-bottom: var(--space-4xl);
  }
  
  .feature-card {
    background: rgba(30, 30, 54, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: var(--space-2xl);
    transition: all var(--transition-normal);
    cursor: pointer;
  }
  
  .feature-card:hover {
    transform: translateY(-4px);
    border-color: var(--color-brand-orange);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
  
  .feature-icon {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--space-lg);
    color: var(--icon-color);
  }
  
  .feature-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .feature-title {
    font-size: 1.25rem;
    margin-bottom: var(--space-sm);
    color: var(--color-foreground);
  }
  
  .feature-description {
    font-size: 0.95rem;
    line-height: 1.7;
  }
  
  .tech-stack {
    text-align: center;
  }
  
  .tech-label {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
    margin-bottom: var(--space-lg);
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .tech-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2xl);
    flex-wrap: wrap;
  }
  
  .tech-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-md);
    color: var(--color-muted-foreground);
    text-decoration: none;
    transition: all var(--transition-fast);
    cursor: pointer;
  }
  
  .tech-item:hover {
    color: var(--color-foreground);
  }
  
  .tech-item img {
    width: 40px;
    height: 40px;
    opacity: 0.7;
    transition: opacity var(--transition-fast);
  }
  
  .tech-item:hover img {
    opacity: 1;
  }
  
  .tech-img {
    width: 40px;
    height: 40px;
    opacity: 0.7;
    transition: opacity var(--transition-fast);
  }
  
  .tech-item:hover .tech-img {
    opacity: 1;
  }
  
  .tech-item span {
    font-size: 0.875rem;
    font-weight: 500;
  }
  
  @media (max-width: 1024px) {
    .features-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  @media (max-width: 640px) {
    .features-grid {
      grid-template-columns: 1fr;
    }
    
    .tech-icons {
      gap: var(--space-xl);
    }
  }
</style>
