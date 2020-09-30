import {h, Fragment} from 'preact'
import {F} from '../../types'
import './index.scss'

type Props = {
  progress: number
  length: number
}

export const Progress: F<Props> = ({progress, length}) => {
  return (
    <Fragment>
      <div className="progress__length">{`${progress} / ${length}`}</div>
      <progress class='progress' value={progress} max={length}/>
    </Fragment>
  )

}