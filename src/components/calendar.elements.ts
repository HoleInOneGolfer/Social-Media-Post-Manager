import { Calendar, type Day } from '../scripts/calendar';

export class DayElement extends HTMLElement
{
    day: Day;
    constructor ( day: Day )
    {
        super()
        this.day = day;

        // if not empty, then set id and text content
        if ( this.day )
        {
            //set id to yyyy-mm-dd
            this.id = day.date.toISOString().split( 'T' )[ 0 ];

            //put text content to dd
            this.innerText = day.date.getDate().toString();
        }
    }
}

export class MonthElement extends HTMLElement
{
    month: Day[];
    day_elements: DayElement[] = [];

    constructor ( month: Day[] )
    {
        super();
        this.month = month;

        this.setId();
        this.appendMonthTitle();
        const container = this.createContainer();
        this.appendDayLabels( container );
        this.appendEmptyDaysBeforeMonth( container );
        this.appendDays( container );
        this.appendEmptyDaysAfterMonth( container );
    }

    private setId (): void
    {
        this.id = this.month[ 0 ].date.toISOString().split( 'T' )[ 0 ].slice( 0, 7 );
    }

    private appendMonthTitle (): void
    {
        const title = document.createElement( 'h2' );
        title.textContent = this.month[ 0 ].date.toLocaleString( 'default', { month: 'long' } );
        this.appendChild( title );
    }

    private createContainer (): HTMLElement
    {
        const container = document.createElement( 'div' );
        this.appendChild( container );
        return container;
    }

    private appendDayLabels ( container: HTMLElement ): void
    {
        const labels = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
        labels.forEach( ( label ) =>
        {
            const day_label = document.createElement( 'day-element' ) as DayElement;
            day_label.classList.add( 'label' );
            day_label.innerText = label;
            container.appendChild( day_label );
        } );
    }

    private appendEmptyDaysBeforeMonth ( container: HTMLElement ): void
    {
        const first_day = this.month[ 0 ].date.getDay();
        for ( let i = 0; i < first_day; i++ )
        {
            const day_element = this.createEmptyDayElement();
            container.appendChild( day_element );
        }
    }

    private appendDays ( container: HTMLElement ): void
    {
        this.day_elements = this.month.map( ( day ) => new DayElement( day ) );
        this.day_elements.forEach( ( day_element ) =>
        {
            container.appendChild( day_element );
        } );
    }

    private appendEmptyDaysAfterMonth ( container: HTMLElement ): void
    {
        const last_day = this.month[ this.month.length - 1 ].date.getDay();
        for ( let i = last_day; i < 6; i++ )
        {
            const day_element = this.createEmptyDayElement();
            container.appendChild( day_element );
        }
    }

    private createEmptyDayElement (): DayElement
    {
        const day_element = document.createElement( 'day-element' ) as DayElement;
        day_element.classList.add( 'empty' );
        return day_element;
    }
}

export class CalendarElement extends HTMLElement
{
    calendar: Calendar;
    month_elements: MonthElement[] = [];

    constructor ( year: number )
    {
        super();
        this.calendar = new Calendar( year );

        this.setId( year );
        this.appendCalendarTitle( year );
        const container = this.createContainer();
        this.appendMonths( container );
    }

    private setId ( year: number ): void
    {
        this.id = year.toString();
    }

    private appendCalendarTitle ( year: number ): void
    {
        const title = document.createElement( 'h1' );
        title.textContent = year.toString();
        this.appendChild( title );
    }

    private createContainer (): HTMLElement
    {
        const container = document.createElement( 'div' );
        this.appendChild( container );
        return container;
    }

    private appendMonths ( container: HTMLElement ): void
    {
        this.month_elements = this.calendar.days.map( ( month ) => new MonthElement( month ) );
        this.month_elements.forEach( ( month_element ) =>
        {
            container.appendChild( month_element );
        } );
    }
}

customElements.define( 'day-element', DayElement )
customElements.define( 'month-element', MonthElement )
customElements.define( 'calendar-element', CalendarElement )