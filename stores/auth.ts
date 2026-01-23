
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    init() {
      this.token = localStorage.getItem("token");
      if (this.token) this.fetchUser();
    },

    async fetchUser() {
      const { data, error } = await useFetch("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
      if (!error.value) this.user = data.value;
    },

    setToken(token:string) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
    },
  },
});
