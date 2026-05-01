<template>
  <Header/>
  <main class="aqua-container py-10 xl:grid grid-cols-12 gap-10">
    <div class="col-span-9 py-5 lg:py-10 ">
      <slot/>
    </div>
    <aside class="col-span-3 py-5 lg:py-10">
      <article class="bg-ocean-800 text-white rounded-tr-xl rounded-bl-xl py-10 px-5 mt-12.5">
        <h3 class="mb-3 font-bold">Kontakt</h3>
        <p class="mb-2">Aqua Venture </p>
        <p class="mb-2">Hjorthholmsvej 2A, 8000 Aarhus</p>
        <p class="mb-2">Telefon:
          <a class="text-ocean-200 hover:underline transition-colors duration-300 ease-in" href="tel:86 35 10 00">86 35 10 00</a>
        </p>
        <p>E-mail:
          <a class="text-ocean-200 hover:underline transition-colors duration-300 ease-in" href="mailto:contact@aquaventure.dk">contact@aquaventure.dk</a>
        </p>

        <div v-if="secretary">
          <figure class="relative" >
            <NuxtImg :src="`/images/ansatte/${secretary.image}`" :alt="secretary.name" loading="lazy" width="300" class="aspect-square object-cover w-full"/>
            <div class="w-12 h-3 bg-ocean-600 absolute left-0 -bottom-2">
            </div>
          </figure>
          <div class="p-4 bg-white">
            <h3 class="mb-3 font-bold text-ocean-800">{{ secretary.name }}</h3>
            <p>Tlf.: <a class="text-ocean-400 hover:underline transition-colors duration-300 ease-in" :href="`tel:${secretary.phone}`">{{ secretary.phone }}</a></p>
            <p>Email: <a class="text-ocean-400 hover:underline transition-colors duration-300 ease-in" :href="`mailto:${secretary.email}`">{{ secretary.email }}</a></p>
          </div>
        </div>

      </article>
    </aside>
  </main>
  <Footer/>
</template>
<script setup lang="ts">
const {data: secretary} = await useAsyncData('secretary', async () => {
  const {data, error} = await supabase
    .from('ansatte')
    .select('*')
    .eq('id', 4)
    .single()

  if(error) throw error
  return data
})
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
