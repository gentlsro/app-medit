import { get, set } from 'lodash-es'
import type { ExtendedDataType } from '$dataType'
import { ComparatorEnum } from '$comparatorEnum'
import { type FilterItem, parseValue, traverseChildren } from '$utils'
import utilsConfig from '$utilsConfig'
import type { IQueryBuilderItem, ITableFilterRow } from '$ui'

const DATETIME_DATATYPES = [
  'timestamp',
  'date',
  'DateTime',
  'datetime',
  'fullDateTime',
].flatMap(type => [type, `${type}Simple`]) as ExtendedDataType[]

/**
 * Transforms the filter row to Prisma's where condition format.
 */
function transformItemToPrismaCondition(
  item: IQueryBuilderItem | FilterItem<any>,
): any {
  const field = item.filterField ?? item.field
  const condition: Record<string, any> = {}
  const isTimestamp = item.dataType === 'timestamp' || item.dataType === 'timestampSimple'

  const isDatetime = item.dataType && DATETIME_DATATYPES.includes(item.dataType)
  let isSpecialCase = false

  switch (item.comparator) {
    case ComparatorEnum.EQUAL:
      // Date datatype needs special treatment
      if (isDatetime) {
        set(condition, field, {
          gte: $date(item.value, { utc: !isTimestamp }).startOf('day'),
          lte: $date(item.value, { utc: !isTimestamp }).endOf('day'),
        })
      } else {
        set(condition, field, {
          equals: item.value,
        })
      }

      break

    case ComparatorEnum.NOT_EQUAL:
      // Date datatype needs special treatment
      if (isDatetime) {
        set(condition, field, {
          not: {
            gte: $date(item.value, { utc: !isTimestamp }).startOf('day'),
            lte: $date(item.value, { utc: !isTimestamp }).endOf('day'),
          },
        })
      } else {
        set(condition, field, {
          not: item.value,
        })
      }

      break

    case ComparatorEnum.IN:
      set(condition, field, {
        in: item.value.map((id: any) => parseValue(id, item.dataType)),
      })

      break

    case ComparatorEnum.NOT_IN:
      set(condition, field, {
        not: {
          in: item.value.map((id: any) => parseValue(id, item.dataType)),
        },
      })

      break

    case ComparatorEnum.LIKE:
    case ComparatorEnum.CONTAINS:
      set(condition, field, {
        contains: item.value,
      })

      break

    case ComparatorEnum.STARTS_WITH:
      set(condition, field, {
        startsWith: item.value,
      })

      break

    case ComparatorEnum.ENDS_WITH:
      set(condition, field, {
        endsWith: item.value,
      })

      break

    case ComparatorEnum.NOT_LIKE:
    case ComparatorEnum.NOT_CONTAINS:
      set(condition, field, {
        not: {
          contains: item.value,
        },
      })

      break

    case ComparatorEnum.NOT_STARTS_WITH:
      set(condition, field, {
        not: {
          startsWith: item.value,
        },
      })

      break

    case ComparatorEnum.NOT_ENDS_WITH:
      set(condition, field, {
        not: {
          endsWith: item.value,
        },
      })

      break

    case ComparatorEnum.GREATER_THAN:
      // Date datatype needs special treatment
      if (isDatetime) {
        set(condition, field, {
          gt: $date(item.value, { utc: !isTimestamp }).startOf('day'),
        })
      } else {
        set(condition, field, {
          gt: item.value,
        })
      }

      break

    case ComparatorEnum.LESS_THAN:
      // Date datatype needs special treatment
      if (isDatetime) {
        set(condition, field, {
          lt: $date(item.value, { utc: !isTimestamp }).startOf('day'),
        })
      } else {
        set(condition, field, {
          lt: item.value,
        })
      }

      break

    case ComparatorEnum.GREATER_THAN_OR_EQUAL:
      // Date datatype needs special treatment
      if (isDatetime) {
        set(condition, field, {
          gte: $date(item.value, { utc: !isTimestamp }).startOf('day'),
        })
      } else {
        set(condition, field, {
          gte: item.value,
        })
      }

      break

    case ComparatorEnum.LESS_THAN_OR_EQUAL:
      // Date datatype needs special treatment
      if (isDatetime) {
        set(condition, field, {
          lte: $date(item.value, { utc: !isTimestamp }).endOf('day'),
        })
      } else {
        set(condition, field, {
          lte: item.value,
        })
      }

      break

    case ComparatorEnum.IS_EMPTY:
      set(condition, field, null)

      break

    case ComparatorEnum.NOT_IS_EMPTY:
      set(condition, field, { not: null })

      break

    case ComparatorEnum.IS:
      set(
        condition,
        field,
        typeof item.value === 'boolean' || item.value === 'true',
      )

      break

    case ComparatorEnum.NOT_IS:
      set(condition, field, {
        not: typeof item.value === 'boolean' || item.value === 'true',
      })

      break

    // Special cases that should be handled separately
    case ComparatorEnum.IN_EVERY:
    case ComparatorEnum.IN_NONE:
      isSpecialCase = true
      break

    default:
      throw new Error(`Unsupported comparator: ${item.comparator}`)
  }

  if (
    utilsConfig.prisma.useInsensitiveFilter
    && item.dataType?.startsWith('string')
    && item.value
  ) {
    set(condition, field, {
      ...get(condition, field),
      mode: 'insensitive',
    })
  }

  return isSpecialCase ? '__CUSTOM__' : condition
}

/**
 * Transform rows to Prisma's where clause format.
 */
export function transformToPrismaWhere(rows?: ITableFilterRow[]): any {
  if (!rows) {
    return {}
  }

  const whereQB: Record<string, any> = {}
  const whereColumnFilters: Record<string, any> = { AND: [] }

  traverseChildren(rows, (parentNode, node) => {
    if ('isGroup' in node) {
      if (!parentNode) {
        set(whereQB, node.condition, [])
        node.parentX = get(whereQB, node.condition)
      } else {
        const idx = node.path.split('.').pop()
        set(parentNode.parentX, idx, {
          [node.condition]: [],
        })
        node.parentX = get(parentNode.parentX, `${idx}.${node.condition}`)
      }
    } else {
      if ('path' in node) {
        const idx = node.path.split('.').pop()
        const value = transformItemToPrismaCondition(
          node as IQueryBuilderItem | FilterItem<any>,
        )

        if (value !== '__CUSTOM__') {
          set(parentNode!.parentX, `${idx}`, value)
        }
      } else {
        const value = transformItemToPrismaCondition(
          node as IQueryBuilderItem | FilterItem<any>,
        )

        if (value !== '__CUSTOM__') {
          whereColumnFilters.AND.push(value)
        }
      }
    }
  })

  return {
    AND: [...whereColumnFilters.AND, ...(isEmpty(whereQB) ? [] : [whereQB])],
  }
}
