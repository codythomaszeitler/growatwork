const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
Object.freeze(months);

export class Timestamp {
  constructor(year, month, day) {
    if (!year) {
      throw new Error("Cannot create a timestamp without a year");
    }

    if (!month) {
      throw new Error("Cannot create a timestamp without a month");
    }

    if (!months.includes(this.properlyCapitalizeMonth(month))) {
      throw new Error("The given month [" + month + "] is not a real month");
    }

    if (!day) {
      throw new Error("Cannot create a timestamp without a day");
    }

    this.year = year;
    this.month = this.properlyCapitalizeMonth(month);
    this.day = day;
  }

  properlyCapitalizeMonth(month) {
    const capitalizeFirstLetter = s => {
      return s.charAt(0).toUpperCase() + s.slice(1);
    };

    let lowercase = month.toLowerCase();
    return capitalizeFirstLetter(lowercase);
  }

  getYear() {
    return this.year;
  }

  getMonth() {
    return this.month;
  }

  getDay() {
    return this.day;
  }
}
