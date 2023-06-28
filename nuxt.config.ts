// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/strapi', 'nuxt-icons', '@nuxt/image'],
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },
  image: {
    strapi: {}
  },
  css: [
    '@/assets/styles/main.scss'
  ]
})

