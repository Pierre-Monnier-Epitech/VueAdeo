<template>
  <div class="greetings">
    <HeaderTitle :title="TITLE_FORM" />
    <UserForm
      :user="newUser"
      :isEditMode="false"
      :resetAfterSubmit="true"
      @submitUser="submitUser"
    />
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/users";
import UserForm from "@/components/UserForm.vue";
import HeaderTitle from "@/components/HeaderTitle.vue";
import { TITLE_FORM } from "@/components/constants/constant";

export default {
  components: {
    HeaderTitle,
    UserForm,
  },
  data() {
    return {
      newUser: {
        id: "",
        email: "",
        first_name: "",
        last_name: "",
      },
      users: [],
      errorMessage: "",
      successMessage: "",
      TITLE_FORM,
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      const store = useUserStore();
      try {
        this.users = await store.fetchUsers();
        this.users = store.getUsers;
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async checkIfIdExists(id) {
      return this.users.some((user) => String(user.id) === String(id));
    },

    async submitUser() {
      const store = useUserStore();
      const idExists = await this.checkIfIdExists(this.newUser.id);

      if (idExists) {
        this.errorMessage = "ID already taken. Please choose another ID.";
        this.successMessage = null;
        return;
      }
      store.createUser(
        this.newUser.id,
        this.newUser.email,
        this.newUser.first_name,
        this.newUser.last_name
      );
      this.newUser = {
        id: "",
        email: "",
        first_name: "",
        last_name: "",
      };
      this.errorMessage = null;
      this.successMessage = "your account has been successfully created";
    },
  },
};
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

form {
  padding: 1rem 2rem;
}

.greetings h1 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1 {
    display: block;
    text-align: left;
  }
}

.error-message {
  color: red;
  font-weight: bold;
}

.success-message {
  color: green;
  font-weight: bold;
}
</style>
