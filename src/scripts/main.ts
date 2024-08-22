import '../styles/style.css';

import { CalendarElement } from '../components/calendar.element';
import { createYear } from '../components/calendar.table.elements';
import { Calendar } from './calendar';

const { BASE_URL } = ( import.meta as any ).env;

console.log( 'Base URL:', BASE_URL )

document.addEventListener( 'DOMContentLoaded', () =>
{
  const main = document.querySelector( 'main' )

  const calendar_element = new CalendarElement( 2024 )
  const calendar_table = new Calendar( 2024 )

  if ( main )
  {
    main.appendChild( calendar_element );
    main.appendChild( createYear( calendar_table.days ) );
  }
} )