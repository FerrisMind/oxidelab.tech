<script lang="ts">
  import { i18n } from './i18n.svelte';
  import ThreeLogo from './components/ThreeLogo.svelte';
  import Logo from './components/Logo.svelte';
  import EyeSlash from 'phosphor-svelte/lib/EyeSlash';
  import WifiSlash from 'phosphor-svelte/lib/WifiSlash';
  import Database from 'phosphor-svelte/lib/Database';
  import ShieldCheck from 'phosphor-svelte/lib/ShieldCheck';

  const privacyFeatures = $derived([
    {
      title: i18n.t.privacy.features[0].title,
      description: i18n.t.privacy.features[0].description,
      icon: EyeSlash
    },
    {
      title: i18n.t.privacy.features[1].title,
      description: i18n.t.privacy.features[1].description,
      icon: WifiSlash
    },
    {
      title: i18n.t.privacy.features[2].title,
      description: i18n.t.privacy.features[2].description,
      icon: Database
    },
    {
      title: i18n.t.privacy.features[3].title,
      description: i18n.t.privacy.features[3].description,
      icon: ShieldCheck
    }
  ]);
</script>

<section class="relative py-24 px-4 overflow-hidden" id="privacy">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <!-- Content -->
      <div>
        <span class="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
          {i18n.t.privacy.label}
        </span>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          {i18n.t.privacy.title}<br class="md:hidden" />
          <span class="brand-gradient">{i18n.t.privacy.titleGlow}</span>
        </h2>
        <p class="text-lg text-muted-foreground mb-10 leading-relaxed">
          {i18n.t.privacy.description}
        </p>
        
        <div class="flex flex-col gap-6">
          {#each privacyFeatures as feature (feature.title)}
            <div class="flex gap-4 items-start p-3 -m-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer">
              <div class="w-8 h-8 flex items-center justify-center text-green-500 flex-shrink-0">
                <feature.icon size={24} weight="duotone" />
              </div>
              <div>
                <h4 class="font-semibold text-lg mb-1">{feature.title}</h4>
                <p class="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Visual with Interactive 3D Logo -->
      <div class="flex items-center justify-center relative lg:order-last order-first">
        <div class="relative w-[500px] h-[500px] flex items-center justify-center">
          <!-- Glow -->
          <div class="absolute w-[56px] h-[56px] bg-gradient-radial from-red-500/25 to-transparent rounded-full animate-pulse motion-reduce:animate-none"></div>
          
          <!-- 3D Three.js Logo -->
          <div class="relative z-10" style="transform: scale(1.28); transform-origin: center;">
            {#snippet logoFallback()}
              <div class="drop-shadow-[0_0_30px_rgba(238,44,11,0.4)]">
                <Logo size={150} gradientId="privacy-logo-gradient" />
              </div>
            {/snippet}
            
            <ThreeLogo 
              modelUrl="/model.glb"
              width={400}
              height={400}
              autoRotateSpeed={2}
              fallback={logoFallback}
            />
          </div>
          
          <!-- Orbits without dots -->
          <div class="absolute w-[400px] h-[400px] border border-dashed border-border rounded-full animate-[spin_15s_linear_infinite] motion-reduce:animate-none"></div>
          <div class="absolute w-[450px] h-[450px] border border-dashed border-border rounded-full animate-[spin_20s_linear_infinite_reverse] motion-reduce:animate-none"></div>
          <div class="absolute w-[500px] h-[500px] border border-dashed border-border rounded-full animate-[spin_25s_linear_infinite] motion-reduce:animate-none"></div>
        </div>
      </div>
    </div>
  </div>
</section>
