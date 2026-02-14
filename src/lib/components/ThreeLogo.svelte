<script lang="ts">
  import type { Snippet } from 'svelte';
  import { onMount } from 'svelte';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import Logo from './Logo.svelte';

  interface Props {
    /** Path to GLB/GLTF model file */
    modelUrl?: string;
    /** Width of the canvas */
    width?: number;
    /** Height of the canvas */
    height?: number;
    /** CSS class for container */
    class?: string;
    /** Enable orbit controls for user interaction */
    enableControls?: boolean;
    /** Auto-rotate speed (0 to disable) */
    autoRotateSpeed?: number;
    /** Fallback content snippet */
    fallback?: Snippet;
  }

  const baseUrl = typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL != null ? import.meta.env.BASE_URL : './';
  let { 
    modelUrl = `${baseUrl}model.glb`,
    width = 300, 
    height = 300,
    class: className = '',
    enableControls = true,
    autoRotateSpeed = 1,
    fallback
  }: Props = $props();

  let container: HTMLDivElement;
  let isLoading = $state(true);
  let hasError = $state(false);

  onMount(() => {
    if (!container) return;

    console.log('[ThreeLogo] Initializing...');

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera - use orthographic for better 2D-like view
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);
    
    // Renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      premultipliedAlpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    
    // Lighting - balanced for saturated colors
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);
    
    const frontLight = new THREE.DirectionalLight(0xffffff, 2);
    frontLight.position.set(0, 0, 10);
    scene.add(frontLight);
    
    // Controls
    let controls: OrbitControls | null = null;
    if (enableControls) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.autoRotate = autoRotateSpeed > 0;
      controls.autoRotateSpeed = autoRotateSpeed;
    }
    
    // Load model
    const loader = new GLTFLoader();
    
    console.log('[ThreeLogo] Loading model:', modelUrl);
    
    loader.load(
      modelUrl,
      (gltf) => {
        console.log('[ThreeLogo] Model loaded successfully!', gltf);
        
        const model = gltf.scene;
        
        // Remove cameras and lights from imported model (Spline adds these)
        const toRemove: THREE.Object3D[] = [];
        model.traverse((child) => {
          console.log('[ThreeLogo] Child:', child.type, child.name);
          if (child instanceof THREE.Camera || child instanceof THREE.Light) {
            toRemove.push(child);
          }
        });
        toRemove.forEach(obj => obj.removeFromParent());
        console.log('[ThreeLogo] Removed', toRemove.length, 'cameras/lights from model');
        
        // Compute bounding box AFTER removing cameras/lights
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        
        console.log('[ThreeLogo] Model size:', size.x, size.y, size.z);
        console.log('[ThreeLogo] Model center:', center.x, center.y, center.z);
        
        const maxDim = Math.max(size.x, size.y, size.z);
        
        if (maxDim === 0 || !isFinite(maxDim)) {
          console.error('[ThreeLogo] Invalid model dimensions, using fallback');
          hasError = true;
          isLoading = false;
          return;
        }
        
        // Scale model smaller to fit in viewport during rotation
        const scale = 1.5 / maxDim;
        model.scale.setScalar(scale);
        
        // Center the model
        box.setFromObject(model);
        box.getCenter(center);
        model.position.sub(center);
        
        console.log('[ThreeLogo] Applied scale:', scale);
        
        // Apply brand colors based on mesh names
        // Shape_0, Shape_1, Shape_3 = Blue (#1E88E5)
        // Shape_2 = Oxide texture (metallic armor)
        
        // Load oxide texture for Shape_2
        const textureLoader = new THREE.TextureLoader();
        const oxideTexture = textureLoader.load(`${baseUrl}oxide-texture.png`);
        oxideTexture.wrapS = THREE.RepeatWrapping;
        oxideTexture.wrapT = THREE.RepeatWrapping;
        oxideTexture.repeat.set(1, 1);
        
        let meshCount = 0;
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            meshCount++;
            const meshName = child.name;
            
            console.log('[ThreeLogo] Mesh', meshCount, meshName);
            
            if (meshName === 'Shape_2') {
              // Metallic armor with texture
              child.material = new THREE.MeshStandardMaterial({
                map: oxideTexture,
                metalness: 0.5,
                roughness: 0.3,
                side: THREE.DoubleSide,
              });
            } else {
              // Blue parts - saturated blue
              child.material = new THREE.MeshStandardMaterial({
                color: 0x1E88E5,
                metalness: 0.3,
                roughness: 0.4,
                side: THREE.DoubleSide,
              });
            }
          }
        });
        
        console.log('[ThreeLogo] Mesh count:', meshCount);
        
        scene.add(model);
        isLoading = false;
        
        console.log('[ThreeLogo] Model added to scene, isLoading:', isLoading);
      },
      (progress) => {
        console.log('[ThreeLogo] Loading progress:', progress.loaded, '/', progress.total);
      },
      (error) => {
        console.error('[ThreeLogo] Failed to load model:', error);
        hasError = true;
        isLoading = false;
      }
    );
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      if (controls) {
        controls.update();
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      controls?.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  });
</script>

<div 
  class="three-logo-container relative {className}"
  style="width: {width}px; height: {height}px;"
>
  {#if isLoading && !hasError}
    <!-- Loading placeholder -->
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin motion-reduce:animate-none"></div>
    </div>
  {/if}

  {#if hasError}
    <!-- Fallback to static logo on error -->
    <div class="absolute inset-0 flex items-center justify-center">
      {#if fallback}
        {@render fallback()}
      {:else}
        <div class="drop-shadow-[0_0_30px_rgba(238,44,11,0.4)]">
          <Logo size={120} gradientId="three-fallback-gradient" />
        </div>
      {/if}
    </div>
  {/if}

  <div 
    bind:this={container}
    class="w-full h-full {isLoading || hasError ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500"
  ></div>
</div>

<style>
  .three-logo-container {
    contain: layout style;
  }
  
  .three-logo-container :global(canvas) {
    cursor: grab;
  }
  
  .three-logo-container :global(canvas:active) {
    cursor: grabbing;
  }
</style>

