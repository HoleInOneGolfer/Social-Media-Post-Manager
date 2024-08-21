import './style.css'
const { BASE_URL } = import.meta.env;

import { get_dates, parse_dates, create_lookup_table, gen_html_month } from './PartOne/dates';

document.title = `Base URL: ${ BASE_URL }`;

var dates_2024 = get_dates( 2024 );
var parse_dates_2024 = parse_dates( dates_2024 );
var lookup_table = create_lookup_table( parse_dates_2024 );

var app = document.querySelector<HTMLDivElement>( '#app' )!;
for ( let i = 1; i <= 12; i++ )
{
    let month = gen_html_month( lookup_table, i );
    app.appendChild( month );
}