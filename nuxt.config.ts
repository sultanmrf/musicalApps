// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport:
        "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0 , user-scalable=no ,shrink-to-fit=no,minimal-ui",
      link: [
        { rel: "stylesheet", href: "/fontAwesome/css/fontAwesome.min.css" },
        { rel: "stylesheet", href: "/fontAwesome/css/solid.min.css" },
      ],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image", "@pinia/nuxt"],
  ui: {
    theme: {
      // اینجا رنگ‌هایی که میخوای استفاده بشن رو معرفی کن
      colors: ["primary", "secondary", "dark", "light"],
      defaultVariants: {
        color: "primary",
      },
    },
  },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    dburl: process.env.DATABASE_URI,
    dbName: process.env.DBNAME,
    user: process.env.DBUSERNAME,
    pass: process.env.DBPASSWORD,
    authSource: process.env.DBAUTHSOURCE,
    jwtSecret: process.env.JWT_SECRET,
  },
});
