import {h} from 'preact'
import {F} from './types'
import {Form} from './components/Form'

export const App: F<any> = () => {
  return (
    <section class='app'>
      <div class='container'>
        <Form/>
      </div>
    </section>
  )
}