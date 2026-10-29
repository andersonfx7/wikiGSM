// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	// ─────────────────────────────────────────────────────────────────
	// CAMBIA estos dos valores con tus datos de GitHub:
	//   site → https://<TU-USUARIO>.github.io
	//   base → /<NOMBRE-DEL-REPOSITORIO>   (respeta mayúsculas)
	// ─────────────────────────────────────────────────────────────────
	site: 'https://andersonfx7.github.io',
	base: '/wikiGSM',

	integrations: [
		starlight({
			title: 'Wiki GSM',
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Español',
					lang: 'es',
				},
			},
			// Fuerza tema oscuro por defecto para visitantes nuevos
			head: [
				{
					tag: 'script',
					content: `(function(){if(!localStorage.getItem('starlight-theme')){document.documentElement.setAttribute('data-theme','dark');}})();`,
				},
			],
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/andersonfx7/wikiGSM',
				},
			],
			sidebar: [
				// ─────────────────────────────────────────────────────────
				// SIDEBAR: un bloque por cada marca.
				// Los modelos y artículos dentro de cada marca se generan
				// automáticamente desde las carpetas correspondientes.
				// Para agregar una marca nueva:
				//   1. Crea la carpeta src/content/docs/<marca>/
				//   2. Agrega aquí un bloque igual a los de abajo.
				// ─────────────────────────────────────────────────────────
				{
					label: 'Apple',
					collapsed: true,
					items: [{ autogenerate: { directory: 'apple', collapsed: true } }],
				},
				{
					label: 'Samsung',
					collapsed: true,
					items: [{ autogenerate: { directory: 'samsung', collapsed: true } }],
				},
			],
		}),
	],
});
