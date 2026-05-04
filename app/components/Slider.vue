<template>
 <div class="bg-white">
  <section class="aqua-container pt-10 lg:pt-15">
    <h2 class="title">Se vores ture</h2>
    <div class="w-full overflow-y-hidden overflow-x-auto snap-x snap-mandatory carousel">
      <ul class="content w-full flex">
      <li v-for="trip in trips" :key="trip.slug" class="relative shrink-0 w-full snap-center carousel_item h-full aspect-square lg:aspect-[18/9]">
        <NuxtImg :src="`/images/ture/${trip.slug}/${trip.images[0]}`" :alt="`tur i ${trip.slug}`" class="h-full lg:w-full object-cover object-center"/>
        <div class="absolute inset-0 bg-ocean-800/40 p-3 lg:p-10 flex flex-col justify-end">
          <h3 class="text-2xl lg:text-4xl mb-5 text-ocean-light font-bold">{{trip.title}}</h3>
            <NuxtLink :to="`/ture/${trip.slug}`">
              <UButton icon="i-lucide-arrow-right">Læs om turen her</UButton>
            </NuxtLink>
        </div>
      <NuxtImg src="/images/aqua-venture-light-logo.svg" width="100" alt="Aqura Venture Logo" class="absolute top-3 right-3 lg:w-[150px]"/>
      </li>
      </ul>
    </div>
  </section>
 </div>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()

const {data: trips} = await useAsyncData('trips-block', async () => {
  const {data, error} = await supabase
    .from('aktuelle-ture')
    .select('*')
    .order('slug', {ascending: true})
  if(error) throw error
  return data
})
</script>
