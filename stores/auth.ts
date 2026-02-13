export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
  }),

  actions: {
    async fetchUser() {
      this.loading = true;
      try {
        this.user = await $fetch("/api/auth/me", {
          credentials: "include",
        });
      } catch {
        this.user = null;
      } finally {
        this.loading = false;
      }
    },

    async login(payload) {
      await $fetch("/api/auth/login", {
        method: "POST",
        body: payload,
      });
    },

    async logout() {
      await $fetch("/api/auth/logout");
      this.user = null;
    },
  },
});
