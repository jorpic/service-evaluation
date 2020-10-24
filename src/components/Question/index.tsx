import {h} from 'preact'
import {useState} from 'preact/hooks'
import * as Type from '../../types'

type Props = {
  question: Type.Question
  result: Type.Result
  onChange: (
    type: Type.QuestionType,
    questionId: number,
    answerId: number,
    value: boolean) => void
}

export const Question: Type.F<Props> = ({question: q, result, onChange}) =>
  <div class='column is-narrow mt-4'>
    <h3 class='subtitle'>{q.text}</h3>
    { q.answers.map(a =>
      <Field type={q.type} label={a.text}>
        { q.type === 'checkbox'
          ? <input
              type='checkbox'
              checked={result[q.id] && !!result[q.id][a.id]}
              onChange={e => onChange(
                'checkbox', q.id, a.id,
                (e.target as HTMLInputElement).checked)}/>
          : <input
              type='radio'
              name={String(q.id)}
              checked={result[q.id] && !!result[q.id][a.id]}
              onChange={e => onChange('radio', q.id, a.id, true)}/>
        }
      </Field>
    )}
  </div>

type FieldProps = {
  type: Type.QuestionType
  label: string
}

const Field: Type.F<FieldProps> = ({type, label, children}) =>
  <div class='field'>
    <div class='control'>
      <label class={type}>
        {children}
        &nbsp;{label}
      </label>
    </div>
  </div>