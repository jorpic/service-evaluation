import {h} from 'preact'
import {useState} from 'preact/hooks'
import {Star} from '../Star'
import {Answer} from '../Answer'
import {F} from '../../types'
import './index.scss'

type Props = {
  question: string
  star: any
  onClick: (i: string) => void
  onSelectedStar: (i: string) => void
}

export const Question: F<Props> = ({question, star, onClick, onSelectedStar}) => {
  const ratingStars = [
    'veryGood',
    'good',
    'normal',
    'bad',
    'veryBad'
  ]

  return (
    <fieldset class='form__block'>
      <h2 class='form__block-text'>
        {question}
      </h2>
      <div class='form__block-stars'>
        {ratingStars.map((star, i) => <Star i={i} star={star} onSelectedStar={onSelectedStar}/>)}
      </div>
      {star && <div class='form__block-select'>
        <SelectedRating star={star} onClick={onClick}/>
      </div>}
    </fieldset>
  )
}

const SelectedRating: F<any> = ({star, onClick}) => {
  return (
    <div class='selected-rating'>
      <h3 class='selected-rating__title'>{star.title}</h3>
      {star.icons &&
      <div class='selected-rating__selected-star'>
        {star.icons.map((star: any) => <IconTitle key={star.title} icon={star.icon} title={star.title} onClick={onClick}/>)}
      </div>}
      {star.answers && <div class='selected-rating__answers'>
        {star.answers.map((answer: any) => <Answer key={answer} type='checkbox' text={answer}/>)}
      </div>}
    </div>
  )
}

const IconTitle: F<any> = ({icon, title, onClick}) => {
  const [display, setDisplay] = useState(false)
  const setSelected = () => {
    setDisplay(!display)
    onClick(title)
  }
  return (
    <div class='icon' style={!display && 'filter: grayscale(100%);'} onClick={setSelected}>
      <div>
        <img src={icon} alt={title}/>
        <div class='icon__title'>{title}</div>
      </div>
    </div>
  )
}