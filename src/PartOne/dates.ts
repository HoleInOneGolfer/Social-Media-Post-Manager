function get_dates(year: number): Date[] {
    let first = new Date(year, 0, 1);
    let last = new Date(year, 11, 31);
    let dates = [];
    let current = first;
    while (current <= last) {
        dates.push(new Date(current));
        current.setDate(current.getDate() + 1);
    }
    return dates;
}

function parse_dates ( dates: Date[] )
{
    let new_dates = [];
    for ( let date of dates )
    {
        let year = date.getFullYear();

        let month = date.getMonth() + 1;
        let month_name = new Intl.DateTimeFormat( 'en-US', { month: 'short' } ).format( date );

        let day = date.getDate();

        let weekday = date.getDay();
        let weekday_name = new Intl.DateTimeFormat( 'en-US', { weekday: 'short' } ).format( date );

        new_dates.push( { year, month, month_name, day, weekday, weekday_name } );
    }

    return new_dates;
}

export { get_dates, parse_dates };