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
    value: boolean | string) => void
}

export const Question: Type.F<Props> = ({question: q, result, onChange}) => {
  const [freeFormValue, setFreeFormValue] = useState(result[q.id] || {})
  const updateFF = (ansId, txt) => {
    setFreeFormValue(Object.assign({}, freeFormValue, {[ansId]: txt})
    onChange(q.type, q.id, ansId, txt)
  }

  const doChange = (ansId, isFreeForm, value) =>
    onChange(
      q.type, q.id, ansId,
      isFreeForm && value ? freeFormValue[ansId] : value)

  return (
    <div class='column is-narrow mt-4 mr-6'>
      <h3 class='subtitle'>{q.text}</h3>
      {q.answers.map(a =>
        <Field
          type={q.type}
          label={a.text}
          isFreeForm={a.isFreeForm}
          freeFormValue={freeFormValue[a.id] || ''}
          onFreeFormValue={txt => updateFF(a.id, txt)}
        >
          {q.type === 'checkbox'
            ? <input
              type='checkbox'
              checked={result[q.id] && !!result[q.id][a.id]}
              onChange={e => doChange(
                a.id, a.isFreeForm, (e.target as HTMLInputElement).checked)}/>
            : <input
              type='radio'
              name={String(q.id)}
              checked={result[q.id] && !!result[q.id][a.id]}
              onChange={() => doChange(a.id, a.isFreeForm, true)}/>
          }
        </Field>
      )}
    </div>
  )
}

type FieldProps = {
  type: Type.QuestionType
  label: string
  isFreeForm: boolean
  freeFormValue: string
  onFreeFormValue: (i: string) => void
}

const Field: Type.F<FieldProps> =
  ({type, label, isFreeForm, freeFormValue, onFreeFormValue, children}) =>
    <div class='field'>
      <div class='control'>
        <label class={type} style={isFreeForm && 'display: flex; align-items: flex-start;'}>
          {children}&nbsp;
          {isFreeForm
            ? <textarea class='textarea' style='min-height: 4em;'
                        onInput={e => onFreeFormValue((e.target as HTMLInputElement).value)}
                        value={freeFormValue}
                        placeholder={label}/>
            : label}
      </label>
    </div>
  </div>