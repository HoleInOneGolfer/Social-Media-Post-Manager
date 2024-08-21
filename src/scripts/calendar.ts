export function getDates ( year: number ): Date[]
{
  const dates: Date[] = []
  for (
    let current = new Date( year, 0, 1 );
    current.getFullYear() === year;
    current.setDate( current.getDate() + 1 )
  )
  {
    dates.push( new Date( current ) )
  }

  return dates
}

export interface Day
{
  date: Date
  events: string[]
}

export function createCalendar ( year: number ): Day[][]
{
  const dates = getDates( year )
  const calendar: Day[][] = Array.from( { length: 12 }, () => [] )

  for ( let m = 0; m < 12; m++ )
  {
    calendar[ m ] = dates
      .filter( ( date ) => date.getMonth() === m )
      .map( ( date ) => ( { date, events: [] } ) )
  }

  return calendar
}
