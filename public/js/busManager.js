export default class BusManager {

    places;
    buslines;
    timetables;
    map;
    busesGroup;

    constructor(sizeCoeficient, buslines) {
        this.buslines = buslines;

        this.sizeCoeficient = sizeCoeficient;
        this.map = document.getElementById("pce-map");
        this.busesGroup = this.map.querySelector("#buses");
    }

    Render() {
        const buses = Array.from(this.map.parentElement.querySelectorAll(".bus"));
        var usedBuses = 0;
        for (let busline of this.buslines) {
            usedBuses += this.renderBusline(busline, buses.filter((x, i) => i >= usedBuses));
        }
        buses.filter((x, i) => i >= usedBuses).forEach(element => {
            element.parentElement.removeChild(element);
        })
    }

    renderBusline(busline, buses) {
        const timetable = this.timetables.find(x => x.number == busline.number && x.smer == busline.smer);
        var usedBuses = 0;
        if (timetable) {
            var date = new Date();
            var currentTime = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();

            for (var i = 0; i < timetable.times.length; i++) {
                var timeStr = timetable.times[i];
                var startTime = timeStr.split(':')[0] * 3600 + timeStr.split(':')[1] * 60;

                var endTime = startTime + timetable.delayes[timetable.delayes.length - 1] * 60;

                if (currentTime > startTime && currentTime < endTime) {
                    var bus = buses[usedBuses];
                    if (!bus) {
                        bus = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                        this.busesGroup.appendChild(bus);
                    }
                    this.renderBus(busline, currentTime, timetable.delayes.map(x => startTime + x * 60), bus);
                    usedBuses++;
                }
            }
        } else
            console.error(`Chybějící timetable pro number: ${busline.number} a smer: ${busline.smer}`);

        return usedBuses;
    }

    renderBus(busline, currentTime, stopTimes, element) {
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

                var ratio = (currentTime - stopTimes[i]) / (stopTimes[i + 1] - stopTimes[i])
                var busStopRoute = this.getRouteBetweenBusstopsIndexes(i, i + 1, busline.route);
                // console.log(busline.route.map(x => this.places.find(y => y.id == x)));
                // console.log(`Start ${i} konec ${i + 1}`)
                // console.log(busStopRoute);
                if (busStopRoute) {
                    this.renderBusOnRoute(ratio, busStopRoute, element, busline, stopTimes[0]);
                } else
                    console.error(`Problém při hledání trasy od ${i} ${i + 1} na trase ${busline.number} ${busline.smer}`, busline.route)

                break;
            }
        }
    }

    renderBusOnRoute(ratio, route, bus, busline, startTime) {
        var length = 0;

        for (var i = 1; i < route.length; i++) {
            let [ax, ay] = this.getPosition(route[i]);
            let [bx, by] = this.getPosition(route[i - 1]);

            length += Math.hypot(ax - bx, ay - by);
        }
        var distanceFromStop = length * ratio;

        var placeFrom, placeTo, ratioFromPlace;

        for (var i = 1; i < route.length; i++) {
            let [ax, ay] = this.getPosition(route[i]);
            let [bx, by] = this.getPosition(route[i - 1]);

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
            var angle = Math.atan2(by - ay, bx - ax) * 180 / Math.PI;

            // var bus = document.createElement("div");
            // bus.classList.add("bus");
            // bus.style.height = 10 + "px";
            // bus.style.width = 20 + "px";
            // bus.style.left = (ax + (bx - ax) * ratioFromPlace) + "px";
            // bus.style.top = (ay + (by - ay) * ratioFromPlace) + "px";
            // // bus.style.transform = "rotate(" + angle + "deg)";
            // // bus.style.transformOrigin = "left 50%";
            // bus.style.position = "absolute";
            // // bus.style.backgroundImage = "url('/bus.png')";
            // bus.style.backgroundColor = "green";

            // // this.map.parentElement.appendChild(bus);

            bus.classList.add("bus");
            bus.setAttribute("height", 10);
            bus.setAttribute("width", 20);
            bus.setAttribute("x", ax + (bx - ax) * ratioFromPlace)
            bus.setAttribute("y", ay + (by - ay) * ratioFromPlace)
            bus.setAttribute("fill", "green");
            bus.setAttribute("transform-box", "fill-box");
            bus.setAttribute("transform-origin", "center");
            bus.setAttribute("transform", "translate(-10, -5)");
            // TODO: fix rotate
            // bus.setAttribute(`transform", "translate(-10, -5) rotate(${angle})`);

            // bus.transformOrigin = "left 50%";

            bus.addEventListener("mouseover", (e) => {
                this.createDetail(e.target, busline, route[0], route[route.length - 1], startTime);
            });

            // bus.style.backgroundImage = "url('/bus.png')";

            // console.log(`Zobrazen autobus na trase mezi ${route[0].name} a ${route[route.length - 1].name}`);

        } else {
            console.error(`Nenalezena pozice autobusu vzdálenost ${distanceFromStop} trasa: ${route.length}`);
        }
    }

    getRouteBetweenBusstopsIndexes(startIndex, stopIndex, route) {
        var routePlaces = [];

        var busStopIndex = -1;
        var stopFound = false;

        for (let i = 0; i < route.length; i++) {
            let place = this.places.find(x => x.id == route[i]);
            if (place) {
                if (place.name) { // Jedná se o zastávku
                    busStopIndex += 1;
                    if (busStopIndex >= startIndex) {
                        routePlaces.push(place);

                        if (stopFound) return routePlaces;
                        else stopFound = true;
                    }
                } else {
                    if (stopFound) {
                        routePlaces.push(place);
                    }
                }

            } else
                console.error(`Chybějící place pro id: ${route[i]}`);
        }

        return false;
    }

    getPosition(place) {
        return [place.x * this.sizeCoeficient, place.y * this.sizeCoeficient];
    }

    removeDetail(detail) {
        if (detail) {
            detail.parentElement.removeChild(detail);
            return true;
        }
    }

    createDetail(target, busline, stopFrom, stopTo, startTime) {
        if (!target.classList.contains("bus")) return;

        const detail = document.createElement("div");
        detail.classList.add("bus-stop-detail-watermark");

        const detailValues = document.createElement("div");
        detailValues.classList.add("bus-stop-detail");
        detail.appendChild(detailValues);

        const ul = document.createElement("ul");
        detailValues.appendChild(ul);

        let li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML = `Autobus číslo ${busline.number}, směr: ${busline.smer}`;

        li = document.createElement("li");
        ul.appendChild(li);

        let p = document.createElement("p");
        p.innerHTML = `Na cestě z ${stopFrom.name} do ${stopTo.name}`;
        li.appendChild(p);

        li = document.createElement('li');
        ul.appendChild(li);

        var startDate = new Date(0, 0, 0, 0, 0, startTime);
        li.innerHTML = `Z ${this.places.find(p => p.id == busline.route[0]).name} vyjel v ${startDate.getHours()}:${startDate.getMinutes()}`;

        detail.style.left = target.getAttribute("x") + "px";
        detail.style.top = target.getAttribute("y") + "px";
        this.map.parentElement.appendChild(detail);

        if (parseInt(target.getAttribute("x"), 10) + detail.offsetWidth > this.width * this.sizeCoeficient) {
            detail.classList.add("option-left");
        }

        var detailTimer = setTimeout(() => {
            if (this.removeDetail(detail)) {
                clearInterval(detailTimer);
            }
        }, 750);

        detailValues.onmouseleave = () => {
            detailTimer = setTimeout(() => {
                if (this.removeDetail(detail)) {
                    clearInterval(detailTimer);
                }
            }, 750);
        };
        detailValues.onmouseenter = () => {
            clearTimeout(detailTimer);
        }

        return detail;
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