const site = require("./site");

// export default {
module.exports = {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: site.name,
    htmlAttrs: {
      lang: "fr"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: site.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  target: "server",
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/zythum.css", "~/assets/css/style.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:
      process.env.NODE_ENV !== "production"
        ? "http://localhost:3000"
        : "process.env.PUBLIC_SITE_PATH"
  },
  // axios: {
  //   baseURL: "/"

  //   // baseURL: 'https://raphaelmouly.com',
  //   // browserBaseURL: 'http://localhost:3000',
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  serverMiddleware: {
    "/api": "~/api"
  }
};
