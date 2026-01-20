<script lang="ts">
  import { i18n } from './i18n.svelte';

  const currentYear = new Date().getFullYear();
  
  const links = $derived({
    product: [
      { label: i18n.t.nav.features, href: '#features' },
      { label: i18n.t.nav.models, href: '#models' },
      { label: i18n.t.nav.privacy, href: '#privacy' },
      { label: i18n.t.nav.download, href: '#download' }
    ],
    resources: [
      { label: 'Documentation', href: 'https://github.com/FerrisMind/Oxide-Lab#readme' },
      { label: 'Releases', href: 'https://github.com/FerrisMind/Oxide-Lab/releases' },
      { label: 'Issues', href: 'https://github.com/FerrisMind/Oxide-Lab/issues' }
    ],
    legal: [
      { label: 'License (Apache-2.0)', href: 'https://github.com/FerrisMind/Oxide-Lab/blob/main/LICENSE' },
      { label: 'Third Party Licenses', href: 'https://github.com/FerrisMind/Oxide-Lab/blob/main/THIRD_PARTY_LICENSES.md' }
    ]
  });
</script>

<footer class="border-t border-border bg-card/50 py-16 px-4">
  <div class="max-w-6xl mx-auto">
    <!-- Links -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider mb-4">{i18n.t.footer.product}</h4>
        <ul class="space-y-3">
          {#each links.product as link (link.href)}
            <li>
              <a href={link.href} class="text-muted-foreground hover:text-primary transition-colors text-sm">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider mb-4">{i18n.t.footer.resources}</h4>
        <ul class="space-y-3">
          {#each links.resources as link (link.href)}
            <li>
              <a href={link.href} target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors text-sm">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
      
      <div>
        <h4 class="text-sm font-semibold uppercase tracking-wider mb-4">{i18n.t.footer.legal}</h4>
        <ul class="space-y-3">
          {#each links.legal as link (link.href)}
            <li>
              <a href={link.href} target="_blank" rel="noopener noreferrer" class="text-muted-foreground hover:text-primary transition-colors text-sm">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    
    <!-- Bottom -->
    <div class="flex items-center justify-center pt-8 border-t border-border">
      <p class="text-sm text-muted-foreground">
        © {currentYear} FerrisMind. {i18n.t.footer.license}
      </p>
    </div>
  </div>
</footer>
