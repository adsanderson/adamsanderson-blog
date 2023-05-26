// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import { plugin as markdown, Mode } from 'vite-plugin-markdown'

export default {
  plugins: [sveltekit(), markdown({ mode: [Mode.HTML, Mode.TOC], })]
};