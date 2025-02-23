<script setup lang="ts">
import { UserCreateInputSchema } from '~z'

// Injections
import { tableRefreshKey } from '~/components/Table/provide/table.provide'

// Functions
import { useUserApi } from '~/libs/User/client/functions/useUserApi'
import { useUserUtils } from '~/libs/User/client/functions/useUserUtils'

// Utils
const { isLoading, handleRequest } = useRequest()
const { userCreateOne } = useUserApi()
const { getUserInput, getUserCreateDto } = useUserUtils()

// Layout
const instance = useInstanceStore().getActiveInstance()
const { model: user } = useRefReset(getUserInput({ instance }))

const dto = computed(() => getUserCreateDto(user.value))

// Methods
async function handleCreate() {
  const { id } = await handleRequest(
    () => userCreateOne({ data: dto.value }),
    {
      $z,
      notifySuccess: true,
      logging: { operationName: 'user.creation' },
    },
  )

  $nav(`/${user}/${id}`)
}

// Validation
const $z = useZod(
  { user: UserCreateInputSchema },
  { user: dto }
)
</script>

<template>
  <CreateForm
    :label="$t('general.save')"
    :loading="isLoading"
    :model-value="user"
    entity-name="user"
    @submit="handleCreate"
  >
    <!-- General data -->
    <Section2
      :title="$t('general.generalInfo')"
      class="data-section"
    >
      <UserGeneralData
        :user="user"
        editable
      />
    </Section2>
  </CreateForm>
</template>
