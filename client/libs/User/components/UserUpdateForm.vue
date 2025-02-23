<script setup lang="ts">
import { type UserPartialWithRelations, UserUpdateInputSchema } from '~z'

// Functions
import { useUserApi } from '~/libs/User/client/functions/useUserApi'

// Components
import UpdateForm from '~/libs/Shared/components/Form/UpdateForm.vue'
import { useUserUtils } from '~/libs/User/client/functions/useUserUtils'

const props = defineProps<{
  user: UserPartialWithRelations & { id: number }
}>()

// Utils
const { isLoading, handleRequest } = useRequest()
const { userUpdateOne, userDeleteOne } = useUserApi()
const { getUserInput, getUserUpdateDto } = useUserUtils()

// Layout
const updateFormEl = ref<ComponentInstance<typeof UpdateForm>>()
const isEditing = ref(false)
const { model: user, isModified } = useRefReset(
  () => props.user,
  {
    modifyFnc: user => ({ ...getUserInput(user), id: user.id }),
  },
)

const dto = computed(() => getUserUpdateDto(user.value))

// Methods
async function handleUpdate() {
  await handleRequest(
    () => userUpdateOne({ where: { id: props.user.id }, data: dto.value }),
    {
      $z,
      notifySuccess: true,
      logging: { operationName: 'user.update' },
      merge: { originalObj: user },
      onComplete: () => {
        updateFormEl.value?.sync()
        isEditing.value = false
      },
    },
  )
}

async function handleDelete() {
  await handleRequest(() => userDeleteOne({ where: { id: props.user.id } }), {
    notifySuccess: true,
    logging: { operationName: 'user.delete' },
  })
}

// Validation
const $z = useZod({ user: UserUpdateInputSchema }, { user: dto })
</script>

<template>
  <UpdateForm
    ref="updateFormEl"
    v-model:is-editing="isEditing"
    v-model="user"
    :loading="isLoading"
    :label="$t('general.save')"
    :entity="{ id: user.id, name: 'user' }"
    :submit-disabled="!isModified"
    @submit="handleUpdate"
    @delete="handleDelete"
  >
    <!-- General data -->
    <Section2
      :title="$t('general.generalInfo')"
      class="data-section"
    >
      <UserGeneralData
        :user="user"
        :editable="isEditing"
      />
    </Section2>
  </UpdateForm>
</template>
