import {h} from 'preact'
import {F} from '../../types'
import './index.scss'

type Props = {
    value: string
    name: string
}
//нужно сделать disable
export const BtnItem: F<Props> = ({value, name }) =>
    <button class='form__button' name={name}>{value}</button>
