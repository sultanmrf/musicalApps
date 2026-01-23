export default defineAppConfig({
  ui: {
    button: {
      // سایز پیش‌فرض
      default: {
        size: 'lg',          // sm, md, lg, xl
        color: 'primary',    // primary, secondary, gray, etc.
        variant: 'solid',    // solid, ghost, soft, outline
        rounded: 'xl'
      },

      // سفارشی‌سازی کلاس Tailwind
      base: 'font-medium  bg-red transition-all duration-200',

      // کانفیگ رنگ‌ها
      color: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300'
      },

      // حالت‌ها
      variant: {
        solid: 'shadow-md hover:shadow-lg',
        outline: 'border border-gray-300 hover:bg-gray-100'
      }
    }
  }
})
