// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/strapi', 'nuxt-icons'],
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}'
      }
    }
  },
  components: [
    { path: '~/components/atoms' },
    '~/components'
  ],
  css: [
    '@/assets/styles/main.scss'
  ]
})

