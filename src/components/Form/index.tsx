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
}

export const Form: F<Props> = ({onDone, onClick}) => {
  const [isLoading, setIsLoading] = useState(false)
  const setDone = () => {
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
  const answers: { [star: string]: any } = {
    good: ['Хороший текст', 'тексттексттексттекст', 'тексттексттекст?'],
    normal: ['Что', 'За', 'Середина?'],
    bad: ['Невнятная речь', 'Не решили проблему', 'Отказались помогать']
  }
  useEffect(() => {
    star in answers ?
      star in stars && setSelectedStar(stars[star](answers[star]))
      : star in stars && setSelectedStar(stars[star](icons[star]))
  }, [star])

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


const stars: { [ratingStar: string]: any } = {
  veryGood: (icons: any) => {
    return {title: 'Что больше всего вам понравилось?', icons}
  },
  good: (answers: any) => {
    return {title: 'Что вам понравилось?', answers}
  },
  normal: (answers: any) => {
    return {title: 'Выбирите что было не так.', answers}
  },
  bad: (answers: any) => {
    return {title: 'Что вас разачаровало?', answers}
  },
  veryBad: (icons: any) => {
    return {title: 'Что больше всего вам не понравилось?', icons}
  }
}