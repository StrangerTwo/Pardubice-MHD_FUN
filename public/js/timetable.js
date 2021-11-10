export default class Timetable {
    busNumber;
    type;
    times;

    constructor(busNumber, type, times) {
        this.busNumber = busNumber;
        this.type = type;
        this.times = times;
    }
}