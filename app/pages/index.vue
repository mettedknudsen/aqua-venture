<template>
  <Hero />
  <Slider/>
  <News/>
</template>
<script setup lang="ts">
import Hero from "../components/Hero.vue";
import News from "../components/News.vue";
import Slider from "../components/Slider.vue";
definePageMeta({
  layout: 'full',
});
</script>
