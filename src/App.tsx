import {h} from 'preact'
import {useEffect, useState} from 'preact/hooks'
import cn from 'classnames'
import {Form} from './components/Form'
import success from './assets/success.svg'

export const App = () => {
  const [questions, setQuestions] = useState(null)
  const [nextPage, setNextPage] = useState(false)
  const [isDone, setIsDone] = useState(false)

  const [typeIconTitle, setTypeIconTitle] = useState<Set<string>>(new Set())
  const toggleIconTitle = (key: string) => {
    typeIconTitle.has(key) ? typeIconTitle.delete(key) : typeIconTitle.add(key)
    setTypeIconTitle(new Set(typeIconTitle))
  }

  useEffect(() => {
    const key = window.location.hash.replace('#', '')
    fetch(`/api/${key}`)
      .then(r => r.json())
      .then(r => {
        if(r.questions) {
          setQuestions(r.questions)
        } else {
          console.warn('Unexpected result from API', r)
          // FIXME: handle logic error
        }
      })
      // .catch FIXME: handle network errors
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
            <Form questions={questions} onClick={toggleIconTitle} onDone={setIsDone}/>
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