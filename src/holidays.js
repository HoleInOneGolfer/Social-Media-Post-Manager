const BASE_CALENDAR_URL = "https://www.googleapis.com/calendar/v3/calendars";
const BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY =
  "holiday@group.v.calendar.google.com"; // Calendar Id. This is public but apparently not documented anywhere officialy.
const CALENDAR_REGION = "en.usa"; // This variable refers to region whose holidays do we need to fetch

/**
 * Making a fetch request
 */
const url = `${BASE_CALENDAR_URL}/${CALENDAR_REGION}%23${BASE_CALENDAR_ID_FOR_PUBLIC_HOLIDAY}/events?key=${
  import.meta.env.VITE_API_KEY
}`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const holidays = data.items;
    const holdayNames = holidays.map((holiday) => holiday.summary);
    console.log(holdayNames);
  });
