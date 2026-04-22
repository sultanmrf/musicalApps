import { useLoading } from "~/composables/useLoading";

export function useApi() {
  const { start, stop } = useLoading();

  // درخواست رو بدون استفاده از useFetch (که کامپوزبل هست) بزن
  // یا اگر می‌خوای از $fetch استفاده کن که استاندارده
  async function request(url: string, options: any = {}) {
    start();
    try {
      const data = await $fetch(url, {
        ...options,
        // اینجا می‌تونی تنظیمات baseURL یا headers رو اضافه کنی
      });
      return { data: ref(data), error: ref(null) };
    } catch (err: any) {
      return { data: ref(null), error: ref(err) };
    } finally {
      stop();
    }
  }

  return { request };
}
