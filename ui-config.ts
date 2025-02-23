// @unocss-include

import { transformToPrismaWhere } from './shared/functions/transformFiltersToPrisma'
import { transformToPrismaSelect } from './shared/functions/transformSelectToPrisma'
import { transformSortingToPrismaOrderBy } from './shared/functions/transformSortingToPrisma'

export default extendUIConfig({
  breadcrumbs: {
    props: {
      ui: {
        wrapperClass: 'p-x-0',
      },
    },
    home: { path: '/' },
  },
  form: {
    props: {
      ui: {
        contentClass: 'flex flex-col grow p-2 gap-x-2 gap-y-4 overflow-auto',
      },
    },
    confirmationInit: { enabled: false },
  },
  navigation: {
    defaultNavigationHeight: 36,
    props: {
      ui: {
        headerClass: 'flex flex-col justify-center bg-white outline-1 outline-black outline-solid dark:bg-black p-x-1 lg:p-x-2',
        navigationClass: 'flex items-center',
      },
    },
  },
  pageWrapper: {
    props: {
      breadcrumbs: false,
    },
  },
  // table: {
  //   props: {
  //     modifiers: {
  //       useUrl: true,
  //       buildFetchPayload: payload => {
  //         const {
  //           columns,
  //           fetchMore,
  //           queryBuilder,
  //           search,
  //           pagination,
  //           orderBy,
  //           queryParams,
  //           getStore,
  //         } = payload

  //         const columnFilters = columns.flatMap(col => col.filterDbQuery)
  //         const select = columns
  //           .filter(col => !col.isHelperCol && !col.hidden)
  //           .flatMap(col => [...(col.local ? [] : [col.field]), ...(col.needsFields ?? [])])

  //         const hasQueryBuilder = queryBuilder.length
  //           && queryBuilder?.[0] && 'isGroup' in queryBuilder[0]
  //           && queryBuilder[0].children.length > 0

  //         const prismaQuery = {
  //           args: {
  //             select: transformToPrismaSelect(select),
  //             orderBy: transformSortingToPrismaOrderBy(orderBy),
  //             where: transformToPrismaWhere([
  //               ...(queryBuilder && hasQueryBuilder ? queryBuilder : []),
  //               ...columnFilters,
  //             ]),
  //             take: pagination?.take,
  //             skip: pagination?.skip,
  //           },
  //           search,
  //         }

  //         return {
  //           prismaQuery,
  //           tableData: {
  //             columns,
  //             queryBuilder,
  //             search,
  //             pagination,
  //             columnFilters,
  //             orderBy,
  //           },
  //           queryParams,
  //           fetchMore,
  //           getStore,
  //         }
  //       },
  //     },
  //   },
  // },
})
