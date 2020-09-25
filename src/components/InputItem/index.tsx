import {h} from 'preact'
import {F} from '../../types'
import './index.scss'

type Props = {
    id: string
    type: string
    name: string
    text?: string
}

export const InputItem: F<Props> = ({ id, type, name, text }) =>
    <span class='form__inner'>
      <input class='input' id={id} type={type} name={name}/>
      <label class='label' for={id}>{text}</label>
    </span>