import {h} from 'preact'
import {useState} from 'preact/hooks'
import cn from 'classnames'
import {Question} from '../Question'
import {Progress} from '../Progress'
import {F, Data} from '../../types'
import './index.scss'

type Props = {
  questions: Data
  size: number
  onChange: (i: string) => void
  onDone: (i: boolean) => void
}

export const Form: F<Props> = ({onChange, questions, onDone, size}) => {
  const [isLoading, setIsLoading] = useState(false)
  const setDone = () => {
    setIsLoading(true)
    setTimeout(() => onDone(true), 2000)
  }
  return (
    <form class='form' onSubmit={e => e.preventDefault()}>
      <div class='form__questions'>
        {questions && questions.map(q => <Question answers={q.answers} question={q.question} type={q.type} onChange={onChange}/>)}
      </div>
      <div class='form__btn'>
        <button class={cn('button is-primary', {'is-loading': isLoading})} onClick={setDone} type='submit' name='submit'>Отправить</button>
      </div>
      <div class='form__progress'>
        <Progress progress={size} length={questions.length}/>
      </div>
    </form>
  )
}