<template>
  <h1 class="title">Galleri</h1>
  <pre>
    {{images}}
  </pre>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()
const {data: images} = await useAsyncData('gallery', async () => {
  const {data, error} = await supabase
    .from('gallery')
    .select('*')
  if(error) throw error
  return data
})

function getImageUrl(path: string) {
  const { data } = supabase.storage
    .from('animals')
    .getPublicUrl(path)
  return data.publicUrl
}
</script>
