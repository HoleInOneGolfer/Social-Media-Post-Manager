import { Calendar, type Day } from '../scripts/calendar';

export class DayElement extends HTMLElement
{
  day: Day;
  constructor ( day: Day )
  {
    super()
    this.day = day;

    //set id to yyyy-mm-dd
    this.id = day.date.toISOString().split( 'T' )[ 0 ];
  }
}

export class MonthElement extends HTMLElement
{
  month: Day[];
  day_elements: DayElement[] = [];
  constructor ( month: Day[] )
  {
    super()
    this.month = month;

    //set id to yyyy-mm
    this.id = month[ 0 ].date.toISOString().split( 'T' )[ 0 ].slice( 0, 7 );

    // populate day_elements and append them to `this`
    this.day_elements = this.month.map( ( day ) => new DayElement( day ) );

    this.day_elements.forEach( ( day_element ) =>
    {
      this.appendChild( day_element )
    } )
  }
}

export class CalendarElement extends HTMLElement
{
  calendar: Calendar;
  month_elements: MonthElement[] = [];
  constructor ( year: number )
  {
    super()
    this.calendar = new Calendar( year );

    //set id to yyyy
    this.id = year.toString();

    // populate month_elements and append them to `this`
    this.month_elements = this.calendar.days.map( ( month ) => new MonthElement( month ) );

    this.month_elements.forEach( ( month_element ) =>
    {
      this.appendChild( month_element )
    } )
  }
}

customElements.define( 'day-element', DayElement )
customElements.define( 'month-element', MonthElement )
customElements.define( 'calendar-element', CalendarElement )