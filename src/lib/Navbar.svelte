<script lang="ts">
  import { i18n } from './i18n.svelte';
  import { Button } from './components/ui/button';
  import Logo from './components/Logo.svelte';
  import GithubLogo from 'phosphor-svelte/lib/GithubLogo';
  import List from 'phosphor-svelte/lib/List';
  import X from 'phosphor-svelte/lib/X';

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

  function closeMenu() {
    mobileMenuOpen = false;
  }
</script>

<header class="fixed top-3 left-3 right-3 z-50 px-4 py-3 rounded-xl border border-border backdrop-blur-xl transition-all duration-300 {scrolled ? 'bg-card/95 shadow-lg' : 'bg-card/80'}">
  <div class="flex items-center justify-between max-w-6xl mx-auto">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 group" aria-label="Oxide Lab Home">
      <Logo size={36} gradientId="navbar-logo-gradient" />
      <span class="text-xl font-bold">
        Oxide<span class="brand-gradient">Lab</span>
      </span>
    </a>
    
    <!-- Desktop Navigation -->
    <nav class="hidden lg:flex items-center gap-8">
      {#each navLinks as link (link.href)}
        <a 
          href={link.href} 
          class="text-muted-foreground font-medium hover:text-foreground transition-colors relative group"
        >
          {link.label}
          <span class="absolute -bottom-1 left-0 right-0 h-0.5 brand-gradient-bg scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </a>
      {/each}
    </nav>
    
    <!-- Actions -->
    <div class="flex items-center gap-3">
      <!-- Language Switcher -->
      <div class="hidden sm:flex items-center bg-muted/50 p-0.5 rounded-lg border border-border">
        <button 
          class="px-2 py-1 text-xs font-bold rounded-md transition-all {i18n.currentLocale === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}"
          onclick={() => i18n.setLocale('en')}
          title="English"
        >
          EN
        </button>
        <button 
          class="px-2 py-1 text-xs font-bold rounded-md transition-all {i18n.currentLocale === 'ru' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}"
          onclick={() => i18n.setLocale('ru')}
          title="Русский"
        >
          RU
        </button>
        <button 
          class="px-2 py-1 text-xs font-bold rounded-md transition-all {i18n.currentLocale === 'pt-BR' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}"
          onclick={() => i18n.setLocale('pt-BR')}
          title="Português"
        >
          PT
        </button>
      </div>

      <Button href="#download" size="sm" class="hidden sm:inline-flex">
        {i18n.t.nav.download}
      </Button>

      <a 
        href="https://github.com/FerrisMind/Oxide-Lab" 
        target="_blank" 
        rel="noopener noreferrer"
        class="p-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="View on GitHub"
      >
        <GithubLogo size={20} weight="fill" />
      </a>
      
      <!-- Mobile Menu Button -->
      <Button 
        variant="ghost" 
        size="icon" 
        class="lg:hidden"
        onclick={() => mobileMenuOpen = !mobileMenuOpen}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        {#if mobileMenuOpen}
          <X size={20} weight="bold" />
        {:else}
          <List size={20} weight="bold" />
        {/if}
      </Button>
    </div>
  </div>
  
  <!-- Mobile Menu -->
  {#if mobileMenuOpen}
    <div class="lg:hidden mt-4 pt-4 border-t border-border">
      <nav class="flex flex-col gap-3 mb-4">
        {#each navLinks as link (link.href)}
          <a 
            href={link.href} 
            class="text-muted-foreground font-medium hover:text-foreground transition-colors py-2"
            onclick={closeMenu}
          >
            {link.label}
          </a>
        {/each}
      </nav>
      
      <div class="flex items-center gap-2 mb-4">
        <button 
          class="px-3 py-1.5 text-sm font-bold rounded-md transition-all {i18n.currentLocale === 'en' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}"
          onclick={() => i18n.setLocale('en')}
        >
          EN
        </button>
        <button 
          class="px-3 py-1.5 text-sm font-bold rounded-md transition-all {i18n.currentLocale === 'ru' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}"
          onclick={() => i18n.setLocale('ru')}
        >
          RU
        </button>
        <button 
          class="px-3 py-1.5 text-sm font-bold rounded-md transition-all {i18n.currentLocale === 'pt-BR' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}"
          onclick={() => i18n.setLocale('pt-BR')}
        >
          PT
        </button>
      </div>
      
      <Button href="#download" class="w-full" onclick={closeMenu}>
        {i18n.t.nav.download}
      </Button>
    </div>
  {/if}
</header>
