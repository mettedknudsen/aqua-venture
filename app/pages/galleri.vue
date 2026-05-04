<template>
  <section class="py-10 grid lg:grid-cols-12 aqua-container">
  <h1 class="title col-span-12">Vores galleri</h1>
  <p class="neutral-500 col-span-9">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus asperiores dolore dolorum, ea excepturi explicabo impedit iusto modi necessitatibus nobis odio officiis porro quae quaerat repudiandae soluta vitae voluptas voluptates.</p>
  </section>
  <div class="grid lg:grid-cols-2 gap-3 mb-20 aqua-container">
    <figure v-for="image in images" class="group overflow-hidden relative">
      <NuxtImg :src="getImageUrl(image.image_url)" loading="lazy" :alt="image.image_url"
        class="w-full object-cover md:aspect-video group-hover:scale-140 transition-scale duration-500 ease-in-out"
      />
        <UModal
          v-model="isModalOpen"
          fullscreen
          close-icon="i-lucide-x"
          :ui="{
            overlay: 'bg-ocean-900/70',
            content: 'bg-transparent flex items-center justify-center !pointer-events-none [&_*]:lg:max-w-6xl',
            close: 'bg-white',
          }"
        >
          <UButton icon="i-lucide-fullscreen" variant="ghost" class="hidden md:block text-white absolute top-4 right-4 z-10 hover:bg-white/20 [&_span]:block [&_span]:size-6" />
            <template #body>
              <figure class="overflow-hidden pointer-events-auto">
                <img :src="getImageUrl(image.image_url)" class="rounded size-full object-cover" :alt="image.image_url" />
              </figure>
          </template>
        </UModal>

    </figure>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'full',
});

const isModalOpen = ref(false)

const supabase = useSupabaseClient()
const {data: images} = await useAsyncData('gallery', async () => {
  const {data, error} = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', {ascending: false})
  if(error) throw error
  return data
})

function getImageUrl(path: string) {
  const { data } = supabase.storage
    .from('galleri')
    .getPublicUrl(path)
  return data.publicUrl
}
</script>
