import {h} from 'preact'
import {F} from '../../types'
import './index.scss'

type Props = {
  progress: number
  length: number
}

export const Progress: F<Props> = ({progress, length}) => {
  return (
    <div class='progress'>
      <div class="progress__length">{`${progress} / ${length}`}</div>
      <progress class='progress__bar' value={progress} max={length}/>
    </div>
  )

}