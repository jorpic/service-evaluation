import {FunctionalComponent} from 'preact'

export type F<T> = FunctionalComponent<T>

export type Answer = {
  text: string
  name: string
}

export type Data = {
  question: string,
  type: 'checkbox' | 'radio',
  answers: Answer[]
}[] | null
