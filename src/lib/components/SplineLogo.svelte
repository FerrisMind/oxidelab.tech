<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import { Application } from '@splinetool/runtime';
  import Logo from './Logo.svelte';

  interface Props {
    /** Spline scene URL (from Spline export) */
    sceneUrl?: string;
    /** Width of the canvas */
    width?: number;
    /** Height of the canvas */
    height?: number;
    /** CSS class for container */
    class?: string;
    /** Fallback content snippet */
    fallback?: Snippet;
  }

  let { 
    sceneUrl = '', 
    width = 300, 
    height = 300,
    class: className = '',
    fallback
  }: Props = $props();

  let canvas: HTMLCanvasElement;
  let app: Application | null = null;
  let isLoading = $state(true);
  let hasError = $state(false);

  onMount(() => {
    if (!sceneUrl || !canvas) return;

    // Get WebGL context with alpha for transparency
    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: false }) 
      || canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    
    app = new Application(canvas);

    app.load(sceneUrl)
      .then(() => {
        isLoading = false;
      })
      .catch((error: unknown) => {
        console.error('Failed to load Spline scene:', error);
        hasError = true;
        isLoading = false;
      });

    return () => {
      app?.dispose();
    };
  });
</script>

<div 
  class="spline-logo-container relative {className}"
  style="width: {width}px; height: {height}px;"
>
  {#if isLoading && !hasError}
    <!-- Loading placeholder with subtle animation -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin motion-reduce:animate-none"></div>
    </div>
  {/if}

  {#if hasError}
    <!-- Fallback to static SVG logo on error -->
    <div class="absolute inset-0 flex items-center justify-center">
      {#if fallback}
        {@render fallback()}
      {:else}
        <div class="drop-shadow-[0_0_30px_rgba(238,44,11,0.4)]">
          <Logo size={120} gradientId="spline-fallback-gradient" />
        </div>
      {/if}
    </div>
  {/if}

  <canvas 
    bind:this={canvas}
    class="w-full h-full {isLoading || hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500"
    style="touch-action: pan-y;"
  ></canvas>
</div>

<style>
  .spline-logo-container {
    /* Ensure proper containment for 3D content */
    contain: layout style;
  }
  
  .spline-logo-container canvas {
    /* Smooth interaction */
    cursor: grab;
  }
  
  .spline-logo-container canvas:active {
    cursor: grabbing;
  }
</style>
