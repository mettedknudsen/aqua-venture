<template>
  <Header/>
  <main class="aqua-container py-10 lg:grid grid-cols-12">
    <div class="col-span-9 py-5 lg:py-10 ">
      <slot/>
    </div>
    <aside class="col-span-3 py-5 lg:py-10">

    </aside>
  </main>
  <Footer/>
</template>
<script setup lang="ts">
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
