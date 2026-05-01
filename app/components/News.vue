<template>
<section class="bg-white">
  <div class="aqua-container py-10 lg:py-15">
  <h2 class="title">Nyheder</h2>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-10 py-3">
      <article v-for="n in news">
        <h3 class="font-bold mb-2">{{n?.title}}</h3>
        <hr class="bg-accent-dark border-accent-dark h-1 w-32 mb-4">
        <UEditor v-if="n?.content" content-type="json" v-model="n.content" :editable="false"
                 class="[&_div]:!p-0"/>
      </article>
    </div>
  </div>
</section>
  <svg id="b" xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 1414.06 47.25"><g id="c"><path class="d" d="M0,8.24h0c141.84,39.81,320.05,39.88,391.44,38.68,200.75-9.04,464.58-28.18,597.46-35.01,231.53-11.91,329.21-6.78,425.16,16V0H0v8.24h0Z"/></g></svg>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()

const {data: news} = await useAsyncData('news', async () => {
  const {data, error} = await supabase
    .from('nyheder')
    .select('*')
    .order('created_at', {ascending: false})
  if(error) throw error
  return data
})
</script>
