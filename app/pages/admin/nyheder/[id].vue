<template>
  <div class="flex items-center justify-between mb-5">
    <h1 class="title !mb-0">{{isNew ? 'Opret nyhed' : 'Rediger nyhed'}}</h1>
    <NuxtLink to="/admin/nyheder">
    <UButton icon="i-lucide-undo" variant="ghost">Gå tilbage</UButton>
    </NuxtLink>
  </div>
  <div class="bg-white rounded-tr-xl rounded-bl-xl p-5 space-y-5">
    <div>
    <label class="mb-1">Titel</label>
    <UInput
      v-model="form.title"
      type="text"
      required
      class="w-full"
    />
    </div>
    <div>
    <label class="mb-1">Indhold</label>
      <client-only>
    <UEditor v-slot="{ editor }" v-model="form.content" content-type="json" class="w-full max-lg:px-2 py-2 [*_p]:!text-xs border border-neutral-300 rounded-xl min-h-80" :placeholder="{ placeholder: 'Skriv en beskrivelse her...', mode: 'firstLine' }">
      <UEditorToolbar class="border-b border-neutral-300 mb-3 pb-1 px-4" :editor="editor" :items="toolbarItems"/>
    </UEditor>
      </client-only>
    </div>
    <UButton icon="i-lucide-save" @click="save" :loading="loading">Gem</UButton>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
const toast = useToast()
import type { EditorToolbarItem } from '@nuxt/ui'

definePageMeta({
  layout: 'admin',
});

const id = route.params.id
const isNew = route.params.id === 'opret'
const form = reactive({
  title: '',
  content: null
})
const supabase = useSupabaseClient()
if(!isNew) {
  const {data, error} = await supabase
    .from('nyheder')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  if (data) {
    Object.assign(form, data)
  }
}

const toolbarItems: EditorToolbarItem[] = [
  { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold' },
  { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic' },
  { kind: 'heading', level: 1, icon: 'i-lucide-heading-1' },
  { kind: 'heading', level: 2, icon: 'i-lucide-heading-2' },
  { kind: 'heading', level: 3, icon: 'i-lucide-heading-3' },
  { kind: 'bulletList', icon: 'i-lucide-list' },
  { kind: 'orderedList', icon: 'i-lucide-list-ordered' },
  { kind: 'blockquote', icon: 'i-lucide-quote' },
  { kind: 'link', icon: 'i-lucide-link' }
]

const loading = ref(false)
async function save() {
  loading.value = true

  try {

    if (isNew) {
      // add new animal
      await supabase.from('nyheder').insert(form)

      toast.add({
        title: 'Nyhed blev oprettet.',
        icon: 'i-lucide-check',
        color: 'success',
        duration: 2000,
      })
    } else {
      // edit animal - append the pending files to the images field
      await supabase.from('nyheder').update(form).eq('id', id)

      toast.add({
        title: 'Nyhed blev ændret.',
        icon: 'i-lucide-check',
        color: 'success',
        duration: 2000,
      })
    }

    navigateTo('/admin/nyheder')
  } finally {
    loading.value = false
  }
}

</script>
