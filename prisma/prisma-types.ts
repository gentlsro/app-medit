// DO NOT EDIT
  // @ts-ignore

  import type { $Enums } from '@prisma/client'


export enum UserTypeEnum {
  PATIENT = 'PATIENT',
  MEDICAL_PERSON = 'MEDICAL_PERSON',
  CLINIC = 'CLINIC',
}

export enum FileOnUserTypeEnum {
  VERIFICATION = 'VERIFICATION',
  DOCUMENT = 'DOCUMENT',
}

export enum FileOnUserKindEnum {
  ID_CARD = 'ID_CARD',
  PASSPORT = 'PASSPORT',
  MEDICAL_IDENTIFICATION = 'MEDICAL_IDENTIFICATION',
}


export type User = {
  createdAt?: Date
  createdById?: number | null
  updatedAt?: Date | null
  updatedById?: number | null
  deleted?: boolean
  deletedAt?: Date | null
  deletedById?: number | null
  id: number
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  type?: (UserTypeEnum | $Enums.UserTypeEnum)
  birthYear?: number
  country?: string
  city?: string
  paymentDetail?: PaymentDetail | null
  files?: FileOnUser[]
}

export type FileOnUser = {
  createdAt?: Date
  createdById?: number | null
  updatedAt?: Date | null
  updatedById?: number | null
  deleted?: boolean
  deletedAt?: Date | null
  deletedById?: number | null
  id: number
  type?: (FileOnUserTypeEnum | $Enums.FileOnUserTypeEnum)
  kind?: (FileOnUserKindEnum | $Enums.FileOnUserKindEnum)
  approved?: boolean
  userId?: number
  user?: User
  fileId?: number
  file?: File
}

export type File = {
  createdAt?: Date
  createdById?: number | null
  updatedAt?: Date | null
  updatedById?: number | null
  deleted?: boolean
  deletedAt?: Date | null
  deletedById?: number | null
  id: number
  name?: string
  type?: string
  size?: number
  path?: string
  users?: FileOnUser[]
}

export type PaymentDetail = {
  createdAt?: Date
  createdById?: number | null
  updatedAt?: Date | null
  updatedById?: number | null
  deleted?: boolean
  deletedAt?: Date | null
  deletedById?: number | null
  id: number
  accountNumber?: string
  userId?: number
  user?: User
}
