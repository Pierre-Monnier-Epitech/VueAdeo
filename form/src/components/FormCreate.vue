<template>
  <div class="greetings">
    <HeaderTitle :title="TITLE_FORM" />
    <UserForm :user="user" :isEditMode="false" @submitUser="submitUser" />
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
      user: {
        id: "",
        email: "",
        first_name: "",
        last_name: "",
      },
      TITLE_FORM,
    };
  },
  methods: {
    submitUser() {
      const store = useUserStore();
      store.createUser(this.user.id, this.user.email, this.user.first_name, this.user.last_name);
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

.InputForm {
  width: 100%;
  margin-bottom: 2rem;
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
</style>
