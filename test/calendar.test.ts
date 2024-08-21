import { describe, it, expect } from 'vitest'
import { getDates, createCalendar, Day } from '../src/scripts/calendar';

// Tests for getDates
describe( 'getDates', () =>
{
  it( 'returns all dates of the given year', () =>
  {
    const dates = getDates( 2024 )
    expect( dates.length ).toBe( 366 ) // Leap year
    expect( dates[ 0 ].toDateString() ).toBe( 'Mon Jan 01 2024' )
    expect( dates[ 365 ].toDateString() ).toBe( 'Tue Dec 31 2024' )
  } )

  it( 'returns correct dates for a non-leap year', () =>
  {
    const dates = getDates( 2023 )
    expect( dates.length ).toBe( 365 )
    expect( dates[ 0 ].toDateString() ).toBe( 'Sun Jan 01 2023' )
    expect( dates[ 364 ].toDateString() ).toBe( 'Sun Dec 31 2023' )
  } )
} )

// Tests for createCalendar
describe( 'createCalendar', () =>
{
  it( 'creates a calendar with 12 months', () =>
  {
    const calendar = createCalendar( 2024 )
    expect( calendar.length ).toBe( 12 )
    expect( calendar[ 0 ].length ).toBe( 31 )  // January
    expect( calendar[ 1 ].length ).toBe( 29 )  // February (leap year)
  } )

  it( 'creates days with empty events', () =>
  {
    const calendar = createCalendar( 2023 )
    expect( calendar[ 0 ][ 0 ].events ).toEqual( [] )
  } )
} )