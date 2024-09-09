<template>
  <div class="greetings">
    <form @submit.prevent="submit">
      <div class="InputForm">
        <label for="id">ID :</label>
        <input
          type="number"
          id="id"
          v-model="getUser.id"
          placeholder="147"
          :disabled="isEditMode"
          required
        />
      </div>
      <div class="InputForm">
        <label for="email">Email :</label>
        <input
          type="email"
          id="email"
          v-model="getUser.email"
          placeholder="example@gmail.com"
          required
        />
      </div>
      <div class="InputForm">
        <label for="first_name">First Name :</label>
        <input
          type="text"
          id="first_name"
          v-model="getUser.first_name"
          placeholder="John"
          required
        />
      </div>
      <div class="InputForm">
        <label for="last_name">Last Name :</label>
        <input
          type="text"
          id="last_name"
          v-model="getUser.last_name"
          placeholder="Doe"
          required
        />
      </div>
      <button type="submit" @input="$emit('input', $event.target.value)">
        {{ isEditMode ? "Update" : "Save" }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      getUser: this.user,
    };
  },
  watch: {
    user: {
      handler(newUser) {
        this.localUser = { ...newUser };
      },
      deep: true,
    },
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    resetAfterSubmit: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    submit() {
      this.$emit("submitUser", this.localUser);
      if (this.resetAfterSubmit && !this.isEditMode) {
        this.resetForm();
      }
    },
    resetForm() {
      this.getUser = { id: "", email: "", first_name: "", last_name: "" };
    },
  },
};
</script>

<style scoped>
.InputForm {
  margin-bottom: 1rem;
}
</style>
