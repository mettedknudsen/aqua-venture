<template>
  <footer class="relative">
    <svg class="w-full relative -bottom-px" fill="#02283a" xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 1414.06 70.11">
      <g id="c">
        <path class="d"
              d="M1414.06,61.86h0c-265.14-3.18-422.6-44.13-509.22-54.99-199.39-25.01-219.48,24.46-486.93,48.14C295.72,70.11,29.95,56.99,0,34.12v35.99h1414.06v-8.24h0Z"/>
      </g>
    </svg>
    <div class="bg-ocean-800">
      <div class="aqua-container text-white pt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <section class="px-3 max-md:order-last">
          <h3 class="mb-3 font-bold">Kontakt</h3>
          <p class="mb-2">Aqua Venture </p>
          <p class="mb-2">Hjorthholmsvej 2A, 8000 Aarhus</p>
          <p class="mb-2">Telefon: <a class="text-ocean-200 hover:underline transition-colors duration-300 ease-in"
                                      href="tel:86 35 10 00">86 35 10 00</a></p>
          <p>E-mail: <a class="text-ocean-200 hover:underline transition-colors duration-300 ease-in"
                        href="mailto:contact@aquaventure.dk">contact@aquaventure.dk</a></p>
          <NuxtImg src="/images/aqua-venture-light-logo.svg" width="150" alt="Aqura Venture Logo" class="mt-10"/>
        </section>
        <nav class="px-3 max-md:py-10">
          <h3 class="mb-3 font-bold">Sider</h3>
          <ul class="space-y-5 lg:space-y-3">
            <li v-for="item in navItems" :key="item.to">
              <NuxtLink
                :to="item.to"
                :class="isActive(item) ? 'text-accent-light' : ''"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <div>
          <div class="px-3 max-lg:pb-10 md:pt-10 lg:pt-0 max-md:order-first">
            <h3 class="mb-4 font-bold">Tilmeld dig til vores nyhedsbrev</h3>

            <form class="" @submit.prevent="">
              <label class="mb-3 block">
                <span class="block">Navn</span>
                <UInput type="text" class="[&>*]:bg-ocean-50 md:w-64 max-md:w-full" required/>
              </label>
              <label class="mb-5 block">
                <span class="block">Email</span>
                <UInput type="email" class="[&>*]:bg-ocean-50 md:w-64 max-md:w-full" required/>
              </label>
              <UButton icon="i-lucide-mail-plus" class="max-md:w-full max-md:flex justify-center">Tilmeld</UButton>
            </form>

          </div>

        </div>
        <div class="md:col-span-2 lg:col-span-3 flex items-center justify-between text-ocean-100/50 border-t py-4 mt-10 max-md:order-last">
          <span class="text-xs px-3">© {{ year }} Aqua Venture · Alle rettigheder forbeholdes</span>
          <NuxtLink to="/admin/nyheder">
          <UButton variant="ghost" icon="i-lucide-settings" class="text-ocean-100/50"/>
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import {navItems} from '~/data/nav-items'
import {useNavigation} from "../composables/useNavigation";
const {isActive} = useNavigation()

const d = new Date();
let year = d.getFullYear();
</script>
