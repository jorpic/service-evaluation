import {h} from 'preact'
import {useEffect, useState} from 'preact/hooks'
import cn from 'classnames'
import {Question} from '../Question'
import {F} from '../../types'
import doneProblem from '../../assets/icon/done-problem.svg'
import pleasantSpeech from '../../assets/icon/pleasant-speech.svg'
import obsceneSpeech from '../../assets/icon/obscene-speech.svg'
import negative from '../../assets/icon/negative.svg'
import './index.scss'

type Props = {
  onClick: (i: string) => void
  onDone: (i: boolean) => void
  questions: any[]
}

export const Form: F<Props> = ({questions, onDone, onClick}) => {
  const [isLoading, setIsLoading] = useState(false)
  const setDone = () => {
    // FIXME: post answers
    setIsLoading(true)
    setTimeout(() => onDone(true), 2000)
  }

  const [star, setStar] = useState(null)
  const [selectedStar, setSelectedStar] = useState(null)

  //Пробные данные **разделил для наглядности**
  const icons: { [star: string]: any } = {
    veryGood: [
      {icon: doneProblem, title: 'Успешно решена проблема'},
      {icon: pleasantSpeech, title: 'Приятная речь'},
    ],
    veryBad: [
      {icon: obsceneSpeech, title: 'Нецензурная брань'},
      {icon: negative, title: 'Не понравилось'},
    ]
  }
  const valToStar = (v) => ['', 'veryBad', 'bad', 'normal', 'good', 'veryGood'][v]
  const answers: { [star: string]: any } = {}
  questions.forEach(q =>
    q.starMask.forEach(v =>
      answers[valToStar(v)] = {
        title: q.question,
        answers: q.answers.map(a => a.text)
      }))

  useEffect(() => setSelectedStar(answers[star]), [star])

  return (
    <form class='form' onSubmit={e => e.preventDefault()}>
      <div class='form__questions'>
        <Question question='Пожалуйста выбирите оценку' star={selectedStar} onClick={onClick} onSelectedStar={setStar}/>
      </div>
      <div class='form__btn'>
        <button class={cn('button is-primary', {'is-loading': isLoading})} onClick={setDone} type='submit' name='submit'>Отправить</button>
      </div>
    </form>
  )
}