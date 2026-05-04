<template>
    <h1 class="title">Aktuelle ture</h1>
    <div class="grid md:grid-cols-2 gap-4 col-span-9">
      <NuxtLink v-for="trip in trips" :key="trip.id" class="relative" :to="`/ture/${trip.slug}`">
        <figure class="group overflow-hidden">
        <NuxtImg
          :src="`/images/ture/${trip.slug}/${trip.images[0]}`"
          fit="cover"
          :alt="`tur i ${trip.slug}`"
          class="aspect-square md:aspect-[16/9] w-full transition duration-500 scale-120 group-hover:scale-140"
        />
        </figure>
        <h3 class="absolute bottom-0 inset-x-0 p-5 text-white bg-primary/60 font-medium text-lg">{{trip.title}}</h3>
      </NuxtLink>
    </div>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()

const {data: trips} = await useAsyncData('trips', async () => {
  const {data, error} = await supabase
    .from('aktuelle-ture')
    .select('*')
    .order('slug', {ascending: true})
  if(error) throw error
  return data
})
</script>
