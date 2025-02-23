import { seedUsers } from '../../libs/User/function/seed'

export default defineEventHandler(async ev => {
  return seedUsers()
})