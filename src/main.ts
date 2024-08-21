import './style.css'
const { BASE_URL } = import.meta.env;

import { get_dates, parse_dates } from './PartOne/dates';

var dates_2024 = get_dates( 2024 );
var parse_dates_2024 = parse_dates( dates_2024 );
console.table( parse_dates_2024 );

var app = document.querySelector<HTMLDivElement>( '#app' )!;

// build calendar inside app using parse_dates_2024 in as few lines as possible
var calendar = document.createElement( 'table' );
app.appendChild( calendar );

var thead = document.createElement( 'thead' );
calendar.appendChild( thead );

var tbody = document.createElement( 'tbody' );
calendar.appendChild( tbody );

var tr = document.createElement( 'tr' );
thead.appendChild( tr );

var th = document.createElement( 'th' );
th.textContent = 'Weekday';

tr.appendChild( th );

th = document.createElement( 'th' );
th.textContent = 'Date';

tr.appendChild( th );

th = document.createElement( 'th' );
th.textContent = 'Month';

tr.appendChild( th );

th = document.createElement( 'th' );
th.textContent = 'Year';

tr.appendChild( th );

for ( let date of parse_dates_2024 )
{
    tr = document.createElement( 'tr' );
    tbody.appendChild( tr );

    var td = document.createElement( 'td' );
    td.textContent = date.weekday_name;
    tr.appendChild( td );

    td = document.createElement( 'td' );
    td.textContent = date.day.toString();
    tr.appendChild( td );

    td = document.createElement( 'td' );
    td.textContent = date.month_name;
    tr.appendChild( td );

    td = document.createElement( 'td' );
    td.textContent = date.year.toString();
    tr.appendChild( td );
}