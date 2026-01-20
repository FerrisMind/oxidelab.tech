<script lang="ts">
  import { i18n } from './i18n.svelte';

  // Real download links from GitHub Releases
  const GITHUB_RELEASES_URL = 'https://github.com/FerrisMind/Oxide-Lab/releases';
  const LATEST_VERSION = '0.10.23';
  
  const downloads = $derived([
    {
      platform: 'Windows',
      icon: 'windows',
      versions: [
        { 
          type: 'Latest Release', 
          size: LATEST_VERSION, 
          link: GITHUB_RELEASES_URL,
          description: i18n.t.download.cpuLink // "Works on any Windows system" is still relevant as a general note
        }
      ]
    },
    {
      platform: 'macOS',
      icon: 'apple',
      versions: [
        { 
          type: 'Metal', 
          size: 'Coming Soon', 
          link: GITHUB_RELEASES_URL,
          badge: 'Apple Silicon',
          description: i18n.t.download.metalDesc,
          disabled: true
        }
      ],
      comingSoon: true
    },
    {
      platform: 'Linux',
      icon: 'linux',
      versions: [
        { 
          type: 'CPU/GPU', 
          size: 'Coming Soon', 
          link: GITHUB_RELEASES_URL,
          description: i18n.t.download.linuxDesc,
          disabled: true
        }
      ],
      comingSoon: true
    }
  ]);
  
  const requirementsList = $derived([
    { label: i18n.t.download.ramLabel, value: i18n.t.download.ramValue, icon: 'memory' },
    { label: i18n.t.download.storageLabel, value: i18n.t.download.storageValue, icon: 'storage' },
    { label: i18n.t.download.gpuLabel, value: i18n.t.download.gpuValue, icon: 'gpu' }
  ]);

  interface DownloadVersion {
    type: string;
    size: string;
    link: string;
    description: string;
    badge?: string;
    disabled?: boolean;
  }

  interface DownloadPlatform {
    platform: string;
    icon: string;
    versions: DownloadVersion[];
    comingSoon?: boolean;
  }

</script>

<section class="download" id="download">
  <div class="container">
    <div class="section-header">
      <span class="section-label">{i18n.t.download.label}</span>
      <h2>{i18n.t.download.title}<br/><span class="glow-text">{i18n.t.download.titleGlow}</span></h2>
      <p class="section-description">
        {i18n.t.download.description.replace('{version}', LATEST_VERSION)}
      </p>
    </div>
    
    <div class="download-grid">
      {#each downloads as platform}
        <div class="download-card" class:coming-soon={platform.comingSoon}>
          <div class="platform-header">
            <div class="platform-icon">
              {#if platform.icon === 'windows'}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                </svg>
              {:else if platform.icon === 'apple'}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              {:else if platform.icon === 'linux'}
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139z"/>
                </svg>
              {/if}
            </div>
            <div class="platform-info">
              <h3 class="platform-name">{platform.platform}</h3>
              {#if platform.comingSoon}
                <span class="coming-soon-badge">Coming Soon</span>
              {/if}
            </div>
          </div>
          
          <div class="version-list">
            {#each platform.versions as version}
              <a 
                href={version.link} 
                class="version-item"
                class:disabled={(version as DownloadVersion).disabled}
                target={(version as DownloadVersion).disabled ? undefined : "_blank"}
                rel={(version as DownloadVersion).disabled ? undefined : "noopener noreferrer"}
              >
                <div class="version-info">
                  <span class="version-type">{version.type}</span>
                  {#if (version as DownloadVersion).badge}
                    <span class="version-badge">{(version as DownloadVersion).badge}</span>
                  {/if}
                </div>
                <div class="version-meta">
                  <span class="version-size">{version.size}</span>
                  {#if !(version as DownloadVersion).disabled}
                    <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  {/if}
                </div>
              </a>
              {#if version.description}
                <p class="version-description">{version.description}</p>
              {/if}
            {/each}
          </div>
        </div>
      {/each}
    </div>
    
    <div class="smartscreen-warning">
      <div class="warning-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      </div>
      <div class="warning-content">
        {@html i18n.t.download.smartscreenWarning.replace('More Info → Run Anyway', '<em>More Info → Run Anyway</em>')}
      </div>
    </div>
    
    <div class="requirements">
      <h3 class="requirements-title">{i18n.t.download.requirements}</h3>
      <div class="requirements-grid">
        {#each requirementsList as req}
          <div class="requirement-item">
            <div class="requirement-icon">
              {#if req.icon === 'memory'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="6" width="20" height="12" rx="2"/>
                  <path d="M6 12h.01M10 12h.01M14 12h.01M18 12h.01"/>
                </svg>
              {:else if req.icon === 'storage'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/>
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                </svg>
              {:else if req.icon === 'gpu'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="4" y="4" width="16" height="16" rx="2"/>
                  <rect x="9" y="9" width="6" height="6"/>
                  <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
                </svg>
              {/if}
            </div>
            <div class="requirement-text">
              <span class="requirement-label">{req.label}</span>
              <span class="requirement-value">{req.value}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
    
    <div class="build-notice">
      <p>
        {@html i18n.t.download.buildNotice.replace('GitHub repository', '<a href="https://github.com/FerrisMind/Oxide-Lab#readme" target="_blank" rel="noopener noreferrer">GitHub repository</a>')}
      </p>
    </div>
  </div>
</section>

<style>
  .download {
    position: relative;
    background: linear-gradient(180deg, var(--color-background) 0%, #12121f 100%);
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
  
  .download-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-xl);
    margin-bottom: var(--space-2xl);
  }
  
  .download-card {
    background: rgba(30, 30, 54, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
    transition: all var(--transition-normal);
  }
  
  .download-card:not(.coming-soon):hover {
    border-color: var(--color-brand-orange);
    box-shadow: 0 0 30px rgba(238, 44, 11, 0.15);
  }
  
  .download-card.coming-soon {
    opacity: 0.7;
  }
  
  .platform-header {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-bottom: var(--space-xl);
    padding-bottom: var(--space-lg);
    border-bottom: 1px solid var(--color-border);
  }
  
  .platform-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-brand-orange);
  }
  
  .platform-icon svg {
    width: 24px;
    height: 24px;
  }
  
  .platform-info {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);
  }
  
  .platform-name {
    font-size: 1.25rem;
    color: var(--color-foreground);
  }
  
  .coming-soon-badge {
    font-size: 0.7rem;
    padding: 2px 8px;
    background: var(--color-muted);
    color: var(--color-muted-foreground);
    border-radius: var(--radius-full);
    font-weight: 600;
    width: fit-content;
  }
  
  .version-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
  }
  
  .version-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--space-md) var(--space-lg);
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    color: var(--color-foreground);
    text-decoration: none;
    transition: all var(--transition-fast);
    cursor: pointer;
  }
  
  .version-item:not(.disabled):hover {
    background: rgba(238, 44, 11, 0.1);
    border-color: var(--color-brand-orange);
    color: var(--color-foreground);
  }
  
  .version-item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .version-info {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
  
  .version-type {
    font-weight: 600;
  }
  
  .version-badge {
    font-size: 0.65rem;
    padding: 2px 6px;
    background: var(--color-brand-blue);
    color: white;
    border-radius: var(--radius-sm);
    font-weight: 600;
  }
  
  .version-meta {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }
  
  .version-size {
    font-size: 0.875rem;
    color: var(--color-muted-foreground);
  }
  
  .download-icon {
    width: 20px;
    height: 20px;
    color: var(--color-brand-orange);
  }
  
  .version-description {
    font-size: 0.8rem;
    color: var(--color-muted-foreground);
    margin-left: var(--space-lg);
    margin-bottom: var(--space-sm);
  }
  
  .smartscreen-warning {
    display: flex;
    align-items: flex-start;
    gap: var(--space-md);
    padding: var(--space-lg);
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-3xl);
  }
  
  .warning-icon {
    width: 24px;
    height: 24px;
    color: var(--color-warning);
    flex-shrink: 0;
  }
  
  .warning-icon svg {
    width: 100%;
    height: 100%;
  }
  
  .warning-content {
    font-size: 0.9rem;
    color: var(--color-foreground);
    line-height: 1.6;
  }
  
  .warning-content :global(strong) {
    color: var(--color-warning);
  }
  
  .requirements {
    max-width: 900px;
    margin: 0 auto var(--space-2xl);
    text-align: center;
  }
  
  .requirements-title {
    font-size: 1.25rem;
    margin-bottom: var(--space-xl);
    color: var(--color-foreground);
  }
  
  .requirements-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-lg);
  }
  
  .requirement-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    background: rgba(30, 30, 54, 0.6);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    text-align: left;
    border: 1px solid var(--color-border);
  }
  
  .requirement-icon {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-brand-orange);
    flex-shrink: 0;
  }
  
  .requirement-icon svg {
    width: 100%;
    height: 100%;
  }
  
  .requirement-text {
    display: flex;
    flex-direction: column;
  }
  
  .requirement-label {
    font-weight: 600;
    color: var(--color-foreground);
    margin-bottom: 2px;
  }
  
  .requirement-value {
    font-size: 0.85rem;
    color: var(--color-muted-foreground);
  }
  
  .build-notice {
    text-align: center;
    padding: var(--space-xl);
    background: rgba(30, 30, 54, 0.4);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
  }
  
  .build-notice p {
    color: var(--color-muted-foreground);
  }
  
  .build-notice :global(a) {
    color: var(--color-brand-orange);
    text-decoration: underline;
  }
  
  @media (max-width: 1024px) {
    .download-grid {
      grid-template-columns: 1fr;
      max-width: 450px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .requirements-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
