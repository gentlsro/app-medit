import type { User } from '$pt'
import { TableColumn } from '$ui'

import {
  UserCreateInputSchema,
  UserUpdateInputSchema
} from '$zi'


type CreateInputSchema = $infer<typeof UserCreateInputSchema>
type UpdateInputSchema = $infer<typeof UserUpdateInputSchema>

export function useUserUtils() {
  function getUserInput(user?: Partial<User>) {
    return {
      id: undefined as unknown as number,

      // Relations
      // ...

      ...user as Partial<User>,
    } satisfies User
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
   ] as TableColumn<User>[]
  }

  /** Details page link */
  function getUserLink(user: Pick<User, 'id'>) {
    return $p(`/users/${user.id}`)
  }

  return {
    getUserInput,
    getUserCreateDto,
    getUserUpdateDto,
    getUserColumnDefinitions,
    getUserLink,
  }
}