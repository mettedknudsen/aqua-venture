<template>
  <div class="flex items-center justify-between mb-5">
    <h1 class="title !mb-0">Nyheder</h1>
    <NuxtLink to="/admin/nyheder/opret">
    <UButton icon="i-lucide-plus">Tilføj nyhed</UButton>
    </NuxtLink>
  </div>
  <div class="bg-white rounded-tr-xl rounded-bl-xl">
  <client-only>
  <UTable :data="news" :columns="columns" class="[&_*]:align-top table-fixed w-full"
          loading-color="primary"
          loading-animation="carousel">
    <template #content-cell="{ getValue }">
      <UEditor
        :model-value="getValue()"
        content-type="json"
        :editable="false"
        class="min-h-10 [&_*]:px-0 line-clamp-3"
      />
    </template>
  </UTable>
  </client-only>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});
import type {Nyheder} from '~/types'
const toast = useToast()
const loading = ref(false)
const supabase = useSupabaseClient()

const {data: news, refresh} = await useAsyncData('admin-news', async () => {
  loading.value = true
  const {data, error} = await supabase
    .from('nyheder')
    .select('*')
    .order('created_at', {ascending: false})
  if (error) throw error
  loading.value = false
  return data
})

const columns: TableColumn<Nyheder>[] = [
  {
    accessorKey: 'title',
    header: 'Titel',
    meta: {
      class: {
        td: 'max-md:max-w-48 wrap-break-word break-all !whitespace-normal',
      }
    }
  },
  {
    accessorKey: 'content',
    header: 'Indhold',
    meta: {
      class: {
        th: 'hidden md:table-cell',
        td: 'hidden md:table-cell',
      }
    }
  },
  {
    id: 'actions',
    header: '',
    cell: ({row}) => h('div', {class: 'flex justify-end gap-2'}, [
      h(UButton, {
        variant: 'ghost',
        size: 'xs',
        icon: 'i-heroicons-pencil',
        onClick: () => navigateTo(`/admin/nyheder/${row.original.id}`),
      }),
      h(UButton, {
        variant: 'ghost',
        size: 'xs',
        icon: 'i-heroicons-trash',
        color: 'error',
        onClick: () => handleDelete(row.original.id),
      }),
    ])
  },
]
async function handleDelete(id) {
  if (!id) return
  if (!confirm('Er du sikker?')) return
  try {
    await supabase.from('nyheder').delete().eq('id', id)
    toast.add({ title: `"Nyhed blev slettet`, color: 'success' })
  } catch (e: any) {
    toast.add({ title: 'Fejl', description: e.data?.message || 'Kunne ikke slette nyhed', color: 'error' })
  } finally {
    await refresh()
  }
}

</script>
