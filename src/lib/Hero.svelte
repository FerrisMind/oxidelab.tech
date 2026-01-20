<script lang="ts">
  import { i18n } from './i18n.svelte';
  import { Button } from './components/ui/button';
  import { Badge } from './components/ui/badge';
  import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
  import GithubLogo from 'phosphor-svelte/lib/GithubLogo';

  let visible = $state(false);
  
  $effect(() => {
    const timer = setTimeout(() => {
      visible = true;
    }, 100);
    return () => clearTimeout(timer);
  });
</script>

<section class="relative min-h-screen flex flex-col items-center justify-center py-24 px-4 overflow-hidden" id="hero">
  <!-- Background -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none">
    <div class="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-50 bg-red-500/25 -top-[200px] -right-[100px] animate-pulse"></div>
    <div class="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-50 bg-blue-500/20 -bottom-[100px] -left-[100px] animate-pulse"></div>
    <div class="absolute w-[300px] h-[300px] rounded-full blur-[100px] opacity-50 bg-orange-500/15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
    <div class="absolute inset-0 bg-[linear-gradient(rgba(238,44,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(238,44,11,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_70%)]"></div>
  </div>
  
  <!-- Content -->
  <div 
    class="text-center z-10 max-w-4xl mx-auto transition-all duration-700 ease-out {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}"
  >
    <Badge variant="outline" class="mb-6 gap-2 px-4 py-1.5 text-sm">
      <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
      {i18n.t.hero.badge}
    </Badge>
    
    <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
      {i18n.t.hero.title}<br class="md:hidden" />
      <span class="brand-gradient">{i18n.t.hero.titleGlow}</span>
    </h1>
    
    <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
      {i18n.t.hero.description}
    </p>
    
    <div class="flex gap-4 justify-center flex-wrap mb-12">
      <Button href="#download" size="lg" class="gap-2">
        <DownloadSimple size={20} weight="bold" />
        {i18n.t.hero.ctaDownload}
      </Button>
      <Button href="https://github.com/FerrisMind/Oxide-Lab" variant="outline" size="lg" class="gap-2">
        <GithubLogo size={20} weight="fill" />
        {i18n.t.hero.ctaGithub}
      </Button>
    </div>
  </div>
  
  <!-- App Screenshot -->
  <div 
    class="relative mt-16 z-10 transition-all duration-1000 ease-out delay-300 {visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}"
  >
    <div class="absolute -inset-12 bg-gradient-radial from-red-500/20 to-transparent pointer-events-none"></div>
    <div class="relative bg-card/95 border border-border rounded-4xl overflow-hidden shadow-2xl max-w-[1128px] w-[90vw]">
      <div class="bg-background">
        <img 
          src="https://raw.githubusercontent.com/FerrisMind/Oxide-Lab/main/.github/assets/screenshots/chat-dark.png" 
          alt="Oxide Lab Interface" 
          class="w-full h-auto block"
        />
      </div>
    </div>
  </div>
</section>
