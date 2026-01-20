<script lang="ts">
  import { i18n } from './i18n.svelte';

  const privacyFeatures = $derived([
    {
      title: i18n.t.privacy.features[0].title,
      description: i18n.t.privacy.features[0].description,
      icon: 'eye-off'
    },
    {
      title: i18n.t.privacy.features[1].title,
      description: i18n.t.privacy.features[1].description,
      icon: 'wifi-off'
    },
    {
      title: i18n.t.privacy.features[2].title,
      description: i18n.t.privacy.features[2].description,
      icon: 'database'
    },
    {
      title: i18n.t.privacy.features[3].title,
      description: i18n.t.privacy.features[3].description,
      icon: 'lock'
    }
  ]);
</script>

<section class="privacy" id="privacy">
  <div class="container">
    <div class="privacy-layout">
      <div class="privacy-content">
        <span class="section-label">{i18n.t.privacy.label}</span>
        <h2>{i18n.t.privacy.title}<br/><span class="glow-text">{i18n.t.privacy.titleGlow}</span></h2>
        <p class="privacy-description">
          {i18n.t.privacy.description}
        </p>
        
        <div class="privacy-features">
          {#each privacyFeatures as feature}
            <div class="privacy-feature">
              <div class="feature-icon">
                {#if feature.icon === 'eye-off'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                {:else if feature.icon === 'wifi-off'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="1" y1="1" x2="23" y2="23"/>
                    <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
                    <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
                    <path d="M10.71 5.05A16 16 0 0 1 22.58 9"/>
                    <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                    <line x1="12" y1="20" x2="12.01" y2="20"/>
                  </svg>
                {:else if feature.icon === 'database'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                {:else if feature.icon === 'lock'}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                {/if}
              </div>
              <div class="feature-text">
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="privacy-visual">
        <div class="shield-container">
          <div class="shield-glow"></div>
          <div class="shield">
            <!-- Real Oxide Lab Logo as shield -->
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="privacy-logo-gradient" x1="434.13" y1="35.75" x2="989.28" y2="661.72" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stop-color="#FF7F04"/>
                  <stop offset="1" stop-color="#EE2C0B"/>
                </linearGradient>
              </defs>
              <path fill="#1E88E5" d="M275.3,641.7L12,362.8v394.3c0,10.9,4,21.3,11.3,28.9l202.1,214c7.3,7.7,17,12,27.3,12h372.4L411.3,785.7L275.3,641.7L275.3,641.7z"/>
              <path fill="#1E88E5" d="M659.7,1012h229.1c3,0,6-0.1,9-0.4L715,817.1c0,0-18.4-20.7-35.3-28.6c-3.9-1.7-7.6-2.9-11-3c-18.7-0.4-158,0-223.1,0.1L659.7,1012L659.7,1012z"/>
              <path fill="url(#privacy-logo-gradient)" d="M360.4,235.8c21.5,0.4,172.9-0.1,256.5-0.1c9.4,0,18.5,3.9,24.9,10.8l84.1,89c6,6.4,9.4,14.8,9.4,23.5v435.5c0,8.7,3.3,17.1,9.3,23.5l168.9,179.6c9.7,10.3,24.7,13.6,37.8,8.3c35.5-14.4,60.7-50.9,60.7-93.5V272.1c0-11.4-4.3-22.3-11.9-30.3L795,24.5c-7.6-8-17.9-12.6-28.6-12.6H128.9l0,0c-2.2,0-3.3,2.6-1.8,4.3l183.5,194.3C310.4,210.7,341.9,235.5,360.4,235.8L360.4,235.8z"/>
              <path fill="#1E88E5" d="M275.3,607.4V226.4c0-8.8-3.4-17.2-9.4-23.5L96.6,23.7c-9.3,0.6-18.3,2.7-26.7,6.1C36,43.4,12,78.1,12,118.8v209.9L275.3,607.4z"/>
            </svg>
          </div>
          <div class="orbit orbit-1">
            <div class="orbit-dot"></div>
          </div>
          <div class="orbit orbit-2">
            <div class="orbit-dot"></div>
          </div>
          <div class="orbit orbit-3">
            <div class="orbit-dot"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .privacy {
    position: relative;
    background: linear-gradient(180deg, #12121f 0%, var(--color-background) 100%);
    overflow: hidden;
  }
  
  .privacy-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4xl);
    align-items: center;
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
  
  .privacy-content h2 {
    margin-bottom: var(--space-lg);
  }
  
  .privacy-description {
    font-size: 1.125rem;
    margin-bottom: var(--space-2xl);
    line-height: 1.7;
  }
  
  .privacy-features {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }
  
  .privacy-feature {
    display: flex;
    gap: var(--space-lg);
    align-items: flex-start;
    cursor: pointer;
    padding: var(--space-md);
    margin: calc(-1 * var(--space-md));
    border-radius: var(--radius-lg);
    transition: all var(--transition-normal);
  }
  
  .privacy-feature:hover {
    background: rgba(255, 255, 255, 0.02);
  }
  
  .feature-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-success);
    flex-shrink: 0;
  }
  
  .feature-icon svg {
    width: 24px;
    height: 24px;
  }
  
  .feature-text h4 {
    font-size: 1.1rem;
    color: var(--color-foreground);
    margin-bottom: var(--space-xs);
  }
  
  .feature-text p {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  .privacy-visual {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  
  .shield-container {
    position: relative;
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .shield-glow {
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(238, 44, 11, 0.25) 0%, transparent 70%);
    border-radius: 50%;
    animation: pulse-glow 3s ease-in-out infinite;
  }
  
  .shield {
    position: relative;
    width: 120px;
    height: 120px;
    z-index: 1;
    filter: drop-shadow(0 0 30px rgba(238, 44, 11, 0.4));
  }
  
  .shield svg {
    width: 100%;
    height: 100%;
  }
  
  .orbit {
    position: absolute;
    border: 1px dashed var(--color-border);
    border-radius: 50%;
    animation: rotate 20s linear infinite;
  }
  
  .orbit-1 {
    width: 180px;
    height: 180px;
    animation-duration: 15s;
  }
  
  .orbit-2 {
    width: 240px;
    height: 240px;
    animation-duration: 20s;
    animation-direction: reverse;
  }
  
  .orbit-3 {
    width: 300px;
    height: 300px;
    animation-duration: 25s;
  }
  
  .orbit-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    background: var(--color-brand-orange);
    border-radius: 50%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px var(--color-brand-orange);
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (max-width: 1024px) {
    .privacy-layout {
      grid-template-columns: 1fr;
      gap: var(--space-3xl);
    }
    
    .privacy-visual {
      order: -1;
    }
    
    .privacy-content {
      text-align: center;
    }
    
    .privacy-features {
      text-align: left;
    }
  }
</style>
