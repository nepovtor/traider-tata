<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl mb-4">Login</h1>
    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email" class="border p-2 w-full mb-2" />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 w-full mb-2" />
      <button class="bg-blue-500 text-white px-4 py-2" type="submit">Login</button>
    </form>
    <p class="mt-2">Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '../utils/axios';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const store = useAuthStore();
const router = useRouter();

async function submit() {
  try {
    await axios.post('/login', { email: email.value, password: password.value });
    await store.fetchUser();
    router.push('/dashboard');
  } catch (e) {
    alert('Login failed');
  }
}
</script>
