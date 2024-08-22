import { Calendar, type Day } from '../scripts/calendar'

export function createMonth ( month: Day[] )
{
  const month_name = month[ 0 ].date.toLocaleString( 'default', { month: 'long' } )

  const table = document.createElement( 'table' )
  const thead = document.createElement( 'thead' )
  const tbody = document.createElement( 'tbody' )

  let tr = document.createElement( 'tr' )
  const th = document.createElement( 'th' )
  th.colSpan = 7
  th.textContent = month_name
  tr.appendChild( th )
  thead.appendChild( tr )

  tr = document.createElement( 'tr' );
  [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ].forEach( ( day ) =>
  {
    const th = document.createElement( 'th' )
    th.textContent = day
    tr.appendChild( th )
  } )
  thead.appendChild( tr )

  // populate the empty dates at the beginning of the month
  const first_day = month[ 0 ].date.getDay()
  tr = document.createElement( 'tr' )
  for ( let i = 0; i < first_day; i++ )
  {
    const td = document.createElement( 'td' )
    tr.appendChild( td )
  }

  month.forEach( ( day ) =>
  {
    const td = document.createElement( 'td' )
    td.textContent = day.date.getDate().toString()
    td.id = day.date.toDateString().split( ' ' ).join( '-' )
    tr.appendChild( td )

    if ( tr.children.length === 7 )
    {
      tbody.appendChild( tr )
      tr = document.createElement( 'tr' )
    }
  } )

  // populate the empty dates at the end of the month
  const last_day = month[ month.length - 1 ].date.getDay()
  for ( let i = last_day + 1; i < 7; i++ )
  {
    const td = document.createElement( 'td' )
    tr.appendChild( td )
  }

  table.appendChild( thead )
  table.appendChild( tbody )
  return table
}

export function createYear ( year: Day[][] )
{
  const outer_shell = document.createElement( 'div' )
  outer_shell.classList.add( 'year' )

  const title = document.createElement( 'h1' )
  title.textContent = year[ 0 ][ 0 ].date.getFullYear().toString()
  outer_shell.appendChild( title )

  const container = document.createElement( 'div' )
  container.classList.add( 'container' )
  outer_shell.appendChild( container )

  year.forEach( ( month ) =>
  {
    container.appendChild( createMonth( month ) )
  } )

  return outer_shell
}

export class CalendarElement extends HTMLElement
{
  private calendar: Calendar;

  constructor ( year: number )
  {
    super();
    this.calendar = new Calendar( year );

    this.render();
  }

  getDays (): Day[][]
  {
    return this.calendar.days;
  }

  getMonth ( month: number ): Day[]
  {
    return this.calendar.getMonth( month );
  }

  getDay ( month: number, day: number ): Day
  {
    return this.calendar.getDay( month, day );
  }

  addEvent ( month: number, day: number, event: string )
  {
    this.calendar.addEvent( month, day, event );
  }

  render ()
  {
    this.appendChild( createYear( this.calendar.days ) );
  }
}

export class MonthElement extends HTMLElement
{
  month: Day[]

  constructor ( month: Day[] )
  {
    super();
    this.month = month;
  }
}

export class DayElement extends HTMLElement
{
  day: Day

  constructor ( day: Day )
  {
    super();
    this.day = day;
  }
}

customElements.define( 'day-element', DayElement );
customElements.define( 'month-element', MonthElement );
customElements.define( 'calendar-element', CalendarElement );