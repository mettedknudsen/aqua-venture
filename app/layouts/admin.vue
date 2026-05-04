<template>
<div class="lg:grid grid-cols-12">
  <aside class="lg:col-span-3 2xl:col-span-2 bg-ocean-900 text-ocean-light h-screen px-5 pt-5 pb-10 max-lg:fixed inset-y-0 max-lg:w-full z-20 transition-transform duration-300 ease-in-out flex flex-col" :class="isOpen ? 'max-lg:translate-x-0' : 'max-lg:translate-x-full'">
    <NuxtLink to="/">
      <NuxtImg src="/images/admin-logo.svg" width="150" alt="Aqura Venture Logo"/>
    </NuxtLink>
    <UButton icon="i-lucide-x" @click="isOpen = !isOpen" class="!p-1 [&_span]:size-6 top-5 right-3 absolute lg:hidden"/>
    <nav class="grow">
      <ul class="space-y-5 py-10">
        <li v-for="item in adminMenu" :key="item.to">
          <NuxtLink
            :to="item.disabled ? '' : item.to"
            class="text-xl py-3 "
            @click="isOpen = false"
            :class="isActive(item) ? '[&_*]:text-accent-light' : ''"
          >
            <UButton :icon="item.icon" variant="ghost" class="w-full" :class="item.disabled ? 'hover:bg-transparent' : ''">
            {{ item.label }} <span v-if="item.disabled" class="text-neutral-300 bg-white/10 px-2 ml-2 rounded-lg text-xs py-1">coming soon</span>
            </UButton>
          </NuxtLink>
        </li>
      </ul>
    </nav>
      <UButton @click="signOut()" color="white" variant="ghost" class="hover:bg-white/10" icon="i-lucide-log-out">Log ud</UButton>
  </aside>
  <main class="aqua-container pb-20 lg:col-span-9 2xl:col-span-10 lg:max-h-screen lg:overflow-y-scroll lg:mt-10">
    <UButton icon="i-lucide-menu" variant="ghost" @click="isOpen = !isOpen" class="!p-1 [&_span]:size-6 lg:hidden my-5"/>
    <slot/>
  </main>
</div>
</template>
<script setup lang="ts">
import {useNavigation} from "../composables/useNavigation";
import {adminMenu} from '~/data/admin-menu'
import {useAdminMenu} from "../composables/useAdminMenu";
const user = useSupabaseUser()
const supabase = useSupabaseClient()

if(!user.value) {
  await navigateTo('/login')
}
const toast = useToast()

async function signOut() {
  await supabase.auth.signOut()
  navigateTo('/')
  toast.add({
    title: 'Du er nu logget ud.',
    icon: 'i-lucide-log-out',
    color: 'success',
    duration: 2000,
  })
}

const {isActive} = useNavigation()
const isOpen = useAdminMenu()

</script>
