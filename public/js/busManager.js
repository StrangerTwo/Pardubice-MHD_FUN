export default class BusManager {

    places;
    timetables;

    constructor() {
        console.log("new Busmanager >OOOO");
    }

    async DownloadData() {
        await this.fillInPlaces();
        await this.fillInTimetables();
        
        return true;
    }
    
    async fillInPlaces() {
        await fetch('/data/places.json')
            .then(response => response.json())
            .then(data => {
                this.places = data;
            })
    }
    
    async fillInTimetables() {
        await fetch('/data/timetables.json')
            .then(response => response.json())
            .then(data => {
                this.timetables = data;
            })
    }
}