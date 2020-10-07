import {h} from 'preact'
import {useEffect, useState} from 'preact/hooks'
import cn from 'classnames'
import {Form} from './components/Form'
import {Data} from './types'
import success from './assets/success.svg'

export const App = () => {
  const [questions, setQuestions] = useState<Data>(null)
  const [nextPage, setNextPage] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const [typeProgress, setTypeProgress] = useState<Set<string>>(new Set())
  const toggleProgress = (key: string) => {
    !typeProgress.has(key) && typeProgress.add(key)
    setTypeProgress(new Set(typeProgress))
  }

  useEffect(() => {
    fetch('/data.json').then(r => r.json()).then(r => setTimeout(()=>setQuestions(r), 1))
  }, [])

  return (
    <section class='app'>
      <div class='container is-widescreen'>
        {!nextPage &&
        <div class='app__welcome'>
          <div class='app__welcome-title'>
            <h1>Здравствуйте, оцените оказаную вам услугу.</h1>
          </div>
          <div class='app__welcome-text'>
            <h3>Пройдите небольшой опрос.</h3>
          </div>
          <div class='app__welcome-btn'>
            <button class={cn('button is-primary', {'is-loading': !questions})}
                    onClick={() => setNextPage(!nextPage)}>Пройти опрос</button>
          </div>
        </div>
        }
        {nextPage && !isDone &&
        <div class='app__main'>
          <div class='app__title'>
            <h1>Опрос об удовлетворенности клиентов</h1>
          </div>
          <div class='app__form'>
            <Form onChange={toggleProgress} questions={questions} onDone={setIsDone} size={typeProgress.size}/>
          </div>
        </div>
        }

        {isDone &&
        <div class='app__done'>
          <img class='app__done-img' src={success} alt='success'/>
          <h1 class='app__done-title'>Спасибо, за пройденый опрос!</h1>
        </div>
        }
      </div>
    </section>
  )
}