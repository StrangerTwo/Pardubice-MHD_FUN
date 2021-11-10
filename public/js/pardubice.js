import Model from './model.js';
const Place = Model.Place;
const BusStop = Model.BusStop;

class Pardubice {

    places;
    buslines;
    sizeCoeficient;
    width = 2339;
    height = 1654;
    map;

    constructor(sizeCoeficient) {
        this.places = [];
        this.sizeCoeficient = sizeCoeficient;

        this.map = document.getElementById("pce-map");
    }

    async DownloadData() {
        await this.fillInPlaces();
        await this.fillInLines();
        return true;
    }

    async fillInLines() {
        await fetch('api/getLines')
            .then(response => response.json())
            .then(data => {
                this.buslines = data;
            })
    }

    async fillInPlaces() {
        await fetch('api/getPlaces')
            .then(response => response.json())
            .then(data => {
                this.places = data;
            })
    }

    Render() {
        if (this.places.length == 0) { return false };
        // console.log(this.places.length)
        this.map.style.width = this.width * this.sizeCoeficient + "px";
        this.map.style.height = this.height * this.sizeCoeficient + "px";

        this.places.forEach((place) => {
            let circle = document.createElement("div");
            circle.classList.add("place");

            if (place.name) {
                circle.classList.add("bus-stop");
                circle.addEventListener("mouseover", (e) => {
                    this.createDetail(e.target, place);
                });
                circle.addEventListener("mouseleave", (e) => {
                    this.removeDetail();
                });
            }
            else {
                // TODO: Remove
                circle.addEventListener("mouseover", (e) => {
                    this.createDetail(e.target, place);
                });
                circle.addEventListener("mouseleave", (e) => {
                    this.removeDetail();
                });
            }

            const [x, y] = this.getPosition(place);

            circle.style.left = x + "px";
            circle.style.top = y + "px";

            this.map.appendChild(circle);
        })


        for (let busline of this.buslines) {
            this.renderBusline(busline);
        }
        this.linedraw(this.places.find(x => x.id == 1), this.places.find(x => x.id == 2))
        return true;
    }

    renderBusline(busline) {
        for (let i = 1; i < busline.route.length; i++) {
            this.linedraw(this.getPlaceById(busline.route[i - 1]), this.getPlaceById(busline.route[i]));
        }
    }

    getPlaceById(id) {
        return this.places.find(x => x.id == id);
    }

    linedraw(a, b) {
        var [ ax, ay ] = this.getPosition(a);
        var [ bx, by ] = this.getPosition(b);

        var calc = Math.atan(Math.abs(ay - by) / Math.abs(bx - ax));
        calc = calc * 180 / Math.PI - 90;
        var length = Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));

        if (bx < ax) {
            calc = 360 - calc;
        }
        else if (by < ay) {
            calc = 360 - calc;
            let prom = ax;
            ax = bx;
            bx = prom;
            prom = ay;
            ay = by;
            by = prom;
        }

        const line = document.createElement("div");
        line.classList.add("road");
        line.style.height = length + "px";
        line.style.width = 2 * this.sizeCoeficient + "px";
        line.style.top = ay + "px";
        line.style.left = ax + "px";
        line.style.transform = "rotate(" + calc + "deg)";
        line.style.transformOrigin = "0 0";

        // this.map.innerHTML += "<div style='width:1px;background-color:black;position:absolute;top:" + (ay) + "px;left:" + (ax) + "px;transform:rotate(" + calc + "deg);-ms-transform:rotate(" + calc + "deg);transform-origin:0% 0%;-moz-transform:rotate(" + calc + "deg);-moz-transform-origin:0% 0%;-webkit-transform:rotate(" + calc + "deg);-webkit-transform-origin:0% 0%;-o-transform:rotate(" + calc + "deg);-o-transform-origin:0% 0%;'></div>"
        this.map.appendChild(line);
    }

    getPosition(place) {
        return [place.x * this.sizeCoeficient, place.y * this.sizeCoeficient];
    }

    detailDiv;

    removeDetail() {
        if (this.detailDiv) {
            this.detailDiv.parentNode.removeChild(this.detailDiv);
            this.detailDiv = null;
        }
    }

    createDetail(target, place) {
        // TODO: uncomment
        if (!target.classList.contains("place")) return;
        this.removeDetail();

        this.detailDiv = document.createElement("div");
        this.detailDiv.classList.add("bus-stop-detail-watermark");

        const detailValues = document.createElement("div");
        detailValues.classList.add("bus-stop-detail");
        this.detailDiv.appendChild(detailValues);

        const ul = document.createElement("ul");
        detailValues.appendChild(ul);

        let li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML = place.name ? place.name : "";

        li = document.createElement("li");
        ul.appendChild(li);

        // li.innerHTML = `<p>Autobusy:</p><p>1, 2, 3, 4, 5</p><p>ID : ${place.id}</p>`
        let buses = [];
        this.buslines.forEach((buslines) => {
            buslines.route.forEach((buslinePlace) => {
                if(buslinePlace == place.id){
                    if(!buses.includes(buslines.number))
                        buses.push(buslines.number);
                }
            })
        })
        li.innerHTML = `<p>Autobusy: `;
        for (let i = 0; i < buses.length; i++) {
            li.innerHTML += buses[i];
            if(i != buses.length - 1){
                li.innerHTML += ", ";
            }
        }
        li.innerHTML += ` </p><p>ID : ${place.id}</p>`;

        target.appendChild(this.detailDiv);

        if (parseInt(target.style.left, 10) + this.detailDiv.offsetWidth > this.width * this.sizeCoeficient) {
            this.detailDiv.classList.add("option-left");
        }
    }
}

export default Pardubice;