<script lang="ts">
  import { i18n } from './i18n.svelte';
  import { Card, CardHeader, CardTitle, CardDescription } from './components/ui/card';
  import { Badge } from './components/ui/badge';
  import { Button } from './components/ui/button';
  import ArrowRight from 'phosphor-svelte/lib/ArrowRight';

  // Model families with real icons from @lobehub/icons-static-svg
  const modelFamilies = [
    {
      name: 'Llama',
      versions: ['Llama 1', 'Llama 2', 'Llama 3', 'CodeLlama'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/meta-color.svg'
    },
    {
      name: 'Qwen',
      versions: ['Qwen2', 'Qwen2.5', 'Qwen3'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/qwen-color.svg'
    },
    {
      name: 'Mistral',
      versions: ['Mistral 7B', 'Mixtral 8x7B', 'Codestral'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/mistral-color.svg'
    },
    {
      name: 'DeepSeek',
      versions: ['DeepSeek Coder', 'DeepSeek LLM', 'DeepSeek V2'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/deepseek-color.svg'
    },
    {
      name: 'Yi',
      versions: ['Yi-6B', 'Yi-34B', 'Yi-1.5'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/yi.svg'
    },
    {
      name: 'Gemma',
      versions: ['Gemma', 'Gemma 2', 'Gemma 3'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/gemma-color.svg'
    },
    {
      name: 'Phi',
      versions: ['Phi-2', 'Phi-3', 'Phi-3.5'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/microsoft-color.svg'
    },
    {
      name: 'SmolLM',
      versions: ['SmolLM2'],
      iconUrl: 'https://unpkg.com/@lobehub/icons-static-svg@latest/icons/huggingface-color.svg'
    }
  ];
  
  const formats = $derived([
    {
      name: i18n.t.models.ggufName,
      description: i18n.t.models.ggufDesc,
      badge: i18n.t.models.ggufBadge,
      iconUrl: 'https://raw.githubusercontent.com/ggml-org/media/master/logo/ggml-logo.svg'
    },
    {
      name: i18n.t.models.stName,
      description: i18n.t.models.stDesc,
      iconUrl: 'https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/safetensors/logo.png'
    }
  ]);
</script>

<section class="relative py-24 px-4" id="models">
  <div class="max-w-6xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <span class="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
        {i18n.t.models.label}
      </span>
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        {i18n.t.models.title}<br class="md:hidden" />
        <span class="brand-gradient">{i18n.t.models.titleGlow}</span>
      </h2>
      <p class="text-lg text-muted-foreground max-w-xl mx-auto">
        {i18n.t.models.description}
      </p>
    </div>
    
    <!-- Model Families Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
      {#each modelFamilies as family (family.name)}
        <Card class="hover:-translate-y-1 transition-all duration-300 hover:border-primary/50 cursor-pointer">
          <CardHeader class="pb-3">
            <div class="flex items-center gap-3 mb-3">
              <img 
                src={family.iconUrl} 
                alt="{family.name} icon" 
                class="w-9 h-9 object-contain {family.name === 'Yi' ? 'invert' : ''}"
                loading="lazy"
              />
              <CardTitle class="text-lg">{family.name}</CardTitle>
            </div>
            <div class="flex flex-wrap gap-1.5">
              {#each family.versions as version}
                <Badge variant="secondary" class="text-xs font-normal">{version}</Badge>
              {/each}
            </div>
          </CardHeader>
        </Card>
      {/each}
    </div>
    
    <!-- Formats Section -->
    <div class="text-center mb-8">
      <h3 class="text-2xl font-bold mb-8">{i18n.t.models.formatsTitle}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {#each formats as format (format.name)}
          <Card class="hover:border-primary/50 transition-colors cursor-pointer text-left">
            <CardHeader>
              <div class="flex items-center gap-3 mb-2">
                <img 
                  src={format.iconUrl} 
                  alt="{format.name} icon" 
                  class="w-10 h-10 object-contain dark:invert"
                  loading="lazy"
                />
                <div class="flex items-center gap-2">
                  <CardTitle class="text-xl">{format.name}</CardTitle>
                  {#if format.badge}
                    <Badge class="bg-green-500/20 text-green-500 border-green-500/30">{format.badge}</Badge>
                  {/if}
                </div>
              </div>
              <CardDescription class="text-base">{format.description}</CardDescription>
            </CardHeader>
          </Card>
        {/each}
      </div>
    </div>
    
    <!-- Hugging Face CTA -->
    <div class="text-center">
      <Button 
        href="https://huggingface.co/models?library=gguf" 
        variant="outline" 
        size="lg"
        class="gap-3 group"
      >
        <img 
          src="https://unpkg.com/@lobehub/icons-static-svg@latest/icons/huggingface-color.svg" 
          alt="Hugging Face" 
          class="w-7 h-7"
        />
        <span>{i18n.t.models.hfLink}</span>
        <ArrowRight size={20} weight="bold" class="transition-transform group-hover:translate-x-1" />
      </Button>
    </div>
  </div>
</section>
