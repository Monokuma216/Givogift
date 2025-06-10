// off eslint
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {enabled: true},
  
  typescript: {
    typeCheck: true,
  },
  
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/devtools',
    '@nuxthub/core',
  ],
  
  eslint: {
    config: {
      stylistic: true,
    },
  }, css: ['~/assets/css/main.css'],
  
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  
  nitro: {
    experimental: {
      tasks: true,
    },
  },
  
  hub: {
    database: true,
  },
});
