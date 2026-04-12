<template>
  <div
    class="modal absolute top-0 left-0 flex w-full h-screen items-center justify-center bg-gray-100 z-25 flex-col"
  >
    <!-- Card Container -->
    <div
      class="w-[90vw] max-w-[530px] bg-dark/90 p-6 sm:p-8 rounded-xl shadow-lg relative"
    >
      <!-- Tab Navigation -->
      <div
        class="relative flex justify-between items-center w-48 mx-auto p-1 rounded-full bg-dark"
      >
        <!-- Orange Indicator -->
        <span
          class="absolute top-1 left-1 h-10 w-20 rounded-full bg-primary transition-transform duration-300 ease-in-out"
          :class="isLogin ? 'translate-x-0' : 'translate-x-26'"
        ></span>

        <!-- Login -->
        <button
          @click="isLogin = true"
          class="relative z-10 w-20 h-10 rounded-full transition-colors duration-300"
          :class="isLogin ? 'text-black' : 'text-white'"
        >
          Login
        </button>

        <!-- Sign Up -->
        <button
          @click="isLogin = false"
          class="relative z-10 w-20 h-10 rounded-full transition-colors duration-300"
          :class="!isLogin ? 'text-black' : 'text-white'"
        >
          Sign Up
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6 mt-6">
        <!-- Login Fields (Visible only when isLogin is true) -->
        <div
          v-if="isLogin"
          class="space-y-4 transition-opacity duration-500 ease-in-out"
        >
          <div>
            <label
              for="email"
              class="block text-sm font-semibold dark:text-white"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="mt-2 text-primary block w-full px-4 py-2 border border-dark focus:outline-none focus:ring-2 focus:ring-primary bg-dark shadow-lg shadow-primary/20 rounded-xl"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-semibold dark:text-white"
              >Password</label
            >
            <input
              type="password"
              id="password"
              v-model="form.password"
              class="mt-2 text-primary block w-full px-4 py-2 rounded-xl border border-dark focus:outline-none focus:ring-2 focus:ring-primary bg-dark shadow-lg shadow-primary/20"
              placeholder="Enter your password"
              required
            />
          </div>
        </div>

        <!-- Sign Up Fields (Visible only when isLogin is false) -->
        <div
          v-if="!isLogin"
          class="space-y-4 transition-opacity duration-500 ease-in-out"
        >
          <div>
            <label
              for="username"
              class="block text-sm font-semibold dark:text-white"
              >Username</label
            >
            <input
              type="text"
              id="username"
              v-model="form.username"
              class="mt-2 block w-full px-4 py-2 rounded-xl border text-primary border-dark focus:outline-none focus:ring-2 focus:ring-primary bg-dark shadow-lg shadow-primary/20"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-semibold dark:text-white"
              >Email</label
            >
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="mt-2 text-primary block w-full px-4 py-2 border border-dark focus:outline-none focus:ring-2 focus:ring-primary bg-dark shadow-lg shadow-primary/20 rounded-xl"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-semibold dark:text-white"
              >Password</label
            >
            <input
              type="password"
              id="password"
              v-model="form.password"
              class="mt-2 text-primary block w-full px-4 py-2 rounded-xl border border-dark focus:outline-none focus:ring-2 focus:ring-primary bg-dark shadow-lg shadow-primary/20"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label
              for="confirmPassword"
              class="block text-sm font-semibold dark:text-white"
              >Confirm Password</label
            >
            <input
              type="password"
              id="confirmPassword"
              v-model="form.confirmPassword"
              class="mt-2 text-primary block w-full px-4 py-2 rounded-xl border border-dark focus:outline-none focus:ring-2 focus:ring-primary bg-dark shadow-lg shadow-primary/20"
              placeholder="Confirm your password"
              required
            />
          </div>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-2 px-4 bg-[#ef963e] hover:bg-[#efbb5a] text-white font-semibold rounded-md focus:outline-none"
        >
          {{ isLogin ? "Login" : "Sign Up" }}
        </button>
      </form>

      <!-- Error/Success Message -->
      <p v-if="errorMessage" class="mt-4 text-sm text-red-600">
        {{ errorMessage }}
      </p>
      <p v-if="successMessage" class="mt-4 text-sm text-green-600">
        {{ successMessage }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLogin: true, // Controls whether the form is in Login or Sign Up mode
      form: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      errorMessage: "",
      successMessage: "",
    };
  },
  methods: {
    handleSubmit() {
      // Handle form submission logic here
      if (this.isLogin) {
        console.log("Logging in...");
      } else {
        console.log("Signing up...");
      }
    },
  },
};
</script>
>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~~/stores/auth";

let storeAuth = useAuthStore();

const isLogin = ref(true),
  form = ref({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }),
  errorMessage = ref(""),
  successMessage = ref(""),
  router = useRouter();


const login = async () => {
  try {
    await $fetch("/api/auth/login", {
      method: "POST",
      body: { email: form.value.email, password: form.value.password },
    });

    // ✅ صبر کن تا کوکی commit شود
    await nextTick();

    router.push("/"); // redirect بعد از commit
  } catch (error) {
    console.error("Login failed", error);
  }
};

const register = async () => {
  try {
    await useFetch("/api/auth/register", {
      method: "POST",
      body: {
        username: form.value.username,
        email: form.value.email,
        password: form.value.password,
      },
    });
  } catch (error) {
    console.error("Registration failed", error);
  }
};

const handleSubmit = () => {
  if (!isLogin.value && form.value.password !== form.value.confirmPassword) {
    errorMessage.value = "Passwords do not match!";
    return;
  }

  if (!form.value.email || !form.value.password) {
    errorMessage.value = "Please fill in all fields.";
    return;
  }

  if (isLogin.value) {
    login();
  } else {
    register();
  }

  successMessage.value = isLogin.value
    ? "Login successful!"
    : "Sign up successful!";
  errorMessage.value = "";
};
</script>

<style scoped>
.modal {
  background-image: url(/images/download12.jpg);
  background-size: 100% 100%;
}
.shaodw-inset-btns-auth {
  box-shadow: inset rgb(0 0 0 / 57%) 1px -2px 5px 7px,
    inset rgb(65, 51, 38) 3px 2px 4px 0px;
}
</style>
