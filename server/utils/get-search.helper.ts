/**
 * Returns the search object and extends it with the `alreadyAdjusted` property
 *
 * The `alreadyAdjusted` property is used as a flag to indicate that the arguments
 * have already been adjusted  (possibly within the `findManyWithSearch` extension)
 * and we simply want to call the actually query
 */
export function getSearch(
  search?: string,
  searchFields: string[] = [],
  alreadyAdjusted = true,
) {
  return { q: search, fields: searchFields, alreadyAdjusted }
}
