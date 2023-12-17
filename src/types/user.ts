import { KeysToCamelcase } from '@reducers/blogApi/baseApi'
import { components } from './api'

export type User = KeysToCamelcase<components['schemas']['user']>
