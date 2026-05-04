<template>
  <form class="rounded-tr-xl rounded-bl-xl space-y-5 px-10 bg-white lg:px-5 py-5 max-w-[500px] mx-auto" @submit.prevent="handleLogin">
    <NuxtLink to="/" title="Til forside" class="flex justify-center">
      <NuxtImg src="/images/aqua-venture-logo.svg" width="200" alt="Aqura Venture Logo"/>
    </NuxtLink>

    <h1 class="text-center title">Administrator <span class="text-primary">Login</span></h1>
    <div>
      <label class="mb-1">Email</label>
      <UInput
        v-model="email"
        type="email"
        required
        class="w-full"
      />
    </div>
    <div>
      <label class="mb-1">Adgangskode</label>
      <UInput
        v-model="password"
        placeholder="Kodeord"
        class="w-full"
        required
        :type="show ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1' }"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="show ? 'Skjul kodeord' : 'Vis kodeord'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
          />
        </template>
      </UInput>
    </div>

      <UButton type="submit" :loading="loading" icon="i-lucide-user" >
        Log ind
      </UButton>
    <p class="text-sm text-red-600 min-h-5"><span v-if="error">{{ error }}</span></p>
  </form>
  <div class="flex justify-center">
    <NuxtLink to="/">
    <UButton variant="ghost" icon="i-lucide-undo" class="mt-5" >
      Gå tilbage til forsiden
    </UButton>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const show = ref(false)

async function handleLogin() {
  loading.value = true
  error.value = ''

  try {
    const {error: err} = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (err) throw err

    navigateTo('/admin/nyheder')
  }
  catch (e: any) {
    error.value = 'Forkert email eller adgangskode'
  } finally {
    loading.value = false
  }
}
</script>
