import {h} from 'preact'
import {F} from '../../types'
import './index.scss'

type Props = {
  text: string
}

export const Title: F<Props> = ( {text}) =>
  <h1>{text}</h1>