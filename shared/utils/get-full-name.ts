export function getFullName(
  data?: { firstName?: string | null, lastName?: string | null } | null,
) {
  const { firstName, lastName } = data ?? {}

  // No name provided
  if (!firstName && !lastName) {
    return ''
  }

  // Only first name provided
  if (firstName && !lastName) {
    return firstName
  }

  // Only last name provided
  if (!firstName && lastName) {
    return lastName
  }

  return `${lastName}, ${firstName}`
}
