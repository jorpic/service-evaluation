import {h} from 'preact'
import {F, Data} from '../../types'
import './index.scss'
import {InputItem} from '../InputItem'

type Props = {
  data: Data[]
  text: string
}

export const Block: F<Props> = ({data, text}) =>
  <div class='form__block'>
    <p className="form__block-text">
      {text}
    </p>
    <div className="form__block-data">
      {data.map(({name, type, text}, i) => <InputItem key={type + i} id={type + i} type={type} name={name} text={text}/>)}
    </div>
  </div>