import { defineStore } from 'pinia';
import axios from '../utils/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: null }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    async fetchUser() {
      try {
        const res = await axios.get('/user');
        this.user = res.data;
      } catch (e) {
        this.user = null;
      }
    },
    async logout() {
      await axios.post('/logout');
      this.user = null;
    },
  },
});
