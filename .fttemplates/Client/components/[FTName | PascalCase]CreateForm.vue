<script setup lang="ts">
import { [FTName | PascalCase]CreateInputSchema } from '~z'

// Injections
import { tableRefreshKey } from '~/components/Table/provide/table.provide'

// Functions
import { use[FTName | PascalCase]Api } from '~/libs/[FTName | PascalCase]/client/functions/use[FTName | PascalCase]Api'
import { use[FTName | PascalCase]Utils } from '~/libs/[FTName | PascalCase]/client/functions/use[FTName | PascalCase]Utils'

// Utils
const { isLoading, handleRequest } = useRequest()
const { [FTName | camelCase]CreateOne } = use[FTName | PascalCase]Api()
const { get[FTName | PascalCase]Input, get[FTName | PascalCase]CreateDto } = use[FTName | PascalCase]Utils()

// Layout
const instance = useInstanceStore().getActiveInstance()
const { model: [FTName | camelCase] } = useRefReset(get[FTName | PascalCase]Input({ instance }))

const dto = computed(() => get[FTName | PascalCase]CreateDto([FTName | camelCase].value))

// Methods
async function handleCreate() {
  const { id } = await handleRequest(
    () => [FTName | camelCase]CreateOne({ data: dto.value }),
    {
      $z,
      notifySuccess: true,
      logging: { operationName: '[FTName | camelCase].creation' },
    },
  )

  $nav(`/${[FTName | paramcase]}/${id}`)
}

// Validation
const $z = useZod(
  { [FTName | camelCase]: [FTName | PascalCase]CreateInputSchema },
  { [FTName | camelCase]: dto }
)
</script>

<template>
  <CreateForm
    :label="$t('general.save')"
    :loading="isLoading"
    :model-value="[FTName | camelCase]"
    entity-name="[FTName | camelCase]"
    @submit="handleCreate"
  >
    <!-- General data -->
    <Section2
      :title="$t('general.generalInfo')"
      class="data-section"
    >
      <[FTName | PascalCase]GeneralData
        :[FTName | paramcase]="[FTName | camelCase]"
        editable
      />
    </Section2>
  </CreateForm>
</template>
