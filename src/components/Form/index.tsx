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
}

export const Form: Type.F<Props> = ({formData, onSave, onErrorMessage}) => {
  const {questions, response} = formData
  const [isLoading, setIsLoading] = useState(false)
  const [starValue, setStarValue] = useState(response ? response.value : 0)
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
    setIsLoading(true)
    onErrorMessage('')
    onSave({value: starValue, answers})
      .catch(() => {
        onErrorMessage('У вас что-то с сетью, повторите позже!')
       setTimeout(() => setIsLoading(false), 1500)
      })
  }

  return (
    <Fragment>
      <div class='container has-text-centered'>
        <h1 class='title'>Опрос об удовлетворённости клиентов</h1>
        <h2 class='subtitle'>Пожалуйста выберите оценку</h2>
        <Stars stars={5} value={starValue} onChanged={setStarValue}/>
      </div>
      <div class='columns is-mobile is-multiline is-centered'>
        {questions
          .filter(q => q.starMask.includes(starValue))
          .map(q =>
            <Question
              question={q}
              result={answers}
              onChange={updateAnswers}/>)
        }
      </div>
      <div class='container has-text-centered'>
        {isLoading
          ? <button
            class={cn('button is-primary', {'is-loading': isLoading})} disabled={true}>
            Отправляется
          </button>
          : <button
            class='button is-primary'
            disabled={!Object.keys(answers).length}
            title={!Object.keys(answers).length && 'Пожалуйста выберите ответ!'}
            onClick={doSave}>
            Отправить
          </button>
        }
      </div>
    </Fragment>
  )
}