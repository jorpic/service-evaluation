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
      .catch(() => {
        setErrorMessage('Ошибка загрузки данных с сервера, повторите попытку позже!')
      })
  }

  const saveResult = (result: Type.SavedResult) =>
    fetch(apiUrl, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(result)
    })
      .then(() => setCurrentPage(Page.Done))
      .catch(() => {
        setErrorMessage('Отправка невозможна, проверьте ваше соединение с интернетом или повторите попытку позже!')
        setTimeout(() => setIsLoadingSending(false), 1500)
      })

  useEffect(loadFormData, [])

  const isFullHeight = currentPage === Page.Welcome || currentPage === Page.Done
  return (
    <Centered isFullHeight={isFullHeight} errorMessage={errorMessage} onErrorMessage={setErrorMessage}>
      {currentPage === Page.Welcome &&
      <Welcome isLoading={!formData} onCurrentPage={setCurrentPage}/>
      }

      {currentPage === Page.Stars &&
      <Form formData={formData} onSavedResult={saveResult} onErrorMessage={setErrorMessage} isLoading={isLoadingSending} onIsLoading={setIsLoadingSending}/>
      }

      {currentPage === Page.Done &&
        <Done/>
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

const Welcome: Type.F<{ isLoading: boolean, onCurrentPage: (i: any) => void }> = ({isLoading, onCurrentPage}) =>
  <div class='container has-text-centered'>
    <h2 class='subtitle'>Уважаемый клиент, мы благодарим Вас за то, что воспользовались услугами нашей компании. Ваше мнение очень важно для нас.</h2>
    <button class={cls('button is-primary', {'is-loading': isLoading})} onClick={() => onCurrentPage(Page.Stars)} disabled={isLoading}>
      Оцените услугу
    </button>
  </div>

const Done = () =>
  <div class='container has-text-centered'>
    <div class='done-img'/>
    <h1 class='title'>Спасибо за ваши ответы!</h1>
  </div>