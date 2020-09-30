import {h} from 'preact'
import {F} from './types'
import {Form} from './components/Form'
import {Title} from './components/Title'

export const App: F<any> = () => {
  return (
    <section class='app'>
      <div class='container'>
        <Form/>
        <div className="app__title">
          <Title text='Опрос об удовлетворенности клиентов'/>
        </div>
      </div>
    </section>
  )
}