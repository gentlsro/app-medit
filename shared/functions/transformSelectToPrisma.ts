import { set } from 'lodash-es'

export function transformToPrismaSelect(select?: string[]) {
  if (!select) {
    return undefined
  }

  const transformedSelect: Record<string, any> = {}

  for (const field of select) {
    const fieldParts = field.split('.')
    const fieldWithSelect = fieldParts.join('.select.')

    set(transformedSelect, fieldWithSelect, true)
  }

  return transformedSelect
}
