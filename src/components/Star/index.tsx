import {h, Fragment} from 'preact'
import {F} from '../../types'
import './index.scss'

type Props = {
  i: number
  star: any
  onSelectedStar: (i: string) => void
}

export const Star: F<Props> = ({i, star, onSelectedStar}) =>
  <Fragment>
    <input type='radio' id={`star-${i}`} name='rating' onClick={() => onSelectedStar(star)}/>
    <label for={`star-${i}`} title={star.title}/>
  </Fragment>
