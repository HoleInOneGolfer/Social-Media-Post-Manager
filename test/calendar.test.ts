import { describe, expect, it } from 'vitest';
import { Calendar, Day } from '../src/scripts/calendar';

describe( 'Calendar', () =>
{
  it( 'should create a calendar for a given year', () =>
  {
    const calendar = new Calendar( 2024 );
    expect( calendar.days.length ).toBe( 12 );
    expect( calendar.days[ 0 ].length ).toBe( 31 );
    expect( calendar.days[ 11 ].length ).toBe( 31 );
  } );

  it( 'should add an event to a day', () =>
  {
    const calendar = new Calendar( 2024 );
    calendar.addEvent( 1, 1, 'New Year' );
    expect( calendar.days[ 0 ][ 0 ].events ).toContain( 'New Year' );
  } );
} );

describe( 'Day', () =>
{
  it( 'should create a day with a date', () =>
  {
    const date = new Date( 2024, 0, 1 );
    const day = new Day( date );
    expect( day.date ).toBe( date );
  } );

  it( 'should create a day with an empty events array', () =>
  {
    const date = new Date( 2024, 0, 1 );
    const day = new Day( date );
    expect( day.events ).toEqual( [] );
  } );
} );