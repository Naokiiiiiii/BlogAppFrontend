import { KeysToCamelcase } from '@reducers/blogApi/baseApi'
import { components } from './api'

export type Article = KeysToCamelcase<components['schemas']['article']>
