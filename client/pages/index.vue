<script setup lang="ts">
const { $client } = useNuxtApp()

const { data } = $client.user.findMany.useQuery({
  args: {
    where: { id: { lte: 20 } },
    select: { id: true, firstName: true },
  },
})
</script>

<template>
  <PageWrapper>
    Hola

    <pre>{{ data }}</pre>
  </PageWrapper>
</template>
