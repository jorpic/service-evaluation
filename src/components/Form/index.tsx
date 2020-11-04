import {h, Fragment} from 'preact'
import {useState} from 'preact/hooks'
import produce from 'immer'
import cn from 'classnames'
import {Stars} from '../Stars'
import {Question} from '../Question'
import * as Type from '../../types'

type Props = {
  formData: {
    questions: Type.Question[],
    response: Type.SavedResult
  }
  onSave: (res: Type.SavedResult) => Promise<void>
  onErrorMessage: (message: string) => void
  onIsLoading: (i: boolean) => void
  isLoading: boolean
}

const mainQuestions = [
  {tag: 'op', text: 'Пожалуйста, выберите оценку операторам'},
  {tag: 'tech', text: 'Пожалуйста, выберите оценку механику'},
]

const defaultResult = mainQuestions.reduce(
  (r, {tag}) => Object.assign(r, {[tag]: {value: 0, answers: {}}}),
  {}
)

export const Form: Type.F<Props> = ({formData, isLoading, onSave, onErrorMessage, onIsLoading}) => {
  const {questions, response} = formData
  const [result, setResult] = useState(response || defaultResult)

  const updateValue = tag => val =>
    setResult(produce(result, draft => { draft[tag].value = val }))

  const updateAnswers = tag =>
    ( type: Type.QuestionType,
      questionId: number,
      answerId: number,
      value: boolean | string
    ) =>
      setResult(produce(result, draft => {
        if (type === 'checkbox') {
          draft[tag].answers[questionId] = draft[tag].answers[questionId] || {}
          draft[tag].answers[questionId][answerId] = value
        } else {
          draft[tag].answers[questionId] = {[answerId]: value}
        }
      }))

  const doSave = () => {
    onIsLoading(true)
    onErrorMessage('')
    onSave(result)
  }

  const canSave = true;
    // FIXME: for each main question check value and answers


  return (
    <Fragment>
      {mainQuestions.map(({tag, text}) =>
        <Fragment>
          <div class='container has-text-centered'>
            <h2 class='subtitle'>{text}</h2>
            <Stars stars={5}
              value={result[tag].value}
              onChanged={updateValue(tag)}/>
          </div>
          <div class='columns is-mobile is-multiline is-centered'>
            {questions
              .filter(q => q.starMask.includes(result[tag].value) && q.tagMask.includes(tag))
              .map(q =>
                <Question
                  question={q}
                  result={result[tag].answers}
                  onChange={updateAnswers(tag)}/>)
            }
          </div>
        </Fragment>
      }
      <div class='container has-text-centered'>
        <button
          class={cn('button is-primary', {'is-loading': isLoading})}
          disabled={!canSave}
          title={canSave || 'Пожалуйста выберите ответ!'}
          onClick={doSave}>
          {isLoading ? 'Отправляется' : 'Отправить'}
        </button>
      </div>
    </Fragment>
  )
}