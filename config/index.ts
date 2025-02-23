// Config
import production from './production.json'
import local from './local.json'

const CONFIG_MAP = {  production,  local,}

export const environment: keyof typeof CONFIG_MAP = import.meta.env.VITE_ENV || 'local'
export const config = CONFIG_MAP[environment]
