import { faker } from '@faker-js/faker'
import { FileOnUserKindEnum } from '$pt'

import { Prisma } from '@prisma/client';
import { prisma } from '../../../prisma';

export async function seedUsers() {
  const amount = faker.number.int({ min: 5, max: 15 })

  const users: Prisma.UserCreateInput[] = Array.from({ length: amount }).map(() => ({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: hashPassword(faker.internet.password()),
    birthYear: faker.date.past({ years: 100 }).getFullYear(),
    city: faker.location.city(),
    country: faker.location.country(),

    files: {
      create: {
        approved: faker.datatype.boolean(),
        type: 'VERIFICATION',
        kind: faker.helpers.enumValue(FileOnUserKindEnum),

        file: {
          create: {
            name: faker.system.fileName(),
            type: faker.system.mimeType(),
            size: faker.number.float({ min: 1024, max: 1024 * 1024 }),
            path: faker.system.filePath(),
          }
        }
      }
    }
  }))

  for await (const user of users) {
    await prisma.user.create({ data: user })
  }

  return true
}