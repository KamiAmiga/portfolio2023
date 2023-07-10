// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/strapi", "nuxt-icons"],
  typescript: {
    typeCheck: "build",
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
  css: ["@/assets/styles/main.scss"],
});
