<template>
  <main class="aqua-container py-20">
  <LoginForm />
  </main>
</template>
<script setup lang="ts">
import LoginForm from "../components/LoginForm.vue";
definePageMeta({
  layout: false,
});
</script>
