import {FunctionalComponent} from 'preact'

export type F<T> = FunctionalComponent<T>

export type Answer = {
  id: number
  value: number
  text: string
}

export type QuestionType = 'checkbox' | 'radio'
export type Question = {
  id: number
  type: QuestionType
  starMask: number[]
  text: string
  answers: Answer[]
}

export type Result = {
  [questionId: number]: {[answerId: number]: boolean}
}

export type SavedResult = {
  value: number
  answers: Result
}
