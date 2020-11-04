import {FunctionalComponent} from 'preact'

export type F<T> = FunctionalComponent<T>

export type Answer = {
  id: number
  value: number
  text: string
  isFreeForm: boolean
}

export type QuestionType = 'checkbox' | 'radio'
export type Question = {
  id: number
  type: QuestionType
  tagMask: string[]
  starMask: number[]
  text: string
  answers: Answer[]
}

export type Result = {
  [questionId: number]: {[answerId: number]: boolean}
}

export type SavedResult = {
  [tag: string]: {
    value: number
    answers: Result
  }
}
