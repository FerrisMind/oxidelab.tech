<script lang="ts">
  import { i18n } from './i18n.svelte';
  import { Card, CardHeader, CardTitle, CardDescription } from './components/ui/card';
  import ShieldCheck from 'phosphor-svelte/lib/ShieldCheck';
  import Cpu from 'phosphor-svelte/lib/Cpu';
  import Stack from 'phosphor-svelte/lib/Stack';
  import Lightning from 'phosphor-svelte/lib/Lightning';
  import Globe from 'phosphor-svelte/lib/Globe';
  import Code from 'phosphor-svelte/lib/Code';

  const features = $derived([
    {
      icon: ShieldCheck,
      title: i18n.t.features.items[0].title,
      description: i18n.t.features.items[0].description,
      color: 'text-emerald-500'
    },
    {
      icon: Cpu,
      title: i18n.t.features.items[1].title,
      description: i18n.t.features.items[1].description,
      color: 'text-blue-500'
    },
    {
      icon: Stack,
      title: i18n.t.features.items[2].title,
      description: i18n.t.features.items[2].description,
      color: 'text-violet-500'
    },
    {
      icon: Lightning,
      title: i18n.t.features.items[3].title,
      description: i18n.t.features.items[3].description,
      color: 'text-orange-500'
    },
    {
      icon: Globe,
      title: i18n.t.features.items[4].title,
      description: i18n.t.features.items[4].description,
      color: 'text-cyan-400'
    },
    {
      icon: Code,
      title: i18n.t.features.items[5].title,
      description: i18n.t.features.items[5].description,
      color: 'text-red-500'
    }
  ]);
</script>

<section class="relative py-24 px-4" id="features">
  <div class="max-w-6xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <span class="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
        {i18n.t.features.label}
      </span>
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        {i18n.t.features.title}<br class="md:hidden" />
        <span class="brand-gradient">{i18n.t.features.titleGlow}</span>
      </h2>
      <p class="text-lg text-muted-foreground max-w-xl mx-auto">
        {i18n.t.features.description}
      </p>
    </div>
    
    <!-- Features Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {#each features as feature (feature.title)}
        <Card class="hover:-translate-y-1 transition-all duration-300 hover:border-primary/50 cursor-pointer">
          <CardHeader>
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 flex items-center justify-center {feature.color} flex-shrink-0">
                <feature.icon size={28} weight="duotone" />
              </div>
              <CardTitle class="text-xl">{feature.title}</CardTitle>
            </div>
            <CardDescription class="text-base leading-relaxed">{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      {/each}
    </div>
    
    <!-- Tech Stack -->
    <div class="text-center">
      <p class="text-sm text-muted-foreground uppercase tracking-wider mb-6">
        {i18n.t.features.techStack}
      </p>
      <div class="flex items-center justify-center gap-8 flex-wrap">
        <a href="https://www.rust-lang.org/" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center gap-2 p-4 text-muted-foreground hover:text-foreground transition-colors group">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" alt="Rust" class="w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity dark:invert" />
          <span class="text-sm font-medium">Rust</span>
        </a>
        <a href="https://tauri.app/" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center gap-2 p-4 text-muted-foreground hover:text-foreground transition-colors group">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tauri/tauri-original.svg" alt="Tauri" class="w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity" />
          <span class="text-sm font-medium">Tauri v2</span>
        </a>
        <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center gap-2 p-4 text-muted-foreground hover:text-foreground transition-colors group">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/svelte/svelte-original.svg" alt="Svelte" class="w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity" />
          <span class="text-sm font-medium">Svelte 5</span>
        </a>
        <a href="https://github.com/huggingface/candle" target="_blank" rel="noopener noreferrer" class="flex flex-col items-center gap-2 p-4 text-muted-foreground hover:text-foreground transition-colors group">
          <img src="https://unpkg.com/@lobehub/icons-static-svg@latest/icons/huggingface-color.svg" alt="Candle" class="w-10 h-10 opacity-70 group-hover:opacity-100 transition-opacity" />
          <span class="text-sm font-medium">Candle</span>
        </a>
      </div>
    </div>
  </div>
</section>
