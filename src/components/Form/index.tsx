import {h} from 'preact'
import {Fieldset} from '../Fieldset'
import {F, Data} from '../../types'
import './index.scss'

type Props = {
  questions: Data
  onChange: (i: string) => void
  typeProgress: Set<string>
}

export const Form: F<Props> = ({onChange, questions, typeProgress}) => {
  return (
    <form class='form' onSubmit={e => e.preventDefault()}>
      {questions && questions.map(r => <Fieldset answers={r.answers} question={r.question} type={r.type} onChange={onChange} typeProgress={typeProgress}/>)}

    </form>
  )
}