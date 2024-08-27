export class Day {
  constructor(date) {
    this.date = date;
    this.events = [];
  }
}

export class Calendar {
  constructor(year) {
    this.year = year;
    this.days = this.createCalendar();
  }

  getDates() {
    const dates = [];
    let current = new Date(this.year, 0, 1);
    while (current.getFullYear() === this.year) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  createCalendar() {
    const dates = this.getDates();
    const calendar = Array.from({ length: 12 }, () => []);
    for (let m = 0; m < 12; m++) {
      calendar[m] = dates
        .filter((date) => date.getMonth() === m)
        .map((date) => ({ date, events: [] }));
    }
    return calendar;
  }

  addEvent(month, day, event) {
    this.days[month - 1][day - 1].events.push(event);
  }
}
