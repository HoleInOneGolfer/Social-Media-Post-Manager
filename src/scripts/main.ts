import '../styles/style.css';
const { BASE_URL } = import.meta.env;

import { createCalendar } from './calendar';
import { createYear } from '../components/calendar.elements';

document.addEventListener( 'DOMContentLoaded', () =>
{
    console.log( 'Base URL:', BASE_URL );
    const main = document.querySelector( 'main' );

    let calendar = createCalendar( 2024 );

    if ( main )
    {
        main.appendChild( createYear( calendar ) );
    }

} );