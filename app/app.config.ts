export default defineAppConfig({
  ui: {
    navigationMenu: {
      icon: {
        base: "text-4xl",
      },
    },
    colors: {
      primary: "emerald",
      secondary: "indigo",
      neutral: "zinc",
    },
    slideover: {
      slots: {
        overlay: "absolute inset-0 bg-elevated/75",
        content:
          "absolute bg-dark divide-y divide-default sm:ring ring-default sm:shadow-lg flex flex-col focus:outline-none",
        header: "flex items-center gap-1.5 p-4 sm:px-6 min-h-16",
        wrapper: "",
      },
    },
  },
});
