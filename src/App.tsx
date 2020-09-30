import {h} from 'preact'
import {Data} from './types'
import {Form} from './components/Form'
import {Progress} from './components/Progress'
import {useEffect, useState} from 'preact/hooks'
import {Title} from './components/Title'

export const App = () => {
  const [questions, setQuestions] = useState<Data>([])

  const [typeProgress, setTypeProgress] = useState<Set<string>>(new Set())
  const toggleProgress = (key: string) => {
    !typeProgress.has(key) && typeProgress.add(key)
    setTypeProgress(new Set(typeProgress))
  }

  useEffect(() => {fetch('/data.json').then(r => r.json()).then(r => setQuestions(r))}, [])

  return (
    <section class='app'>
      <div class='container'>
        <div className="app__title">
          <Title text='Опрос об удовлетворенности клиентов'/>
        </div>
        <div className="app__form">
          <Form onChange={toggleProgress} questions={questions} typeProgress={typeProgress}/>
        </div>
        <div className="app__progress">
          {questions.length && <Progress progress={typeProgress.size} length={questions.length}/>}
        </div>
      </div>
    </section>
  )
}