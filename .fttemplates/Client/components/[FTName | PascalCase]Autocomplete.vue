<script setup lang="ts">
import { Prisma } from '@prisma/client'

// Types
import type { ISelectorProps } from '~/components/Selector/types/selector-props.type'

// Functions
import { use[FTName | PascalCase]Api } from '~/libs/[FTName | PascalCase]/client/functions/use[FTName | PascalCase]Api'

// Store
import { useInstanceStore } from '~/libs/Instance/instance.store'

type IProps = {
  modelValue?: any
  selectorProps?: ISelectorProps
  where?: Prisma.[FTName | PascalCase]WhereInput
  select?: Prisma.[FTName | PascalCase]Select
}

const props = defineProps<IProps>()

// Utils
const { [FTName | camelCase]FindMany } = use[FTName | PascalCase]Api()

// Store
const instanceStore = useInstanceStore()

// Layout
const model = defineModel()

const loadData: ISelectorProps['loadData'] = {
  fnc: opts =>
    [FTName | camelCase]FindMany(
      {
        args: {
          // Fetch more
          ...(opts.options?.fetchMore && {
            skip: opts.options?.currentRowsCount,
          }),

          // Instance ID
          ...(instanceStore.instanceId
            ? {
                where: {
                  instanceId: instanceStore.instanceId,
                  ...props.where,
                },
              }
            : props.where),

          take: 50,
          select: props.select,
        },
        search: opts.search,
        includeCount: !opts.options?.fetchMore,
      },
      { signal: opts.abortController?.signal }
    ),
  onSearch: true,
}
</script>

<template>
  <Selector
    v-bind="selectorProps"
    v-model="model"
    :label="selectorProps?.label ?? $t('[FTName | camelCase].self', 2)"
    :load-data="loadData"
    no-filter
    option-label="name"
  />
</template>
