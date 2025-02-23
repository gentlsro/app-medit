import { InstanceFeature } from '$pt'

export const FEATURES_BY_APP = {
  Tasks: [InstanceFeature.TASKS],
  Core: [] as InstanceFeature[],
  Admin: [] as InstanceFeature[],
} satisfies Record<string, InstanceFeature[]>

const appName = import.meta.env.VITE_APP_NAME as keyof typeof FEATURES_BY_APP
export const APP_FEATURES = FEATURES_BY_APP[appName]
