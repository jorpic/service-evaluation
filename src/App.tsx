import {h} from 'preact'
import {Data} from './types'
import {Form} from './components/Form'
import {Progress} from './components/Progress'
import {useEffect, useState} from 'preact/hooks'
import {Title} from './components/Title'

export const App = () => {
  const [questions, setQuestions] = useState<Data>([
    {
      "question": "Насколько вы в целом довольны или недовольны нашей компанией?",
      "type": "radio",
      "answers": [
        {
          "text": "Очень доволен",
          "name": "12"
        },
        {
          "text": "Частично удовлетворен",
          "name": "12"
        },
        {
          "text": "Нет ни удовлетворения, ни неудовлетворенности",
          "name": "12"
        },
        {
          "text": "Несколько Неудовлетворенный",
          "name": "12"
        },
        {
          "text": "Очень недовольны",
          "name": "12"
        }
      ]
    },
    {
      "question": "Насколько вы в целом довольны или недовольны нашей компанией?",
      "type": "radio",
      "answers": [
        {
          "text": "Очень доволен",
          "name": "87654"
        },
        {
          "text": "Частично удовлетворен",
          "name": "87654"
        },
        {
          "text": "Нет ни удовлетворения, ни неудовлетворенности",
          "name": "87654"
        },
        {
          "text": "Несколько Неудовлетворенный",
          "name": "87654"
        },
        {
          "text": "Очень недовольны",
          "name": "87654"
        }
      ]
    },
    {
      "question": "Насколько вы в целом довольны или недовольны нашей компанией?",
      "type": "radio",
      "answers": [
        {
          "text": "Очень доволен",
          "name": "656"
        },
        {
          "text": "Нет ни удовлетворения, ни неудовлетворенности",
          "name": "656"
        },
        {
          "text": "Очень недовольны",
          "name": "656"
        },
        {
          "text": "Частично удовлетворен",
          "name": "656"
        },
        {
          "text": "Несколько Неудовлетворенный",
          "name": "656"
        }
      ]
    },
    {
      "question": "Насколько вы в целом довольны или недовольны нашей компанией?",
      "type": "radio",
      "answers": [
        {
          "text": "Очень доволен",
          "name": "65"
        },
        {
          "text": "Частично удовлетворен",
          "name": "65"
        },
        {
          "text": "Нет ни удовлетворения, ни неудовлетворенности",
          "name": "65"
        },
        {
          "text": "Несколько Неудовлетворенный",
          "name": "65"
        },
        {
          "text": "Очень недовольны",
          "name": "65"
        }
      ]
    }
  ])

  const [typeProgress, setTypeProgress] = useState<Set<string>>(new Set())
  const toggleProgress = (key: string) => {
    !typeProgress.has(key) && typeProgress.add(key)
    setTypeProgress(new Set(typeProgress))
  }


  return (
    <section class='app'>
      <div class='container'>
        <div className="app__title">
          <Title text='Опрос об удовлетворенности клиентов'/>
        </div>
        <div className="app__form">
          <Form onChange={toggleProgress} questions={questions} typeProgress={typeProgress}/>
          <Progress progress={typeProgress.size} length={questions.length}/>
        </div>
      </div>
    </section>
  )
}