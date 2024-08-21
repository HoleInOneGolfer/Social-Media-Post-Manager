import '../styles/style.css'

import { createYear } from '../components/calendar.element'
import { Calendar } from './calendar'

const { BASE_URL } = import.meta.env

document.addEventListener( 'DOMContentLoaded', () =>
{
  console.log( 'Base URL:', BASE_URL )
  const main = document.querySelector( 'main' )

  const calendar: Calendar = new Calendar( 2024 )

  if ( main )
  {
    main.appendChild( createYear( calendar.days ) )
  }
} )
