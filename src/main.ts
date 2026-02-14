import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

if (typeof window !== 'undefined' && window.location.hostname.endsWith('vercel.app')) {
  import('@vercel/speed-insights').then(({ injectSpeedInsights }) => injectSpeedInsights());
}

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
