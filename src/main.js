import "./style.css";

import { CalendarElement } from "./calendar.elements";

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  const calendar = new CalendarElement(2024);
  app.appendChild(calendar);
});
