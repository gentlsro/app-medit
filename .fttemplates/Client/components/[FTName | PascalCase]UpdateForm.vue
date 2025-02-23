<script setup lang="ts">
import { type [FTName | PascalCase]PartialWithRelations, [FTName | PascalCase]UpdateInputSchema } from '~z'

// Functions
import { use[FTName | PascalCase]Api } from '~/libs/[FTName | PascalCase]/client/functions/use[FTName | PascalCase]Api'

// Components
import UpdateForm from '~/libs/Shared/components/Form/UpdateForm.vue'
import { use[FTName | PascalCase]Utils } from '~/libs/[FTName | PascalCase]/client/functions/use[FTName | PascalCase]Utils'

const props = defineProps<{
  [FTName | camelCase]: [FTName | PascalCase]PartialWithRelations & { id: number }
}>()

// Utils
const { isLoading, handleRequest } = useRequest()
const { [FTName | camelCase]UpdateOne, [FTName | camelCase]DeleteOne } = use[FTName | PascalCase]Api()
const { get[FTName | PascalCase]Input, get[FTName | PascalCase]UpdateDto } = use[FTName | PascalCase]Utils()

// Layout
const updateFormEl = ref<ComponentInstance<typeof UpdateForm>>()
const isEditing = ref(false)
const { model: [FTName | camelCase], isModified } = useRefReset(
  () => props.[FTName | camelCase],
  {
    modifyFnc: [FTName | camelCase] => ({ ...get[FTName | PascalCase]Input([FTName | camelCase]), id: [FTName | camelCase].id }),
  },
)

const dto = computed(() => get[FTName | PascalCase]UpdateDto([FTName | camelCase].value))

// Methods
async function handleUpdate() {
  await handleRequest(
    () => [FTName | camelCase]UpdateOne({ where: { id: props.[FTName | camelCase].id }, data: dto.value }),
    {
      $z,
      notifySuccess: true,
      logging: { operationName: '[FTName | camelCase].update' },
      merge: { originalObj: [FTName | camelCase] },
      onComplete: () => {
        updateFormEl.value?.sync()
        isEditing.value = false
      },
    },
  )
}

async function handleDelete() {
  await handleRequest(() => [FTName | camelCase]DeleteOne({ where: { id: props.[FTName | camelCase].id } }), {
    notifySuccess: true,
    logging: { operationName: '[FTName | camelCase].delete' },
  })
}

// Validation
const $z = useZod({ [FTName | camelCase]: [FTName | PascalCase]UpdateInputSchema }, { [FTName | camelCase]: dto })
</script>

<template>
  <UpdateForm
    ref="updateFormEl"
    v-model:is-editing="isEditing"
    v-model="[FTName | camelCase]"
    :loading="isLoading"
    :label="$t('general.save')"
    :entity="{ id: [FTName | camelCase].id, name: '[FTName | camelCase]' }"
    :submit-disabled="!isModified"
    @submit="handleUpdate"
    @delete="handleDelete"
  >
    <!-- General data -->
    <Section2
      :title="$t('general.generalInfo')"
      class="data-section"
    >
      <[FTName | PascalCase]GeneralData
        :[FTName | paramcase]="[FTName | camelCase]"
        :editable="isEditing"
      />
    </Section2>
  </UpdateForm>
</template>
