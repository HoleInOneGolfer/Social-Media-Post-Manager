import '../styles/style.css';
const { BASE_URL } = import.meta.env;

import * as util from './utils';


document.addEventListener( 'DOMContentLoaded', () =>
{
    console.log( 'Base URL:', BASE_URL );
    const main = document.querySelector( 'main' );

    let calendar = util.createCalendar( 2024 );
    console.table( calendar[ 1 ] );

    if ( main )
    {
    }
} );