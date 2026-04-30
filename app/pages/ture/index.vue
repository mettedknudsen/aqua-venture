<template>
    <h1 class="title">Aktuelle ture</h1>
    <div class="grid md:grid-cols-2 gap-4 col-span-9">
      <NuxtLink v-for="(project) in projects" :key="project.id" class="relative" :to="`/ture/${project.slug}`">
        <figure class="group overflow-hidden">
        <NuxtImg
          :src="`/images/ture/${project.slug}/${project.images[0]}`"
          fit="cover"
          class="aspect-square md:aspect-[16/9] w-full transition duration-500 scale-120 group-hover:scale-140"
        />
        </figure>
        <h3 class="absolute bottom-0 inset-x-0 p-5 text-white bg-primary/60 font-medium text-lg">{{project.title}}</h3>
      </NuxtLink>
    </div>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()

const {data: projects} = await useAsyncData('trips', async () => {
  const {data, error} = await supabase
    .from('aktuelle-ture')
    .select('*')
    .order('slug', {ascending: true})
  if(error) throw error
  return data
})
</script>
