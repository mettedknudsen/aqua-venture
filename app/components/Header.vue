<template>
  <aside class="z-40 fixed inset-0 bg-ocean-800 text-white size-full overflow-y-scroll transition-transform duration-300 md:hidden"
         :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
    <div class="top-3 absolute inset-x-0 mx-5 flex justify-end">
      <UButton icon="i-lucide-x" @click="isOpen = !isOpen" class="!p-1 [&_span]:size-6 mb-3"/>
    </div>
    <NuxtLink to="/" title="Til forside" class="absolute top-6 left-7">
<!--      <NuxtImg src="/pawmatch-logo-simple.png" width="100" alt="PawMatch Logo" @click="isOpen = false"/>-->
    </NuxtLink>
    <nav class="py-20 px-5">
      <ul class="space-y-5 lg:space-y-3">
        <li v-for="item in navItems" :key="item.to">
          <NuxtLink
            :to="item.to"
            :class="isActive(item) ? 'text-accent-dark' : ''"
            class="max-lg:text-2xl"
            @click="isOpen = false"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
  <header class="bg-white sticky top-0 z-10 shadow-sm">
    <div class="aqua-container flex items-center">
      <NuxtLink to="/" title="Til forside">
<!--        <NuxtImg src="/pawmatch-logo.png" width="150" alt="PawMatch Logo"/>-->
      </NuxtLink>

      <nav class="max-md:hidden h-12 py-0">
        <ul class="flex items-center space-x-4 justify-center h-full">
          <li v-for="item in navItems" :key="item.to" class="h-full flex items-center relative group">
            <NuxtLink
              :to="item.to"
              active-class="text-accent-dark"
              class="text-ocean-900 font-semibold p-3.5 transition-colors duration-75 ease-in"
              :class="[(isActive(item) ? 'text-accent-dark' : ''), (item.items ? 'hover:bg-accent-dark hover:text-white hover:border-b border-accent-dark group-hover:bg-accent-dark' : 'hover:text-accent-dark')]"
            >
              {{ item.label }}
            </NuxtLink>
            <ul v-if="item.items" class="hidden group-hover:block group-hover:animate-fade-in-scale transition-opacity duration-75 ease-in absolute -left-4 top-12.5 bg-accent-dark hover:block space-y-3 p-5 w-50">
            <li v-for="childItem in item.items" :key="childItem.to">
              <NuxtLink
                :to="childItem.to"
                active-class="text-white"
                class="text-ocean-950 hover:text-white font-semibold transition-colors duration-100 ease-in"
              >
                {{ childItem.label }}
              </NuxtLink>
            </li>
          </ul>
          </li>
        </ul>
      </nav>

      <UButton class="md:hidden bg-white text-primary [&_span]:!size-7 p-1 [&_svg]:stroke-2 hover:bg-white my-1" @click="isOpen = !isOpen" icon="i-lucide-waves-horizontal"/>
    </div>
  </header>
</template>
<script setup lang="ts">
const route = useRoute()
const isOpen = useNavMenu()
const isActive = (item) => {
  if (route.fullPath === item.to ) return true
  return route.fullPath.includes(item.to)
}


const navItems = [
  {to: '/om', label: 'Om Aqua Venture'},
  {to: '/ture', label: 'Aktuelle ture',
    items: [
      {to: '/ture/norge', label: 'Dyk i Norge'},
      {to: '/ture/danmark', label: 'Dyk i Danmark'},
      {to: '/ture/tyskland', label: 'Dyk i Tyskland'},
      {to: '/ture/malta', label: 'Dyk i Malta'},
    ]
  },
  {to: '/galleri', label: 'Galleri'},
  {to: '/kontakt', label: 'Kontakt'},
  {to: '/ansatte', label: 'Ansatte'},
]
</script>
