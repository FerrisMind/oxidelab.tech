import { mount } from 'svelte'
import { injectSpeedInsights } from '@vercel/speed-insights'
import './app.css'
import App from './App.svelte'

injectSpeedInsights();

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
