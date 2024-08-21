import './style.css'
const { BASE_URL } = import.meta.env;

import { get_dates, create_lookup_table, gen_html_month } from './PartOne/dates';

document.title = `Base URL: ${ BASE_URL }`;

var app = document.querySelector<HTMLDivElement>( '#app' )!;

var dates = get_dates( 2024 );
var table = create_lookup_table( dates );
for ( let month = 1; month <= 12; month++ )
{
    app.appendChild( gen_html_month( table, month ) );
}