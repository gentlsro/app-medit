<script setup lang="ts">
import type { [FTName | PascalCase]PartialWithRelations } from '~z'

type IProps = {
  editable?: boolean
  [FTName | camelCase]: [FTName | PascalCase]PartialWithRelations
}

const props = defineProps<IProps>()

// Layout
const [FTName | camelCase] = toRef(props, '[FTName | camelCase]')

// Validation
useZod()
</script>

<template>
  <pre>{{ [FTName | camelCase] }}</pre>
</template>
