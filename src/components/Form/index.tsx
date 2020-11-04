import {h, Fragment} from 'preact'
import {useState} from 'preact/hooks'
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

export const Form: Type.F<Props> = ({formData, isLoading, onSave, onErrorMessage, onIsLoading}) => {
  const {questions, response} = formData
  const [opValue, setOpValue] = useState(response?.op?.value || 0)
  const [techValue, setTechValue] = useState(response?.tech?.value || 0)
  const [answers, setAnswers] = useState(response ? response.answers : {})

  function updateAnswers(
    type: Type.QuestionType,
    questionId: number,
    answerId: number,
    value: boolean | string
  ) {
    const answer = type === 'checkbox'
      ? Object.assign({}, answers[questionId], {[answerId]: value})
      : {[answerId]: value}
    setAnswers(Object.assign({}, answers, {[questionId]: answer}))
  }

  const doSave = () => {
    onIsLoading(true)
    onErrorMessage('')
    onSave({
      op: {value: opValue, answers},
      tech: {value: techValue, answers}
    })
  }

  const canSave = Object.values(answers)
    .every((ans: Type.Answer) => Object.values(ans).some(res => !!res))

  return (
    <Fragment>
      <div class='container has-text-centered'>
        <h2 class='subtitle'>Пожалуйста, выберите оценку операторам</h2>
        <Stars stars={5} value={opValue} onChanged={setOpValue}/>
      </div>
      <div class='columns is-mobile is-multiline is-centered'>
        {questions
          .filter(q => q.starMask.includes(opValue) && q.tagMask.includes('op'))
          .map(q =>
            <Question
              question={q}
              result={answers}
              onChange={updateAnswers}/>)
        }
      </div>
      <div class='container has-text-centered'>
        <h2 class='subtitle'>Пожалуйста, выберите оценку механику</h2>
        <Stars stars={5} value={techValue} onChanged={setTechValue}/>
      </div>
      <div class='columns is-mobile is-multiline is-centered'>
        {questions
          .filter(q => q.starMask.includes(techValue) && q.tagMask.includes('tech'))
          .map(q =>
            <Question
              question={q}
              result={answers}
              onChange={updateAnswers}/>)
        }
      </div>
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