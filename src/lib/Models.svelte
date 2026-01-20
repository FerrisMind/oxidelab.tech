<script lang="ts">
  // Model families with real icons from @lobehub/icons-static-svg
  // Icons loaded via CDN: https://unpkg.com/@lobehub/icons-static-svg@latest/icons/
  const modelFamilies = [
    {
      name: 'Llama',
      versions: ['Llama 1', 'Llama 2', 'Llama 3', 'CodeLlama'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/meta-color.svg',
      color: '#0668E1'
    },
    {
      name: 'Qwen',
      versions: ['Qwen2', 'Qwen2.5', 'Qwen3'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/qwen-color.svg',
      color: '#615EFC'
    },
    {
      name: 'Mistral',
      versions: ['Mistral 7B', 'Mixtral 8x7B', 'Codestral'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/mistral-color.svg',
      color: '#FF7000'
    },
    {
      name: 'DeepSeek',
      versions: ['DeepSeek Coder', 'DeepSeek LLM', 'DeepSeek V2'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/deepseek-color.svg',
      color: '#4D6BFE'
    },
    {
      name: 'Yi',
      versions: ['Yi-6B', 'Yi-34B', 'Yi-1.5'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/yi-color.svg',
      color: '#0A84FF'
    },
    {
      name: 'Gemma',
      versions: ['Gemma', 'Gemma 2', 'Gemma 3'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/gemma-color.svg',
      color: '#8E75B2'
    },
    {
      name: 'Phi',
      versions: ['Phi-2', 'Phi-3', 'Phi-3.5'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/microsoft-color.svg',
      color: '#0078D4'
    },
    {
      name: 'SmolLM',
      versions: ['SmolLM2'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/huggingface.svg',
      color: '#FFD21E'
    }
  ];
  
  const formats = [
    {
      name: 'GGUF',
      description: 'Quantized models for efficient inference. Recommended for most users.',
      badge: 'Recommended',
      iconUrl: 'https://raw.githubusercontent.com/ggml-org/media/master/logo/ggml-logo.svg'
    },
    {
      name: 'SafeTensors',
      description: 'Full precision models from HuggingFace. Best quality, more VRAM required.',
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/huggingface-color.svg'
    }
  ];
</script>

<section class="models" id="models">
  <div class="container">
    <div class="section-header">
      <span class="section-label">Supported Models</span>
      <h2>Run Any Model<br/><span class="glow-text">You Want</span></h2>
      <p class="section-description">
        Download models from Hugging Face and load them directly.<br/>
        Full support for the most popular open-source LLMs.
      </p>
    </div>
    
    <div class="models-content">
      <div class="model-families">
        {#each modelFamilies as family}
          <div class="model-family-card">
            <div class="family-header">
              <span class="family-icon">
                <img 
                  src={family.iconUrl} 
                  alt="{family.name} icon" 
                  class="model-icon-img"
                  loading="lazy"
                />
              </span>
              <h3 class="family-name">{family.name}</h3>
            </div>
            <div class="family-versions">
              {#each family.versions as version}
                <span class="version-tag">{version}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
      
      <div class="formats-section">
        <h3 class="formats-title">Supported Formats</h3>
        <div class="formats-grid">
          {#each formats as format}
            <div class="format-card">
              <div class="format-header">
                <div class="format-icon">
                  <img 
                    src={format.iconUrl} 
                    alt="{format.name} icon" 
                    class="format-icon-img"
                    loading="lazy"
                  />
                </div>
                <div class="format-info">
                  <span class="format-name">{format.name}</span>
                  {#if format.badge}
                    <span class="format-badge">{format.badge}</span>
                  {/if}
                </div>
              </div>
              <p class="format-description">{format.description}</p>
            </div>
          {/each}
        </div>
      </div>
      
      <div class="huggingface-cta">
        <a href="https://huggingface.co/models?library=gguf" target="_blank" rel="noopener noreferrer" class="hf-link">
          <img 
            src="https://unpkg.com/@lobehub/icons-static-svg@latest/icons/huggingface-color.svg" 
            alt="Hugging Face" 
            class="hf-icon"
          />
          <span>Browse Models on Hugging Face</span>
          <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .models {
    position: relative;
    background: var(--color-background);
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
  
  .models-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-3xl);
  }
  
  .model-families {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-lg);
  }
  
  .model-family-card {
    background: rgba(30, 30, 54, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: var(--space-xl);
    transition: all var(--transition-normal);
    cursor: pointer;
  }
  
  .model-family-card:hover {
    transform: translateY(-4px);
    border-color: var(--color-brand-orange);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
  
  .family-header {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-bottom: var(--space-lg);
  }
  
  .family-icon {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .model-icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .family-name {
    font-size: 1.1rem;
    color: var(--color-foreground);
  }
  
  .family-versions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-xs);
  }
  
  .version-tag {
    font-size: 0.75rem;
    padding: var(--space-xs) var(--space-sm);
    background: rgba(255, 255, 255, 0.05);
    border-radius: var(--radius-sm);
    color: var(--color-muted-foreground);
  }
  
  .formats-section {
    text-align: center;
  }
  
  .formats-title {
    font-size: 1.5rem;
    margin-bottom: var(--space-xl);
    color: var(--color-foreground);
  }
  
  .formats-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
    max-width: 700px;
    margin: 0 auto;
  }
  
  .format-card {
    background: rgba(30, 30, 54, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    text-align: left;
    cursor: pointer;
    transition: all var(--transition-normal);
  }
  
  .format-card:hover {
    border-color: var(--color-brand-orange);
  }
  
  .format-header {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    margin-bottom: var(--space-md);
  }
  
  .format-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-brand-orange);
    flex-shrink: 0;
  }
  
  .format-icon-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  .format-info {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }
  
  .format-name {
    font-family: var(--font-sans);
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-foreground);
  }
  
  .format-badge {
    font-size: 0.7rem;
    padding: 2px 8px;
    background: var(--color-success);
    color: white;
    border-radius: var(--radius-full);
    font-weight: 600;
  }
  
  .format-description {
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  .huggingface-cta {
    text-align: center;
  }
  
  .hf-link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-md);
    padding: var(--space-lg) var(--space-2xl);
    background: rgba(30, 30, 54, 0.6);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    color: var(--color-foreground);
    font-weight: 600;
    transition: all var(--transition-normal);
    cursor: pointer;
  }
  
  .hf-link:hover {
    border-color: #FFD21E;
    box-shadow: 0 0 30px rgba(255, 210, 30, 0.2);
    color: var(--color-foreground);
  }
  
  .hf-icon {
    width: 28px;
    height: 28px;
  }
  
  .arrow-icon {
    width: 20px;
    height: 20px;
    transition: transform var(--transition-fast);
  }
  
  .hf-link:hover .arrow-icon {
    transform: translateX(4px);
  }
  
  @media (max-width: 1200px) {
    .model-families {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (max-width: 900px) {
    .model-families {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .formats-grid {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 480px) {
    .model-families {
      grid-template-columns: 1fr;
    }
  }
</style>
