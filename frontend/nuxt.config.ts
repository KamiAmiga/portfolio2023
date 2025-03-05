// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Camille Gicquel - Portfolio',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'canonical', href: 'https://www.cgicquel.fr' }
      ],
      htmlAttrs: {
        lang: 'fr-FR'
      }
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/content', "nuxt-icons", '@nuxt/image', 'nuxt-strapi-blocks-renderer'],
  typescript: {
    typeCheck: true
  },
  components: {
    dirs: [
      {
        path: "~/components/atoms",
        global: true,
      },
      {
        path: "~/components/molecules",
        global: true,
      },
      "~/components",
    ],
  },
  image: {
    format: ['webp'],
    screens: {
      'md': 640,
      'lg': 1280,
      'xl': 1920
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "~/assets/styles/abstracts/index" as *;'
        }
      }
    }
  }
})