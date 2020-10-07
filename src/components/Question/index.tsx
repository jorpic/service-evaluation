import {h} from 'preact'
import {Answer} from '../Answer'
import {F, Answers} from '../../types'
import './index.scss'
import {useState} from "preact/hooks";

type Props = {
  answers: Answers
  question: string
  type: string
  onChange: (i: string) => void
}

export const Question: F<Props> = ({answers, question, type, onChange}) => {
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  return (
    <fieldset class='form__block'>
      <h4 class='form__block-text'>
        {question}
      </h4>
      <div class='form__block-data'>
        {answers.map(({text, name}) =>
          <Answer type={type} text={text} name={name} onChange={onChange} setCheckboxChecked={setCheckboxChecked}/>)}
        <div class='form__block-data__btn'>
          {type === 'checkbox' && checkboxChecked && <button>Ok</button>}
        </div>
      </div>
    </fieldset>
  )
}