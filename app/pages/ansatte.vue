<template>

      <h1>Ansatte</h1>
      <section>
        <h2>afdeling</h2> <!-- TODO: opdel array i flere arrays baseret på afdeling -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-200">
          <article v-for="employee in employees" :key="employee.id">
            <NuxtImg :src="`/images/ansatte/${employee.image}`" :alt="employee.name" loading="lazy" width="300" class="aspect-square object-cover w-full"/>
            <div class="p-4 bg-white">
              <h3 class="mb-3 font-bold text-ocean-800">{{ employee.name }}</h3>
              <p>Tlf.: <a class="text-ocean-400 hover:underline transition-colors duration-300 ease-in" :href="`tel:${employee.phone}`">{{ employee.phone }}</a></p>
              <p>Email: <a class="text-ocean-400 hover:underline transition-colors duration-300 ease-in" :href="`mailto:${employee.email}`">{{ employee.email }}</a></p>
            </div>
          </article>
        </div>
      </section>


  <pre>
    {{ employees }}
  </pre>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()

const {data: employees} = await useAsyncData('employees', async () => {
  const {data, error} = await supabase
    .from('ansatte')
    .select('*')
    .order('name', {ascending: true})
  if(error) throw error
  return data
})

</script>
