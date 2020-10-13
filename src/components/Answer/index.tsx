import {h} from 'preact'
import {F} from '../../types'
import './index.scss'

type Props = {
  type: string
  text: string
}

export const Answer: F<Props> = ({type, text}) =>
    <span class='form__answer control'>
      <label class={`${type} form__answer-label`} id={text}>
        <input class={type} id={text} type={type} name={type}/>
        <span class='form__answer-label__text'>{text}</span>
      </label>
    </span>
