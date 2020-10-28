import {h} from 'preact'
import {useEffect, useState} from 'preact/hooks'
import cls from 'classnames'
import {Form} from '../Form'
import * as Type from '../../types'
import './index.scss'

const API_BASE = 'http://188.166.72.121:1234'
enum Page { Welcome, Stars, Done }

export const App = () => {
  const [currentPage, setCurrentPage] = useState(Page.Welcome)
  const [isDone, setIsDone] = useState(false)
  const [formData, setFormData] = useState(null)

  const key = window.location.hash.replace('#', '')
  const apiUrl = `${API_BASE}/api/${key}`

  const loadFormData = () => {
    fetch(apiUrl, {
      method: 'GET',
      mode: 'cors'
    }).then(r => r.json())
      .then(r => {
        if(r.questions) {
          setFormData(r)
        } else {
          console.warn('unexpected result from api', r)
          // fixme: handle logic errors
        }
      })
      // .catch fixme: handle network errors
  }

  const saveResult = (result: Type.SavedResult) =>
    fetch(apiUrl, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(result)
    }).then(() => setCurrentPage(Page.Done))


  useEffect(loadFormData, [])

  const isFullHeight = currentPage === Page.Welcome || currentPage === Page.Done
  return (
    <Centered isFullHeight={isFullHeight}>
      {currentPage === Page.Welcome &&
        <div class='container has-text-centered'>
          <h1 class='title'>Здравствуйте, оцените оказанную вам услугу</h1>
          <h2 class='subtitle'>Пройдите небольшой опрос</h2>
          <button
            class={cls('button is-primary', {'is-loading': !formData})}
            onClick={() => setCurrentPage(Page.Stars)}
          >
            Пройти опрос
          </button>
        </div>
      }

      {currentPage === Page.Stars &&
        <Form formData={formData} onSave={saveResult}/>
      }

      {currentPage === Page.Done &&
        <div class='container has-text-centered'>
          <div class='done-img'/>
          <h1 class='title'>Спасибо за ваши ответы!</h1>
        </div>
      }
    </Centered>
  )
}



const Centered: Type.F<{isFullHeight: boolean}> = ({isFullHeight, children}) =>
  <section class={cls('hero', {'is-fullheight': isFullHeight})}>
    <div class='hero-body'>
      {children}
    </div>
  </section>
