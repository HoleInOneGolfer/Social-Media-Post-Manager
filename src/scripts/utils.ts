export function getDates ( year: number ): Date[]
{
    let dates: Date[] = [];
    for (
        let current = new Date( year, 0, 1 );
        current.getFullYear() === year;
        current.setDate( current.getDate() + 1 )
    )
    {
        dates.push( new Date( current ) );
    }

    return dates
}

export interface Day
{
    date: Date;
    events: string[];
}

export function createCalendar ( year: number ): Day[][]
{
    let dates = getDates( year );
    let calendar: Day[][] = Array.from( { length: 12 }, () => [] );
    for ( let m = 0; m < 12; m++ )
    {
        const days: Date[] = dates.filter( date => date.getMonth() === m );
        days.forEach( ( date, index ) =>
        {
            calendar[ m ][ index ] = { date, events: [] };
        } );
    }

    return calendar;
}