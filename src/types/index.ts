import {FunctionalComponent} from 'preact'

export type F<T> = FunctionalComponent<T>

export type Data = {
  type: string
  name: string
  text?: string
}