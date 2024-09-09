<template>
  <div>
    <h1>List</h1>
    <div v-for="user in users" :key="user.id">
      <span @click="editUser(user)" class="pseudo">{{ user.id }} {{ user.first_name }} {{ user.last_name }}</span>
      - {{ user.email }}
    </div>

    <UserForm
      v-if="selectedUser.id !== null"
      :user="selectedUser"
      :isEditMode="true"
      :resetAfterSubmit="false"
      @submitUser="submitUser"
    />

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/users";
import UserForm from "@/components/UserForm.vue";

export default {
  components: {
    UserForm,
  },
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
        this.selectedUser = { id: null, email: "", first_name: "", last_name: "" };
      } else {
        this.selectedUser = { ...user };
      }
    },
    async submitUser() {
      const store = useUserStore();
      try {
        await store.updateUser(this.selectedUser);
        this.selectedUser = { id: null, email: "", first_name: "", last_name: "" };
        this.errorMessage = null;
      } catch (error) {
        this.errorMessage = error.message;
      }
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
</style>
