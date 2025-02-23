import prismaInternals from '@prisma/internals'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import type { DMMF } from '@prisma/generator-helper'

const { getDMMF } = prismaInternals

type TypeTransfer = {
  models: Model[]
  enums: Enum[]
}

type Model = {
  name: string
  fields: Field[]
}

type Field = {
  name: string
  typeAnnotation: string
  required: boolean
  isArray: boolean
  hasDefault: boolean
}

type Enum = {
  name: string
  values: string[]
}

/**
 * @param schemaPath Path to Prisma schema file
 * @param outputPath Path to output directory
 * @param generateDeclarations Whether to just generate type declarations or to generate a full TypeScript file
 * @param generateInsertionTypes If true, generates types for data to be inserted into a database
 */
async function generateTypes(payload: {
  schemaPath: string
  outputPath: string
  generateDeclarations: boolean
  generateInsertionTypes: boolean
  useType: boolean
},
) {
  const {
    schemaPath,
    outputPath,
    generateDeclarations = false,
    generateInsertionTypes = false,
    useType = false,
  } = payload

  const dmmf = await getDMMF({ datamodelPath: schemaPath })
  let types = distillDMMF(dmmf, generateInsertionTypes)
  types = convertPrismaTypesToJSTypes(types, generateInsertionTypes)
  const fileContents = createTypeFileContents(types, useType, generateInsertionTypes)
  writeToFile(fileContents, outputPath, generateDeclarations)
}

function distillDMMF(dmmf: DMMF.Document, generateInsertionTypes: boolean): TypeTransfer {
  const types: TypeTransfer = {
    models: [],
    enums: [],
  }

  dmmf.datamodel.enums.forEach(prismaEnum => {
    types.enums.push({
      name: prismaEnum.name,
      values: prismaEnum.values.map(e => e.name),
    })
  })

  dmmf.datamodel.models.forEach(model => {
    types.models.push({
      name: model.name,
      fields: model.fields
        .filter(f => !(f.relationName && generateInsertionTypes))
        .map(f => ({
          name: f.name,
          typeAnnotation: f.type,
          required: f.isRequired,
          isArray: f.isList,
          hasDefault: f.hasDefaultValue,
        })),
    })
  })

  return types
}

function convertPrismaTypesToJSTypes(types: TypeTransfer, generateInsertionTypes: boolean): TypeTransfer {
  const PrismaTypesMap = new Map([
    ['String', 'string'],
    ['Boolean', 'boolean'],
    ['Int', 'number'],
    ['BigInt', 'number'],
    ['Float', 'number'],
    ['Decimal', 'number'],
    ['Json', 'any'],
    ['Bytes', 'Buffer'],
  ])
  PrismaTypesMap.set('DateTime', generateInsertionTypes ? '(Date | string)' : 'Date')

  const models = types.models.map(model => {
    const fields = model.fields.map(field => ({
      ...field,
      typeAnnotation: PrismaTypesMap.get(field.typeAnnotation) || field.typeAnnotation,
    }))

    return {
      ...model,
      fields,
    }
  })

  return {
    ...types,
    models,
  }
}

function createTypeFileContents(types: TypeTransfer, useType: boolean, generateInsertionTypes: boolean): string {
  const fileContents = `// DO NOT EDIT
  // @ts-ignore

  import type { $Enums } from '@prisma/client'

${types.enums
  .map(
    prismaEnum => `
export enum ${prismaEnum.name} {
${prismaEnum.values.map(value => `  ${value} = '${value}',`).join('\n')}
}`,
  )
  .join('\n')}

${types.models
  .map(
    model => `
export ${useType ? 'type' : 'interface'} ${model.name} ${useType ? '= ' : ''}{
${model.fields.map(field => createFieldLine(field, generateInsertionTypes, types)).join('\n')}
}`,
  )
  .join('\n')}
`
  return fileContents
}

function createFieldLine(field: Field, generateInsertionTypes: boolean, types: TypeTransfer) {
  const isId = field.name === 'id'
  const isEnum = types.enums.some(e => e.name === field.typeAnnotation)
  let value = field.typeAnnotation

  if (isEnum) {
    value = `(${value} | $Enums.${field.typeAnnotation})`
  }

  return generateInsertionTypes
    ? `  ${field.name}${isId ? '' : '?'}: ${value}${
      field.isArray ? '[]' : ''
    }${field.required ? '' : ' | null'},`
    : `  ${field.name}${isId ? '' : '?'}: ${value}${field.isArray ? '[]' : ''}${field.required ? '' : ' | null'}`
}

async function writeToFile(contents: string, outputPath: string, generateDeclarations: boolean) {
  try {
    let directoryPath = outputPath
    let filePath = outputPath
    if (!outputPath.endsWith('.ts')) {
      filePath = join(outputPath, generateDeclarations ? 'types.d.ts' : 'types.ts')
    } else {
      directoryPath = outputPath.split('/').slice(0, -1).join('/')
    }

    await mkdir(directoryPath, { recursive: true })
    await writeFile(filePath, contents, { encoding: 'utf8' })
  } catch {}
}

// eslint-disable-next-line antfu/no-top-level-await
export async function generate() {
  await generateTypes({
    generateDeclarations: false,
    generateInsertionTypes: false,
    outputPath: '../prisma/prisma-types.ts',
    schemaPath: '../prisma/schema.prisma',
    useType: true,
  })
}
