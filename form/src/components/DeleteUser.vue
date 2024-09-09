<template>
  <div>
    <h1>List</h1>
    <div v-for="user in users" :key="user.id">
      <span @click="editUser(user)" class="pseudo"
        >{{ user.id }} {{ user.first_name }} {{ user.last_name }}</span
      >
      - {{ user.email }}
    </div>

    <div v-if="selectedUser.id !== null" class="confirmDelete">
      <p>
        Do you want to delete
        <span class="selectedUser"
          >{{ selectedUser.first_name }} {{ selectedUser.last_name }}</span
        >?
      </p>
      <div class="ensembleDeleteButton">
        <button class="confirmDeleteButton" @click="confirmDeleteUser">
          Confirm
        </button>
        <button class="cancelDeleteButton" @click="cancelDelete">Cancel</button>
      </div>
    </div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/users";

export default {
  data() {
    return {
      users: [],
      selectedUser: {
        id: null,
        email: "",
        first_name: "",
        last_name: "",
      },
      errorMessage: null,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const store = useUserStore();
      try {
        await store.fetchUsers();
        this.users = store.getUsers;
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    editUser(user) {
      if (this.selectedUser.id === user.id) {
        this.selectedUser = {
          id: null,
          email: "",
          first_name: "",
          last_name: "",
        };
      } else {
        this.selectedUser = { ...user };
      }
    },
    cancelDelete() {
      this.selectedUser = {
        id: null,
        email: "",
        first_name: "",
        last_name: "",
      };
    },
    async confirmDeleteUser() {
      const store = useUserStore();
      await store.deleteUser(this.selectedUser);
      this.selectedUser.id = null;
    },
  },
};
</script>

<style scoped>
.pseudo {
  color: green;
  cursor: pointer;
  text-decoration: underline;
}

.error-message {
  color: red;
  font-weight: bold;
}

.selectedUser {
  color: red;
  font-weight: bold;
  font-style: italic;
}

.confirmDelete {
  margin-top: 2rem;
}

.ensembleDeleteButton {
  margin-top: 1rem;
  margin-left: 2rem;
}

.cancelDeleteButton {
  margin-left: 1rem;
}
</style>
