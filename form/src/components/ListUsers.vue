<template>
  <div class="hello">
    <h1>List</h1>
    <div v-for="user in users" :key="user.id">
      <span @click="editUser(user)" class="pseudo">{{ user.id }} {{ user.first_name }} {{ user.last_name }}</span>
      - {{ user.email }}
    </div>

    <UserForm
      v-if="selectedUser.id !== null"
      :user="selectedUser"
      :isEditMode="true"
      @submitUser="submitUser"
    />
  </div>
</template>

<script>
import { useUserStore } from "@/stores/users";
import { computed, onMounted } from "vue";
import UserForm from "@/components/UserForm.vue";

export default {
  components: {
    UserForm,
  },
  data() {
    return {
      selectedUser: {
        id: null,
        email: "",
        first_name: "",
        last_name: "",
      },
    };
  },
  setup() {
    const store = useUserStore();
    const users = computed(() => store.getUsers);

    onMounted(() => {
      store.fetchUsers();
    });

    return {
      users,
      store,
    };
  },
  methods: {
    editUser(user) {
      if (this.selectedUser?.id === user.id) {
        this.selectedUser.id = null;
      } else {
        this.selectedUser = { ...user };
      }
    },
    async submitUser() {
      console.log("passé");
      await this.store.updateUser(this.selectedUser);
      this.selectedUser = {
        id: null,
        email: "",
        first_name: "",
        last_name: "",
      };
    },
  },
};
</script>

<style scoped>
.pseudo {
  color: blue;
  cursor: pointer;
  text-decoration: underline;
}
</style>
