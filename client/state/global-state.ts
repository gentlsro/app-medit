export const useCurrentUser = () => {
  return useState<IAuthJwt | null>('account', () => null)
}
