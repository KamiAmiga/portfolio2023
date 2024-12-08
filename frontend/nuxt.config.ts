// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/strapi", "nuxt-icons"],
  strapi: {
    url: 'http://localhost:1337'
  },
  typescript: {
    strict: false
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Camille Gicquel - Portfolio',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
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
  css: ["@/assets/styles/main.scss"]
});
