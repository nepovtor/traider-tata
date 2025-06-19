<template>
  <div class="p-4">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl">Dashboard</h1>
      <button class="bg-red-500 text-white px-2 py-1" @click="logout">Logout</button>
    </div>
    <div v-if="store.user" class="mb-4">
      <p><strong>Name:</strong> {{ store.user.name }}</p>
      <p><strong>Email:</strong> {{ store.user.email }}</p>
    </div>
    <div>
      <canvas id="chart" height="100"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import axios from '../utils/axios';
import Chart from 'chart.js/auto';

const store = useAuthStore();

async function logout() {
  await store.logout();
  window.location.href = '/login';
}

async function load() {
  await store.fetchUser();
  const res = await axios.get('/stats');
  const ctx = document.getElementById('chart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Trades', 'Win Rate', 'Profit'],
      datasets: [{
        label: 'Stats',
        data: [res.data.total_trades, res.data.win_rate, res.data.profit],
        backgroundColor: ['blue', 'green', 'orange'],
      }]
    }
  });
}

onMounted(load);
</script>
