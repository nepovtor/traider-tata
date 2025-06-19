<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl mb-4">Register</h1>
    <form @submit.prevent="submit">
      <input v-model="name" type="text" placeholder="Name" class="border p-2 w-full mb-2" />
      <input v-model="email" type="email" placeholder="Email" class="border p-2 w-full mb-2" />
      <input v-model="password" type="password" placeholder="Password" class="border p-2 w-full mb-2" />
      <button class="bg-blue-500 text-white px-4 py-2" type="submit">Register</button>
    </form>
    <p class="mt-2">Already have an account? <router-link to="/login" class="text-blue-500">Login</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '../utils/axios';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const router = useRouter();

async function submit() {
  try {
    await axios.post('/register', { name: name.value, email: email.value, password: password.value });
    router.push('/login');
  } catch (e) {
    alert('Registration failed');
  }
}
</script>
