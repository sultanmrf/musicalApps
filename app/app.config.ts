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
        overlay: "absolute inset-0 bg-transparent backdrop-blur-[2px]",
        content:
          "absolute bg-dark m-4 rounded-lg divide-y divide-default sm:ring ring-default sm:shadow-lg flex flex-col focus:outline-none",
        header: "flex items-center gap-1.5 p-4 sm:px-4 min-h-16",
        body: "flex-1 overflow-y-auto p-4 sm:p-4",
        wrapper: "",
      },
    },
  },
});
