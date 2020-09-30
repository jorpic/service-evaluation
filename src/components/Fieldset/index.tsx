import {h} from 'preact'
import {F, Answer} from '../../types'
import './index.scss'
import {Question} from '../Question'

type Props = {
  answers: Answer[]
  question: string
  type: string
  onChange: (i: string) => void
  typeProgress: Set<string>
}

export const Fieldset: F<Props> = ({answers, question, type, onChange, typeProgress}) =>
  <fieldset class='form__block'>
    <legend class="form__block-legend">
      <h4 class='form__block-legend__text'>
        {question}
      </h4>
    </legend>
    <div class="form__block-data">
      {answers.map(({text, name}, i) =>
        <Question key={name + i + text} id={type + i + name} type={type} text={text} name={name} onChange={onChange} typeProgress={typeProgress}/>)}
    </div>
  </fieldset>