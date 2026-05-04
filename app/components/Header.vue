<template>
  <aside class="z-40 fixed inset-0 bg-ocean-800 text-white size-full overflow-y-scroll transition-transform duration-300 md:hidden"
         :class="isOpen ? 'translate-x-0' : 'translate-x-full'">
    <div class="top-3 absolute inset-x-0 mx-3 flex justify-end">
      <UButton icon="i-lucide-x" @click="isOpen = !isOpen" class="!p-1 [&_span]:size-6 mb-3"/>
    </div>
    <NuxtLink to="/" title="Til forside" class="absolute top-3 left-5">
      <NuxtImg src="/images/aqua-venture-light-logo.svg" width="150" alt="Aqura Venture Logo" @click="isOpen = false"/>
    </NuxtLink>
    <nav class="pt-30 px-5">
      <ul class="space-y-5 lg:space-y-3">
        <li v-for="item in navItems" :key="item.to">
          <template v-if="item.items">
            <details :open="isActive(item)">
              <summary class="flex items-center justify-between">
                <NuxtLink
                    :to="item.to"
                    :class="isActive(item) ? 'text-accent-light' : ''"
                    class="max-lg:text-2xl"
                    @click="isOpen = false"
                >
                  <span>{{ item.label }}</span>
                </NuxtLink>
              </summary>
              <ul class="flex flex-col -mx-5 mt-3">
                <li v-for="childItem in item.items" :key="childItem.to" class="bg-ocean-600 border-b-3 py-3 px-8 border-ocean-800">
                  <NuxtLink
                    :to="childItem.to"
                    active-class="text-accent-dark"
                    class="max-lg:text-2xl"
                    @click="isOpen = false"
                  >
                    {{ childItem.label }}
                  </NuxtLink>
                </li>
              </ul>
            </details>
          </template>
          <NuxtLink v-else
            :to="item.to"
            :class="isActive(item) ? 'text-accent-light' : ''"
            class="max-lg:text-2xl"
            @click="isOpen = false"
          >
            <span>{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </aside>
  <header class="bg-white sticky top-0 z-30 shadow-sm">
    <div class="aqua-container flex items-center max-md:justify-between">
      <NuxtLink to="/" title="Til forside" class="max-md:hidden">
        <NuxtImg src="/images/aqua-venture-logo.svg" width="130" class="py-1" alt="Aqura Venture Logo"/>
      </NuxtLink>
      <NuxtLink to="/" title="Til forside" class="md:hidden my-1">
        <NuxtImg src="/images/aqua-venture-logo.svg" width="100" alt="Aqura Venture Logo"/>
      </NuxtLink>

      <nav class="max-md:hidden h-12 py-0 grow md:ml-4 lg:ml-10">
        <ul class="flex items-center space-x-4 justify-start h-full">
          <li v-for="item in navItems" :key="item.to" class="h-full flex items-center relative" :class="item.items ? 'group' : ''">
            <NuxtLink
              :to="item.to"
              class="text-ocean-900 font-semibold py-4.5 px-2 transition-colors duration-75 ease-in"
              :class="item.items ? 'hover:bg-accent-light hover:!text-white group-hover:bg-accent-light' : 'hover:text-accent-light'"
            >
              <span :class="isActive(item) ? 'text-accent-light group-hover:text-white' : ''">{{ item.label }}</span>
            </NuxtLink>
            <ul v-if="item.items" class="hidden group-hover:block group-hover:animate-fade-in-scale transition-opacity duration-75 ease-in absolute -left-4 top-12.5 bg-accent-light hover:block space-y-3 p-5 w-50">
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
      <UModal :ui="{overlay: 'bg-ocean-900/70' }">
      <UButton variant="ghost" class="fixed right-0 top-20 lg:static bg-primary text-white max-lg:rounded-r-none max-lg:pr-3 lg:bg-white lg:text-primary [&_span]:!size-7 p-1 my-1" icon="i-lucide-search"/>
        <template #content>
          <UCommandPalette
            placeholder="Søg indhold..."
            class="h-80"
          />
        </template>
      </UModal>
      <UButton class="md:hidden bg-white text-primary [&_span]:!size-7 p-1 hover:bg-white my-1" @click="isOpen = !isOpen" icon="i-lucide-waves"/>
    </div>
  </header>
</template>
<script setup lang="ts">
import {navItems} from '~/data/nav-items'
import {useNavigation} from "../composables/useNavigation";
const {isActive} = useNavigation()
const isOpen = useNavMenu()
</script>
