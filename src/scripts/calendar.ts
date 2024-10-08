
export class Day { date: Date; events: string[]; constructor ( date: Date ) { this.date = date; this.events = [] } }

export class Calendar
{
  year: number;
  days: Day[][];

  constructor ( year: number )
  {
    this.year = year;
    this.days = this.createCalendar();
  }

  private getDates (): Date[]
  {
    const dates: Date[] = [];
    let current = new Date( this.year, 0, 1 );
    while ( current.getFullYear() === this.year )
    {
      dates.push( new Date( current ) );
      current.setDate( current.getDate() + 1 );
    }
    return dates;
  }

  private createCalendar (): Day[][]
  {
    const dates = this.getDates();
    const calendar: Day[][] = Array.from( { length: 12 }, () => [] );
    for ( let m = 0; m < 12; m++ )
    {
      calendar[ m ] = dates
        .filter( ( date ) => date.getMonth() === m )
        .map( ( date ) => ( { date, events: [] } ) );
    }
    return calendar;
  }

  addEvent ( month: number, day: number, event: string ): void { this.days[ month - 1 ][ day - 1 ].events.push( event ); }
}