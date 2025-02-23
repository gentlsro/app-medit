<script setup lang="ts">
const { $client } = useNuxtApp()

const seed = [
  // Users
  {
    label: 'Users',
    seed: () => $client.user.seed.mutate(),
    delete: () => $client.user.deleteMany.mutate({}),
  },

  // Files
  {
    label: 'Files',
    // seed: () => $fetch('/api/file/seed'),
    // delete: () => $fetch('/api/file/deleteMany'),
  },
]
</script>

<template>
  <PageWrapper
    :ui="{ contentClass: 'flex-center' }"
  >
    <List
      :items="seed"
      item-key="label"
      :sorting-config="{ enabled: false }"
    >
      <template #item="{ row }">
        <span grow>
          {{ row.label }}
        </span>

        <div flex="~">
          <Btn
            v-show="row.ref.seed"
            icon="i-mdi:seed-outline"
            size="sm"
            @click="row.ref.seed"
          />

          <CrudBtnDelete
            v-show="row.ref.delete"
            size="sm"
            @delete="row.ref.delete"
          />
        </div>
      </template>
    </List>
  </PageWrapper>
</template>
