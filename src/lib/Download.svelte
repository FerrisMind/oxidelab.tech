<script lang="ts">
  import { i18n } from './i18n.svelte';
  import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './components/ui/card';
  import { Badge } from './components/ui/badge';
  import { Button } from './components/ui/button';
  import WindowsLogo from 'phosphor-svelte/lib/WindowsLogo';
  import AppleLogo from 'phosphor-svelte/lib/AppleLogo';
  import LinuxLogo from 'phosphor-svelte/lib/LinuxLogo';
  import DownloadSimple from 'phosphor-svelte/lib/DownloadSimple';
  import Warning from 'phosphor-svelte/lib/Warning';
  import Memory from 'phosphor-svelte/lib/Memory';
  import Database from 'phosphor-svelte/lib/Database';
  import Gpu from 'phosphor-svelte/lib/GraphicsCard';

  // Real download links from GitHub Releases
  const GITHUB_RELEASES_URL = 'https://github.com/FerrisMind/Oxide-Lab/releases';
  const LATEST_VERSION = '0.10.23';
  
  const downloads = $derived([
    {
      platform: 'Windows',
      icon: WindowsLogo,
      versions: [
        { 
          type: 'Latest Release', 
          size: LATEST_VERSION, 
          link: GITHUB_RELEASES_URL,
          description: i18n.t.download.cpuLink,
          badge: undefined as string | undefined,
          disabled: false
        }
      ],
      comingSoon: false
    },
    {
      platform: 'macOS',
      icon: AppleLogo,
      versions: [
        { 
          type: 'Metal', 
          size: 'Coming Soon', 
          link: GITHUB_RELEASES_URL,
          badge: 'Apple Silicon' as string | undefined,
          description: i18n.t.download.metalDesc,
          disabled: true
        }
      ],
      comingSoon: true
    },
    {
      platform: 'Linux',
      icon: LinuxLogo,
      versions: [
        { 
          type: 'CPU/GPU', 
          size: 'Coming Soon', 
          link: GITHUB_RELEASES_URL,
          description: i18n.t.download.linuxDesc,
          badge: undefined as string | undefined,
          disabled: true
        }
      ],
      comingSoon: true
    }
  ]);
  
  const requirementsList = $derived([
    { label: i18n.t.download.ramLabel, value: i18n.t.download.ramValue, icon: Memory },
    { label: i18n.t.download.storageLabel, value: i18n.t.download.storageValue, icon: Database },
    { label: i18n.t.download.gpuLabel, value: i18n.t.download.gpuValue, icon: Gpu }
  ]);
</script>

<section class="relative py-24 px-4" id="download">
  <div class="max-w-6xl mx-auto">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <span class="inline-block text-sm font-semibold text-primary uppercase tracking-wider mb-3">
        {i18n.t.download.label}
      </span>
      <h2 class="text-3xl md:text-4xl font-bold mb-4">
        {i18n.t.download.title}<br class="md:hidden" />
        <span class="brand-gradient">{i18n.t.download.titleGlow}</span>
      </h2>
      <p class="text-lg text-muted-foreground max-w-xl mx-auto">
        {i18n.t.download.description}
      </p>
    </div>
    
    <!-- Download Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {#each downloads as platform (platform.platform)}
        <Card class="{platform.comingSoon ? 'opacity-70' : 'hover:border-primary/50'} transition-all">
          <CardHeader class="border-b border-border pb-4">
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 text-primary">
                <platform.icon size={24} weight="fill" />
              </div>
              <div class="flex flex-col gap-1">
                <CardTitle class="text-xl">{platform.platform}</CardTitle>
                {#if platform.comingSoon}
                  <Badge variant="secondary" class="text-xs w-fit">Coming Soon</Badge>
                {/if}
              </div>
            </div>
          </CardHeader>
          <CardContent class="pt-4">
            <div class="flex flex-col gap-2">
              {#each platform.versions as version}
                <a 
                  href={version.link}
                  class="flex items-center justify-between p-3 rounded-lg border border-border transition-colors {version.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-accent hover:border-primary/30'}"
                  target={version.disabled ? undefined : "_blank"}
                  rel={version.disabled ? undefined : "noopener noreferrer"}
                >
                  <div class="flex items-center gap-2">
                    <span class="font-semibold">{version.type}</span>
                    {#if version.badge}
                      <Badge variant="secondary" class="text-xs">{version.badge}</Badge>
                    {/if}
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-muted-foreground">{version.size}</span>
                    {#if !version.disabled}
                      <DownloadSimple size={20} weight="bold" class="text-primary" />
                    {/if}
                  </div>
                </a>
                {#if version.description}
                  <p class="text-xs text-muted-foreground ml-3 mb-1">{version.description}</p>
                {/if}
              {/each}
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
    
    <!-- SmartScreen Warning -->
    <div class="flex items-start gap-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-16">
      <Warning size={24} weight="fill" class="text-yellow-500 flex-shrink-0 mt-0.5" />
      <div class="text-sm leading-relaxed">
        {@html i18n.t.download.smartscreenWarning.replace('More Info → Run Anyway', '<em class="text-yellow-500 not-italic font-semibold">More Info → Run Anyway</em>')}
      </div>
    </div>
    
    <!-- Requirements -->
    <div class="max-w-3xl mx-auto text-center mb-10">
      <h3 class="text-xl font-bold mb-6">{i18n.t.download.requirements}</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each requirementsList as req (req.label)}
          <Card class="hover:-translate-y-1 transition-all duration-300 hover:border-primary/50 cursor-pointer">
            <CardHeader>
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 flex items-center justify-center text-primary flex-shrink-0">
                  <req.icon size={28} weight="duotone" />
                </div>
                <CardTitle class="text-xl">{req.label}</CardTitle>
              </div>
              <CardDescription class="text-base leading-relaxed text-left">{req.value}</CardDescription>
            </CardHeader>
          </Card>
        {/each}
      </div>
    </div>
    
    <!-- Build Notice -->
    <Card class="max-w-2xl mx-auto">
      <CardContent class="py-6 text-center text-muted-foreground">
        {@html i18n.t.download.buildNotice.replace('GitHub repository', '<a href="https://github.com/FerrisMind/Oxide-Lab#readme" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-4 hover:text-primary/80">GitHub repository</a>')}
      </CardContent>
    </Card>
  </div>
</section>
