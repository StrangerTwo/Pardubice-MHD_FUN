export default class BusManager {

    places;
    buslines;
    timetables;
    map;

    constructor(sizeCoeficient, buslines) {
        this.buslines = buslines;

        this.sizeCoeficient = sizeCoeficient;
        this.map = document.getElementById("pce-map");
    }

    Render() {
        this.map.querySelectorAll(".bus").forEach((element) => {
            element.parentElement.removeChild(element);
        })
        for (let busline of this.buslines) {
            this.renderBusline(busline);
        }
    }

    renderBusline(busline) {
        const timetable = this.timetables.find(x => x.number == busline.number && x.smer == busline.smer);
        if (timetable) {
            var date = new Date();
            var currentTime = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

            for (var i = 0; i < timetable.times.length; i++) {
                var timeStr = timetable.times[i];
                var startTime = timeStr.split(':')[0] * 3600 + timeStr.split(':')[1] * 60;

                var endTime = startTime + timetable.delayes[timetable.delayes.length - 1] * 60;

                if (currentTime > startTime && currentTime < endTime) {
                    this.renderBus(busline, currentTime, timetable.delayes.map(x => startTime + x * 60));
                }
            }
        }else
            console.error(`Chybějící timetable pro number: ${busline.number} a smer: ${busline.smer}`);
    }

    renderBus(busline, currentTime, stopTimes) {
        // startTime => busline.route[0];
        // startTime + delayes[i] => busline.route[i + 1];

        // times are in seconds from 0 to 24*60*60

        // busline.route busstops length should be the same as stopTimes length

        // start from last stop and go down
        // if current time is larger than stop time, bus should be between this stop and the next one
        for (let i = stopTimes.length - 2; i > 0; i--) {
            // dont check the last stop - it wont be shown anyway

            if (currentTime >= stopTimes[i]) {
                // currentTime should be between stopTimes[i] and stopTimes[i+1]

                var ratio = (currentTime - stopTimes[i]) / (stopTimes[i+1] - stopTimes[i])
                var busStopRoute = this.getRouteBetweenBusstopsIndexes(i, i + 1, busline.route);
                // console.log(busline.route.map(x => this.places.find(y => y.id == x)));
                // console.log(`Start ${i} konec ${i + 1}`)
                // console.log(busStopRoute);
                if (busStopRoute) {
                    this.renderBusOnRoute(ratio, busStopRoute);
                }else
                    console.error(`Problém při hledání trasy od ${i} ${i + 1} na trase ${busline.number} ${busline.smer}`)

                break;
            }
        }
    }

    renderBusOnRoute(ratio, route) {
        var length = 0;

        for (var i = 1; i < route.length; i++) {
            let [ax, ay] = this.getPosition(route[i]);
            let [bx, by] = this.getPosition(route[i-1]);

            length += Math.hypot(ax - bx, ay - by);
        }
        var distanceFromStop = length * ratio;

        var placeFrom, placeTo, ratioFromPlace;

        for (var i = 1; i < route.length; i++) {
            let [ax, ay] = this.getPosition(route[i]);
            let [bx, by] = this.getPosition(route[i-1]);

            let distanceBetween = Math.hypot(ax - bx, ay - by);
            if (distanceFromStop - distanceBetween < 0) {
                placeFrom = route[i - 1];
                placeTo = route[i];
                ratioFromPlace = distanceFromStop / distanceBetween;
                break;
            }
            distanceFromStop -= distanceBetween;
        }

        if (placeFrom && placeTo) {
            let [ax, ay] = this.getPosition(placeFrom);
            let [bx, by] = this.getPosition(placeTo);

            var length = Math.hypot(ax - bx, ay - by) * ratioFromPlace;
            var angle = Math.atan2(by-ay, bx-ax) * 180 / Math.PI;
    
            const bus = document.createElement("div");
            bus.classList.add("bus");
            bus.style.height = 10 + "px";
            bus.style.width = 20 + "px";
            bus.style.left = (ax + (bx - ax) * ratioFromPlace) + "px";
            bus.style.top = (ay + (by - ay) * ratioFromPlace) + "px";
            bus.style.transform = "rotate(" + angle + "deg)";
            bus.style.transformOrigin = "left 50%";
            // bus.style.backgroundImage = "url('/bus.png')";
            bus.style.backgroundColor = "green";

            // console.log(`Zobrazen autobus na trase mezi ${route[0].name} a ${route[route.length - 1].name}`);
    
            this.map.appendChild(bus);
        }else{
            console.error(`Nenalezena pozice autobusu vzdálenost ${distanceFromStop} trasa: ${route.length}`);
        }
    }

    getRouteBetweenBusstopsIndexes(startIndex, stopIndex, route) {
        var routePlaces = [];

        var busStopIndex = 0;

        for (let i = 0; i < route.length; i++) {
            let place = this.places.find(x => x.id == route[i]);
            if (place) {
                if (place.name) { // Jedná se o zastávku
                    if (busStopIndex >= startIndex) {
                        routePlaces.push(place);
                    }
                    if (busStopIndex == stopIndex) {
                        return routePlaces;
                    }
                    busStopIndex += 1;
                }else{
                    if (busStopIndex >= startIndex) {
                        routePlaces.push(place);
                    }
                }

            }else
                console.error(`Chybějící place pro id: ${route[i]}`);
        }

        return false;
    }
    
    getPosition(place) {
        return [place.x * this.sizeCoeficient, place.y * this.sizeCoeficient];
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