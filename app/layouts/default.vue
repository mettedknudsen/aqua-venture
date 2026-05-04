<template>
  <Header/>
  <main class="aqua-container py-10 xl:grid grid-cols-12 gap-10">
    <div class="col-span-9 py-5 lg:py-10 ">
      <slot/>
    </div>
    <aside class="col-span-3 py-5 lg:py-10">
      <article class="bg-ocean-800 text-white text-sm rounded-tr-xl rounded-bl-xl py-10 px-5 mt-12.5">
        <h3 class="mb-3 font-bold">Kontakt</h3>
        <p class="mb-2">{{contactInfo.name}}Aqua Venture </p>
        <p class="mb-2">{{contactInfo.address}}Hjorthholmsvej 2A, 8000 Aarhus</p>
        <p class="mb-2">Telefon: <a class="text-ocean-200 hover:underline transition-colors duration-300 ease-in" :href="`tel:${contactInfo.phone}`">{{contactInfo.phone}}</a></p>
        <p>E-mail: <a class="text-ocean-200 hover:underline transition-colors duration-300 ease-in" :href="`mailto:${contactInfo.email}`">{{contactInfo.email}}</a></p>
      </article>
    </aside>
  </main>
  <Footer/>
</template>
<script setup lang="ts">
import {contactInfo} from '~/data/contact-info'
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
