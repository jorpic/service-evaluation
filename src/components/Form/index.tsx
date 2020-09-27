import {h} from 'preact'
import {BtnItem} from '../BtnItem'
import {Block} from '../Block'
import {F, Data} from '../../types'

export const Form: F<any> = () => {
  const d: Data[] = [
    {name:'as', text:'B12334khgfds', type:'checkbox'},
    {name:'as', text:'Vlkjhgfds;lkjhgfds', type:'radio'},
    {name:'as', text:'C;lkjhgfds', type:'checkbox'},
    {name:'as', text:'C;lkjhgfds', type:'checkbox'},
    {name:'as', text:'X;lkjhgfds', type:'radio'},
    {name:'as', text:'Z;lkjhgfds', type:'radio'},
  ]
  return (
    <form class='form' onSubmit={e => e.preventDefault()}>
      <Block data={d} text='23232'/>
      <Block data={d} text='www'/>
      <Block data={d} text='eee'/>
      <Block data={d} text='qqqq'/>
      <BtnItem name='submit' value='Отправить'/>
    </form>
  )
}