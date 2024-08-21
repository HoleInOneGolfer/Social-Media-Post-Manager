import { describe, expect, it } from 'vitest';
import { Calendar } from '../src/scripts/calendar';

// Tests for Calendar.getDates (implicitly tested within createCalendar)
describe( 'Calendar', () =>
{
  it( 'creates a calendar with 12 months', () =>
  {
    const calendar = new Calendar( 2024 );
    expect( calendar.days.length ).toBe( 12 );
    expect( calendar.getMonth( 1 ).length ).toBe( 31 ); // January
    expect( calendar.getMonth( 2 ).length ).toBe( 29 ); // February (leap year)
  } );

  it( 'creates days with empty events', () =>
  {
    const calendar = new Calendar( 2023 );
    expect( calendar.getDay( 1, 1 ).events ).toEqual( [] );
  } );

  it( 'returns all dates of the given year', () =>
  {
    const calendar = new Calendar( 2024 );
    const december = calendar.getMonth( 12 );
    expect( december.length ).toBe( 31 ); // December in a leap year
    expect( december[ 0 ].date.toDateString() ).toBe( 'Sun Dec 01 2024' );
    expect( december[ 30 ].date.toDateString() ).toBe( 'Tue Dec 31 2024' );
  } );

  it( 'returns correct dates for a non-leap year', () =>
  {
    const calendar = new Calendar( 2023 );
    const december = calendar.getMonth( 12 );
    expect( december.length ).toBe( 31 ); // December
    expect( december[ 0 ].date.toDateString() ).toBe( 'Fri Dec 01 2023' );
    expect( december[ 30 ].date.toDateString() ).toBe( 'Sun Dec 31 2023' );
  } );

  it( 'adds an event to a specific day', () =>
  {
    const calendar = new Calendar( 2023 );
    calendar.addEvent( 12, 25, "Christmas" );
    const christmasDay = calendar.getDay( 12, 25 );
    expect( christmasDay.events ).toContain( "Christmas" );
  } );
} );
