<script setup lang="ts">
// Types
import type { ITableDataFetchFncInput } from '~/components/Table/types/table-query.type'

// Functions
import { useUserApi } from '~/libs/User/client/functions/useUserApi'
import { useUserUtils } from '~/libs/User/client/functions/useUserUtils'

// Components
import Table from '~/components/Table/Table.vue'

// Utils
const { userFindMany } = useUserApi()

// Table
const { getUserColumnDefinitions, getUserLink } = useUserUtils()

const columns = computed(() => getUserColumnDefinitions())

function getData(opts: ITableDataFetchFncInput) {
  return userFindMany(opts.prismaQuery)
}
</script>

<template>
  <Table
    :columns="columns"
    :get-data="{ fnc: getData}"
    :to="getUserLink"
  />
</template>
