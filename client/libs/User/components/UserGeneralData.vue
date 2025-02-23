<script setup lang="ts">
import type { UserPartialWithRelations } from '~z'

type IProps = {
  editable?: boolean
  user: UserPartialWithRelations
}

const props = defineProps<IProps>()

// Layout
const user = toRef(props, 'user')

// Validation
useZod()
</script>

<template>
  <pre>{{ user }}</pre>
</template>
