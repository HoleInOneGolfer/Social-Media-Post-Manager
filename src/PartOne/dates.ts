function get_dates ( year: number ): Date[]
{
    let first = new Date( year, 0, 1 );
    let last = new Date( year, 11, 31 );
    let dates = [];
    let current = first;
    while ( current <= last )
    {
        dates.push( new Date( current ) );
        current.setDate( current.getDate() + 1 );
    }
    return dates;
}

interface DateObject
{
    year: number;
    month: number;
    day: number;
    weekday: number;
    month_name: string;
    weekday_name: string;
}

function parse_dates ( dates: Date[] ): DateObject[]
{
    let new_dates = [];
    for ( let date of dates )
    {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let weekday = date.getDay();

        let month_name = date.toLocaleString( "default", { month: "long" } );
        let weekday_name = date.toLocaleString( "default", { weekday: "long" } );

        new_dates.push( { year, month, day, weekday, month_name, weekday_name } );
    }

    return new_dates;
}

function create_lookup_table ( dates: DateObject[] )
{
    let table: any[][] = [];
    for ( let date of dates )
    {
        if ( !table[ date.month ] )
        {
            table[ date.month ] = [];
        }

        table[ date.month ][ date.day ] = {
            month_name: date.month_name,
            weekday_name: date.weekday_name,
            weekday: date.weekday,
            events: [],
        };
    }

    return table;
}

function gen_html_month ( table: any[][], month: number )
{
    let days = table[month];

    let html_table = document.createElement( 'table' );

    // Heading: Month Name
    let html_thead = document.createElement( 'thead' );
    html_thead.innerHTML = `<tr><th colspan="7">${ days[ 1 ].month_name }</th></tr>`;
    html_table.appendChild( html_thead );

    // Row 1: Sun - Sat
    let html_tbody = document.createElement( 'tbody' );
    html_tbody.innerHTML = `<tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr>`;
    html_table.appendChild( html_tbody );

    // Rows 2 - 6: Days
    let html_tr = document.createElement( 'tr' );
    let current_weekday = 1;
    let current_day = 1;

    // Fill in empty days before the first day of the month
    while ( current_weekday < days[ 1 ].weekday )
    {
        html_tr.innerHTML += `<td></td>`;
        current_weekday++;
    }

    // Fill in days of the month
    while ( current_day < days.length && days[ current_day ] )
    {
        html_tr.innerHTML += `<td>${ current_day }</td>`;
        current_day++;
        current_weekday++;
        if ( current_weekday > 7 )
        {
            html_table.appendChild( html_tr );
            html_tr = document.createElement( 'tr' );
            current_weekday = 1;
        }
    }
    console.log( month, current_day, current_weekday );

    // Fill in empty days after the last day of the month
    while ( current_weekday <= 7 && current_weekday !== 1)
    {
        html_tr.innerHTML += `<td></td>`;
        current_weekday++;
    }


    html_table.appendChild( html_tr );

    return html_table;
}

export { get_dates, parse_dates, create_lookup_table, gen_html_month };
