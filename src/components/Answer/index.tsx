import {h} from 'preact'
import {F} from '../../types'
import './index.scss'
import {useState} from "preact/hooks";

type Props = {
  type: string
  name: string
  text: string
  onChange: (i: string) => void
  setCheckboxChecked: (i: boolean) => void
}

export const Answer: F<Props> = ({type, name, text, onChange, setCheckboxChecked}) => {

  const setCheckedName = (e: any) => {
    e.target.checked && onChange(name)
    type === 'checkbox' && e.target.checked && setCheckboxChecked(true)
  }

  return (
    <span class='form__answer control'>
      <label class={`${type} form__answer-label`}>
        <input class={type} type={type} name={name} onChange={setCheckedName}/>
        <span class='form__answer-label__text'>{text}</span>
      </label>
    </span>
  )
}