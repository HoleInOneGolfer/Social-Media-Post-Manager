import '../styles/style.css';

import { CalendarElement } from '../components/calendar.element';

const { BASE_URL } = ( import.meta as any ).env;

console.log( 'Base URL:', BASE_URL )

document.addEventListener( 'DOMContentLoaded', () =>
{
  const main = document.querySelector( 'main' )

  //const calendar: Calendar = new Calendar( 2024 )
  const calendar_element = new CalendarElement( 2024 );

  if ( main )
  {
    //main.appendChild( createYear( calendar.days ) )
    main.appendChild( calendar_element );
  }
} )