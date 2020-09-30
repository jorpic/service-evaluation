import {h} from 'preact'
import {F} from '../../types'
import './index.scss'

type Props = {
  id: string
  type: string
  name: string
  text: string
  onChange: (i: string) => void
  typeProgress: Set<string>
}

export const Question: F<Props> = ({id, type, name, text, onChange, typeProgress}) => {

  const setI = (e: any) => {
    e.target.checked && onChange(name)
  }

  return <span class='form__inner'>
           <input class='input' id={id} type={type} name={name} onChange={setI}/>
           <label class='label' for={id}>{text}</label>
         </span>
}