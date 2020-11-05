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

  const [formData, setFormData] = useState(null)

  const [errorMessage, setErrorMessage] = useState('')

  const [isLoadingSending, setIsLoadingSending] = useState(false)

  const key = window.location.hash.replace('#', '')
  const apiUrl = `${API_BASE}/api/${key}`

  const loadFormData = () => {
    fetch(apiUrl, {
      method: 'GET',
      mode: 'cors'
    })
      .then(r => r.json())
      .then(r => r.questions && setFormData(r))
      .catch(() => {setErrorMessage('У нас что-то с сервером, повторите позже!')})
  }

  const saveResult = (result: Type.SavedResult) =>
    fetch(apiUrl, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(result)
    })
      .then(() => setCurrentPage(Page.Done))
      .catch(() => {
        setErrorMessage('У вас что-то с сетью, повторите позже!')
        setTimeout(() => setIsLoadingSending(false), 1500)
      })

  useEffect(loadFormData, [])

  const isFullHeight = currentPage === Page.Welcome || currentPage === Page.Done
  return (
    <Centered isFullHeight={isFullHeight} errorMessage={errorMessage} onErrorMessage={setErrorMessage}>
      {currentPage === Page.Welcome &&
      <div class='container has-text-centered'>
        <h1 class='title'>Здравствуйте, оцените оказанную вам услугу</h1>
        <h2 class='subtitle'>Пройдите небольшой опрос</h2>
        <button class={cls('button is-primary', {'is-loading': !formData})} onClick={() => setCurrentPage(Page.Stars)} disabled={!formData}>
          Пройти опрос
        </button>
      </div>
      }

      {currentPage === Page.Stars &&
      <Form formData={formData} onSavedResult={saveResult} onErrorMessage={setErrorMessage} isLoading={isLoadingSending} onIsLoading={setIsLoadingSending}/>
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

const Centered: Type.F<{ isFullHeight: boolean, errorMessage: string, onErrorMessage: (message: string) => void}> =
  ({isFullHeight, errorMessage, onErrorMessage, children}) =>
  <section class={cls('hero', {'is-fullheight': isFullHeight})}>
    <div class='hero-body'>
      {children}
    </div>
    {errorMessage &&
    <div class='notification is-danger has-text-centered'>
      <button class='delete' onClick={() => onErrorMessage('')}/>
      {errorMessage}
    </div>}
  </section>
