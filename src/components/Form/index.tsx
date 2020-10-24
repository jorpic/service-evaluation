import {h, Fragment} from 'preact'
import {useEffect, useState} from 'preact/hooks'
import cn from 'classnames'
import {Stars} from '../Stars'
import {Question} from '../Question'
import * as Type from '../../types'

type Props = {
  formData: {
    questions: Type.Question[],
    response: Type.SavedResult
  }
  onSave: (res: Type.SavedResult) => void
}

export const Form: Type.F<Props> = ({formData, onSave}) => {
  const {questions, response} = formData;
  const [isLoading, setIsLoading] = useState(false)
  const [starValue, setStarValue] = useState(response ? response.value : 0)
  const [answers, setAnswers] = useState(response ? response.answers : {})

  function updateAnswers(
    type: Type.QuestionType,
    questionId: number,
    answerId: number,
    value: boolean
  ) {
    const answer = type === 'checkbox'
      ? Object.assign({}, answers[questionId], {[answerId]: value})
      : {[answerId]: value}
    setAnswers(Object.assign({}, answers, {[questionId]: answer}))
  }

  const doSave = () => {
    setIsLoading(true)
    onSave({value: starValue, answers})
    // FIXME: .catch(error)
  }

  return (
    <Fragment>
      <div class='container has-text-centered'>
        <h1 class='subtitle'>Опрос об удовлетворённости клиентов</h1>
        <h2>Пожалуйста выберите оценку</h2>
        <Stars stars={5} value={starValue} onChanged={setStarValue}/>
      </div>
      <div class='columns is-mobile is-multiline is-centered'>
        { questions
          .filter(q => q.starMask.includes(starValue))
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
          onClick={doSave}
        >
          Отправить
        </button>
      </div>
    </Fragment>
  )
}