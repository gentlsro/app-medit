// Types
import type { ITableSortItem } from '$ui'

/**
 * Transforms the sorting to Prisma's `orderBy` format.
 */
export function transformSortingToPrismaOrderBy(
  orderBy?: ITableSortItem[] | undefined,
) {
  if (!orderBy) {
    return undefined
  }

  return orderBy.map(item => {
    const orderByObj: Record<string, any> = {}

    set(orderByObj, item.field, item.direction)

    return orderByObj
  })
}
