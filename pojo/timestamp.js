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

  toString() {
    return this.toDate().toLocaleDateString();
  }

  equals(object) {
    if (!object) {
      return false;
    }

    const areYearsEqual = this.getYear() === object.getYear();
    const areMonthsEqual = this.getMonth() === object.getMonth();
    const areDaysEqual = this.getDay() === object.getDay();

    return areYearsEqual && areMonthsEqual && areDaysEqual;
  }

  copy() {
    return new Timestamp(this.year, this.month, this.day);
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

  toDate() {
    return new Date(this.year, this.getMonthIndex(this.month), this.day);
  }

  getMonthIndex(month) {
    return months.indexOf(month);
  }

  static today() {
    const todayAsDate = new Date();

    const timestamp = new Timestamp(
      todayAsDate.getFullYear(),
      months[todayAsDate.getMonth() + 1],
      todayAsDate.getDate()
    );

    return timestamp;
  }
}
