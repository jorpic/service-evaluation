import {h, Fragment} from 'preact'
import cn from 'classnames'
import {F} from '../../types'
import './index.scss'

type Props = {
  progress: number
  length: number
}

export const Progress: F<Props> = ({progress, length}) => {
  return (
    <Fragment>
      <div class="form__progress-length">{`${progress} / ${length}`}</div>
      <progress class={cn('progress is-primary', {'is-progress': !progress})} value={progress} max={length}/>
    </Fragment>
  )

}