<template>
  <div class="py-10 aqua-container">
    <UCarousel
      v-slot="{ item }"
      class-names
      arrows
      dots
      :items="trip?.images"
      :ui="{
        root: 'lg:mx-20 max-lg:mb-5',
        container: 'w-full max-lg:mb-5',
        item: 'basis-[85%] lg:basis-[70%] transition-opacity [&:not(.is-snapped)]:opacity-20',
        next: 'max-lg:hidden disabled:opacity-20 max-lg:',
        prev: 'max-lg:hidden disabled:opacity-20',
        dots: 'lg:hidden',
        dot: 'size-5 data-[state=active]:bg-primary border data-[state=active]:border-primary border border-ocean-700/50 bg-ocean-700/20'
      }"
    >
    <NuxtImg :src="`/images/ture/${slug}/${item}`" width="1920" class="rounded-lg aspect-square w-full lg:aspect-[16/9] max-h-150 object-cover" loading="lazy"/>
  </UCarousel>
  <section class="py-10 lg:py-20 lg:grid grid-cols-12 aqua-container">
    <client-only>
    <UEditor v-if="trip?.content" content-type="json" v-model="trip.content" :editable="false"
             class="[&_div]:!p-0 lg:mx-10 col-start-2 col-span-8"/>
    </client-only>
  </section>
  </div>

</template>
<script setup lang="ts">
definePageMeta({
  layout: 'full',
});

const supabase = useSupabaseClient()
const route = useRoute()
const slug = route.params.slug

const {data: trip} = await useAsyncData(`upcoming-trip-${slug}`, async () => {
  const {data, error} = await supabase
    .from('aktuelle-ture')
    .select('*')
    .eq('slug', slug)
    .single()

  if(error) {
    throw createError({
      status: 404,
      statusText: 'Siden blev ikke fundet',
      fatal: true
    })
  }

  return data
})
</script>
