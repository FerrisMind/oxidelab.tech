<script lang="ts">
  interface Props {
    size?: number;
    class?: string;
    gradientId?: string;
  }

  let { size = 36, class: className = '', gradientId = 'logo-gradient' }: Props = $props();
</script>

<svg 
  class={className} 
  style="width: {size}px; height: {size}px;"
  viewBox="0 0 1024 1024" 
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <linearGradient id={gradientId} x1="434.13" y1="35.75" x2="989.28" y2="661.72" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FF7F04"/>
      <stop offset="1" stop-color="#EE2C0B"/>
    </linearGradient>
  </defs>
  <path fill="#1E88E5" d="M275.3,641.7L12,362.8v394.3c0,10.9,4,21.3,11.3,28.9l202.1,214c7.3,7.7,17,12,27.3,12h372.4L411.3,785.7L275.3,641.7L275.3,641.7z"/>
  <path fill="#1E88E5" d="M659.7,1012h229.1c3,0,6-0.1,9-0.4L715,817.1c0,0-18.4-20.7-35.3-28.6c-3.9-1.7-7.6-2.9-11-3c-18.7-0.4-158,0-223.1,0.1L659.7,1012L659.7,1012z"/>
  <path fill="url(#{gradientId})" d="M360.4,235.8c21.5,0.4,172.9-0.1,256.5-0.1c9.4,0,18.5,3.9,24.9,10.8l84.1,89c6,6.4,9.4,14.8,9.4,23.5v435.5c0,8.7,3.3,17.1,9.3,23.5l168.9,179.6c9.7,10.3,24.7,13.6,37.8,8.3c35.5-14.4,60.7-50.9,60.7-93.5V272.1c0-11.4-4.3-22.3-11.9-30.3L795,24.5c-7.6-8-17.9-12.6-28.6-12.6H128.9l0,0c-2.2,0-3.3,2.6-1.8,4.3l183.5,194.3C310.4,210.7,341.9,235.5,360.4,235.8L360.4,235.8z"/>
  <path fill="#1E88E5" d="M275.3,607.4V226.4c0-8.8-3.4-17.2-9.4-23.5L96.6,23.7c-9.3,0.6-18.3,2.7-26.7,6.1C36,43.4,12,78.1,12,118.8v209.9L275.3,607.4z"/>
</svg>
