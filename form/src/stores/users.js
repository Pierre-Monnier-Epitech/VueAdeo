// stores/users.js

import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
  }),
  getters: {
    getUsers(state) {
      return state.users;
    },
  },
  actions: {
    async fetchUsers() {
      if (this.users.length === 0) {
        const response = await axios.get(
          "https://my-json-server.typicode.com/Pierre-Monnier-Epitech/bd/db"
        );
        this.users = response.data.data;
      }
    },
    async createUser(id, email, first_name, last_name) {
      await axios.post("https://jsonplaceholder.typicode.com/posts", {
        id: id,
        email: email,
        first_name: first_name,
        last_name: last_name,
      });
      this.users.push({
        id: id,
        email: email,
        first_name: first_name,
        last_name: last_name,
      });
      alert("Your account is created");
    },
    async updateUser(user) {
      try {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${user.id}`,
          user
        );
        const stateUser = this.users.findIndex((u) => u.id === user.id);
        if (stateUser !== -1) {
          this.users[stateUser] = response.data;
        }
        return response.data;
      } catch (error) {
        console.error("Failed to update user", error);
      }
    },
  },
});
