<template>
  <div class="greetings">
    <h1 class="green">{{ TITLE }}</h1>
    <h3>
      This site is designed to teach you how to make a
      <span class="white italic">form</span>
    </h3>
  </div>
</template>

<script>
import { TITLE } from "./constants/constant";

export default {
  data() {
    return {
      TITLE,
    };
  },
};
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.italic {
  font-style: italic;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    display: block;
    text-align: left;
  }
}
</style>
