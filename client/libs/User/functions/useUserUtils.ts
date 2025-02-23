import type {
  UserCreateInputSchema,
  UserPartialWithRelations,
  UserUpdateInputSchema,
} from '~z'

// Models
import { TableColumn } from '~/components/Table/models/table-column.model'

type CreateInputSchema = $infer<typeof UserCreateInputSchema>
type UpdateInputSchema = $infer<typeof UserUpdateInputSchema>

export function useUserUtils() {
  // Store
  const instanceStore = useInstanceStore()

  function getUserInput(user?: UserPartialWithRelations) {
    return {
      id: undefined as number | undefined,

      // Relations
      // ...

      ...user as IItem,
    } satisfies UserPartialWithRelations
  }

  function getUserCreateDto(user: ReturnType<typeof getUserInput>): CreateInputSchema {
    return {
      ...pick(user, []),

      // Relations
      // ...
    }
  }

  function getUserUpdateDto(user: Partial<ReturnType<typeof getUserInput>>): UpdateInputSchema {
    return {
      ...pick(user, []),

      // Relations
      // ...
    }
  }

  function getUserColumnDefinitions() {
   return [
    // ID
    new TableColumn({
      field: 'id',
      label: $t('user.id'),
      dataType: 'number',
      alwaysSelected: true,
    }),
   ] as TableColumn<UserPartialWithRelations>[]
  }

  /** Details page link */
  function getUserLink(user: Pick<UserPartialWithRelations, 'id'>) {
    return $p(`/${instanceStore.instanceDomainName}/users/${user.id}`)
  }

  return {
    getUserInput,
    getUserCreateDto,
    getUserUpdateDto,
    getUserColumnDefinitions,
    getUserLink,
  }
}