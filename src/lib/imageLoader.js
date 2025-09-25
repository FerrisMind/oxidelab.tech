// Custom image loader for static export
export default function imageLoader({ src, width, quality }) {
  // For static export, we just return the src as-is
  // since all images are already optimized during build
  return src;
}
