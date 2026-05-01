<template>
  <h1 class="title max-sm:text-center">Ansatte</h1>
  <hr class="bg-accent-dark border-accent-dark h-1 w-32 sm:hidden mx-auto mb-10">
    <section v-for="(deptEmployees, deptName) in groupedEmployees" :key="deptName" class="py-5 max-sm:text-center">
      <h2 class="mb-4 text-ocean-800 text-md font-bold max-sm:py-10" v-if="deptName && deptName !== 'intet'">{{ deptName }}</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:max-w-200 max-sm:place-items-center">
        <article v-for="employee in deptEmployees" :key="employee.id" class="max-md:w-70 rounded-tr-xl rounded-bl-xl overflow-hidden">
        <figure class="relative">
        <NuxtImg :src="`/images/ansatte/${employee.image}`" :alt="employee.name" loading="lazy" width="300" class="aspect-square object-cover w-full"/>
        <div class="w-12 h-3 bg-ocean-600 absolute left-0 -bottom-2">
        </div>
        </figure>
        <div class="p-4 bg-white">
          <h3 class="mb-3 font-bold text-ocean-800">{{ employee.name }}</h3>
          <p>Tlf.: <a class="text-ocean-400 hover:underline transition-colors duration-300 ease-in" :href="`tel:${employee.phone}`">{{ employee.phone }}</a></p>
          <p>Email: <a class="text-ocean-400 hover:underline transition-colors duration-300 ease-in" :href="`mailto:${employee.email}`">{{ employee.email }}</a></p>
        </div>
      </article>
    </div>
  </section>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()

const {data: employees} = await useAsyncData('employees', async () => {
  const {data, error} = await supabase
    .from('ansatte')
    .select('*')
    .order('id', {ascending: true})
  if(error) throw error
  return data
})

const groupedEmployees = computed(() => {
  return employees?.value?.reduce((newArray, employee) => {
    const dept = employee.department || 'intet'

    newArray[dept] ??= []
    newArray[dept].push(employee)

    return newArray
  }, {})
})
</script>
