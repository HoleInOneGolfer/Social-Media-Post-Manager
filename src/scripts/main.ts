import '../styles/style.css'

import { createYear } from '../components/calendar.elements'
import { createCalendar } from './calendar'

const { BASE_URL } = import.meta.env

document.addEventListener('DOMContentLoaded', () => {
  console.log('Base URL:', BASE_URL)
  const main = document.querySelector('main')

  const calendar = createCalendar(2024)

  if (main) {
    main.appendChild(createYear(calendar))
  }
})
