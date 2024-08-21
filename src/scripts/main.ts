import '../styles/style.css';

import { createYear } from '../components/calendar.element';
import { Calendar } from './calendar';

const { BASE_URL } = ( import.meta as any ).env;

console.log( 'Base URL:', BASE_URL )

document.addEventListener( 'DOMContentLoaded', () =>
{
  const main = document.querySelector( 'main' )

  const calendar: Calendar = new Calendar( 2024 )

  if ( main )
  {
    main.appendChild( createYear( calendar.days ) )
  }
} )