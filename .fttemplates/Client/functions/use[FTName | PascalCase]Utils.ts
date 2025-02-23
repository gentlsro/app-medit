import type {
  [FTName | PascalCase]CreateInputSchema,
  [FTName | PascalCase]PartialWithRelations,
  [FTName | PascalCase]UpdateInputSchema,
} from '~z'

// Models
import { TableColumn } from '~/components/Table/models/table-column.model'

type CreateInputSchema = $infer<typeof [FTName | PascalCase]CreateInputSchema>
type UpdateInputSchema = $infer<typeof [FTName | PascalCase]UpdateInputSchema>

export function use[FTName | PascalCase]Utils() {
  // Store
  const instanceStore = useInstanceStore()

  function get[FTName | PascalCase]Input([FTName | camelCase]?: [FTName | PascalCase]PartialWithRelations) {
    return {
      id: undefined as number | undefined,

      // Relations
      // ...

      ...[FTName | camelCase] as IItem,
    } satisfies [FTName | PascalCase]PartialWithRelations
  }

  function get[FTName | PascalCase]CreateDto([FTName | camelCase]: ReturnType<typeof get[FTName | PascalCase]Input>): CreateInputSchema {
    return {
      ...pick([FTName | camelCase], []),

      // Relations
      // ...
    }
  }

  function get[FTName | PascalCase]UpdateDto([FTName | camelCase]: Partial<ReturnType<typeof get[FTName | PascalCase]Input>>): UpdateInputSchema {
    return {
      ...pick([FTName | camelCase], []),

      // Relations
      // ...
    }
  }

  function get[FTName | PascalCase]ColumnDefinitions() {
   return [
    // ID
    new TableColumn({
      field: 'id',
      label: $t('[FTName | camelCase].id'),
      dataType: 'number',
      alwaysSelected: true,
    }),
   ] as TableColumn<[FTName | PascalCase]PartialWithRelations>[]
  }

  /** Details page link */
  function get[FTName | PascalCase]Link([FTName | camelCase]: Pick<[FTName | PascalCase]PartialWithRelations, 'id'>) {
    return $p(`/${instanceStore.instanceDomainName}/[FTName | paramcase]s/${[FTName | camelCase].id}`)
  }

  return {
    get[FTName | PascalCase]Input,
    get[FTName | PascalCase]CreateDto,
    get[FTName | PascalCase]UpdateDto,
    get[FTName | PascalCase]ColumnDefinitions,
    get[FTName | PascalCase]Link,
  }
}