import { Calendar, Day } from "./calendar";

export class DayElement extends HTMLElement {
  constructor(day) {
    super();
    this.day = day;

    // if not empty, then set id and text content
    if (this.day) {
      //set id to yyyy-mm-dd
      this.id = day.date.toISOString().split("T")[0];

      //put text content to dd
      this.innerText = day.date.getDate().toString();
    }
  }
}

export class MonthElement extends HTMLElement {
  constructor(month) {
    super();
    this.month = month;

    this.setId();
    this.appendMonthTitle();
    const container = this.createContainer();
    this.appendDayLabels(container);
    this.appendEmptyDaysBeforeMonth(container);
    this.appendDays(container);
    this.appendEmptyDaysAfterMonth(container);
  }

  setId() {
    this.id = this.month[0].date.toISOString().split("T")[0].slice(0, 7);
  }

  appendMonthTitle() {
    const title = document.createElement("h2");
    title.textContent = this.month[0].date.toLocaleString("default", {
      month: "long",
    });
    this.appendChild(title);
  }

  createContainer() {
    const container = document.createElement("div");
    this.appendChild(container);
    return container;
  }

  appendDayLabels(container) {
    const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    labels.forEach((label) => {
      const day_label = document.createElement("day-element");
      day_label.classList.add("label");
      day_label.innerText = label;
      container.appendChild(day_label);
    });
  }

  appendEmptyDaysBeforeMonth(container) {
    const first_day = this.month[0].date.getDay();
    for (let i = 0; i < first_day; i++) {
      const day_element = this.createEmptyDayElement();
      container.appendChild(day_element);
    }
  }

  appendDays(container) {
    this.day_elements = this.month.map((day) => new DayElement(day));
    this.day_elements.forEach((day_element) => {
      container.appendChild(day_element);
    });
  }

  appendEmptyDaysAfterMonth(container) {
    const last_day = this.month[this.month.length - 1].date.getDay();
    for (let i = last_day; i < 6; i++) {
      const day_element = this.createEmptyDayElement();
      container.appendChild(day_element);
    }
  }

  createEmptyDayElement() {
    const day_element = document.createElement("day-element");
    day_element.classList.add("empty");
    return day_element;
  }
}

export class CalendarElement extends HTMLElement {
  constructor(year) {
    super();
    this.calendar = new Calendar(year);

    this.setId(year);
    this.appendCalendarTitle(year);
    const container = this.createContainer();
    this.appendMonths(container);
  }

  setId(year) {
    this.id = year.toString();
  }

  appendCalendarTitle(year) {
    const title = document.createElement("h1");
    title.textContent = year.toString();
    this.appendChild(title);
  }

  createContainer() {
    const container = document.createElement("div");
    this.appendChild(container);
    return container;
  }

  appendMonths(container) {
    this.month_elements = this.calendar.days.map(
      (month) => new MonthElement(month)
    );
    this.month_elements.forEach((month_element) => {
      container.appendChild(month_element);
    });
  }
}

customElements.define("day-element", DayElement);
customElements.define("month-element", MonthElement);
customElements.define("calendar-element", CalendarElement);

export function createMonth(month) {
  const month_name = month[0].date.toLocaleString("default", { month: "long" });

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  let tr = document.createElement("tr");
  const th = document.createElement("th");
  th.colSpan = 7;
  th.textContent = month_name;
  tr.appendChild(th);
  thead.appendChild(tr);

  tr = document.createElement("tr");
  ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach((day) => {
    const th = document.createElement("th");
    th.textContent = day;
    tr.appendChild(th);
  });
  thead.appendChild(tr);

  // populate the empty dates at the beginning of the month
  const first_day = month[0].date.getDay();
  tr = document.createElement("tr");
  for (let i = 0; i < first_day; i++) {
    const td = document.createElement("td");
    tr.appendChild(td);
  }

  month.forEach((day) => {
    const td = document.createElement("td");
    td.textContent = day.date.getDate().toString();
    td.id = day.date.toDateString().split(" ").join("-");
    tr.appendChild(td);

    if (tr.children.length === 7) {
      tbody.appendChild(tr);
      tr = document.createElement("tr");
    }
  });

  // populate the empty dates at the end of the month
  const last_day = month[month.length - 1].date.getDay();
  for (let i = last_day + 1; i < 7; i++) {
    const td = document.createElement("td");
    tr.appendChild(td);
  }

  table.appendChild(thead);
  table.appendChild(tbody);
  return table;
}

export function createYear(year) {
  const outer_shell = document.createElement("div");
  outer_shell.classList.add("year");

  const title = document.createElement("h1");
  title.textContent = year[0][0].date.getFullYear().toString();
  outer_shell.appendChild(title);

  const container = document.createElement("div");
  container.classList.add("container");
  outer_shell.appendChild(container);

  year.forEach((month) => {
    container.appendChild(createMonth(month));
  });

  return outer_shell;
}
