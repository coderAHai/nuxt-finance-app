// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Finance Tracker",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/supabase"],
  supabase: {
    redirect: true,
  },
});
