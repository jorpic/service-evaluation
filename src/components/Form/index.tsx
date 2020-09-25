import {h} from 'preact'
import {InputItem} from '../InputItem'

export const Form = () => {
  return (
    <form class='form'>
      <InputItem id='1' name='as' text='Привет' type='checkbox'/>
      <InputItem id='2' name='as' text='Я' type='radio'/>
      <InputItem id='3' name='as' text='Человек' type='checkbox'/>
      <InputItem id='22' name='as' text='Я1' type='radio'/>
      <InputItem id='21' name='as' text='Я2' type='radio'/>
    </form>
  )
}