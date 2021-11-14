import BusManager from './busManager.js';

class Pardubice {

    busManager;
    places;
    buslines;
    sizeCoeficient;
    width = 3067;
    height = 3500;
    map;
    roadsGroup;
    placesGroup;
    displayedBuslines;

    constructor(sizeCoeficient) {
        this.displayedBuslines = [];
        this.sizeCoeficient = sizeCoeficient;
        this.displayedBuslines = [];

        this.map = document.getElementById("pce-map");

        this.busManager = new BusManager(sizeCoeficient, this.displayedBuslines);
        this.busManager.DownloadData()
            .then(() => {
                setInterval(() => this.busManager.Render(), 1000);
            })
    }

    async DownloadData() {
        await this.fillInPlaces();
        await this.fillInLines();
        this.buslines.forEach((busline) => {
            this.displayedBuslines.push(busline);
        })
        return true;
    }

    async fillInLines() {
        await fetch('/data/buslines.json')
            .then(response => response.json())
            .then(data => {
                this.buslines = data;
            })
    }

    async fillInPlaces() {
        await fetch('/data/places.json')
            .then(response => response.json())
            .then(data => {
                this.places = data;
            })
    }

    Render() {
        this.placesGroup = this.map.querySelector('#places');
        this.roadsGroup = this.map.querySelector('#roads');

        if (this.places.length == 0) { return false };
        this.map.setAttribute("width", this.width * this.sizeCoeficient);
        this.map.setAttribute("height", this.height * this.sizeCoeficient);

        const svgns = "http://www.w3.org/2000/svg";

        this.places.forEach((place) => {
            if (!place.name) return;

            let circle = document.createElementNS(svgns, "circle");
            circle.classList.add("place");

            if (place.name) {
                circle.classList.add("bus-stop");
                circle.setAttribute("r", 5);
                var detail;
                circle.addEventListener("mouseover", (e) => {
                    detail = this.createDetail(e.target, place);
                });
            }
            else {
                // TODO: Remove
                // circle.addEventListener("mouseover", (e) => {
                //     this.createDetail(e.target, place);
                // });
            }

            const [x, y] = this.getPosition(place);

            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("fill", "red");

            this.placesGroup.appendChild(circle);
        })
        
        this.generateSideBar();

        this.renderBuslines();
        
        return true;
    }

    renderBuslines() {
        this.map.querySelectorAll("div.road").forEach((road) => {
            road.parentNode.removeChild(road);
        });

        for (let busline of this.displayedBuslines) {
            this.renderBusline(busline);
        }
    }

    renderBusline(busline) {
        const colors = ["#FF0000", "#00FF00", "#0000FF", "#46032C", "#0AB92C", "#E1195E", "#31AE9F", "#EAD524", "#86784F", "#BA1B62", "#203248", "#FCCA73", "#547E39", "#D29442", "#81E514", "#030D62", "#F43712", "#02B8D5", "#910804", "#24AA64", "#928484", "#2A3628", "#4377F9", "#F28584", "#FDF020", "#980748", "#9143D1", "#F5DBC1"];
        const busIndex = [...new Set(this.buslines.map(x => x.number))].findIndex(x => x == busline.number);

        for (let i = 1; i < busline.route.length; i++) {
            this.linedraw(this.getPlaceById(busline.route[i - 1]), this.getPlaceById(busline.route[i]), colors[busIndex]);
        }
    }

    getPlaceById(id) {
        return this.places.find(x => x.id == id);
    }

    linedraw(a, b, color) {
        var [ ax, ay ] = this.getPosition(a);
        var [ bx, by ] = this.getPosition(b);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.classList.add("road")
        line.setAttribute("x1", ax);
        line.setAttribute("y1", ay);
        line.setAttribute("x2", bx);
        line.setAttribute("y2", by);
        line.setAttribute("stroke", color);

        this.roadsGroup.appendChild(line);
    }

    getPosition(place) {
        return [place.x * this.sizeCoeficient, place.y * this.sizeCoeficient];
    }

    generateSideBar(){
        let sidebar = document.querySelector("#sidebar ul");
        this.buslines.forEach((busline) => {
            let li = document.createElement("li");
            sidebar.appendChild(li);

            let checkBox = document.createElement("input");
            checkBox.type = "checkbox";
            checkBox.name = "buslines";
            checkBox.id = "bus-" + busline.number + busline.smer;
            checkBox.value = busline.number + busline.smer;
            checkBox.checked = true;
            checkBox.classList.add("form-check-input");
            checkBox.addEventListener("change", () => {
                if(checkBox.checked){
                    this.displayedBuslines.push(busline);
                }
                else{
                    let nbr = this.displayedBuslines.indexOf(busline);
                    this.displayedBuslines.splice(nbr, 1);
                }

                this.renderBuslines();
            });
            li.appendChild(checkBox);

            li.appendChild(document.createTextNode(" "));

            let label = document.createElement("label");
            label.classList.add("form-check-label");
            label.htmlFor = "bus-" + busline.number + busline.smer;
            label.innerText = busline.number + " " + busline.smer;
            li.appendChild(label);
        });
    }

    removeDetail(detail) {
        if (detail && detail.parentElement) {
            detail.parentElement.removeChild(detail);
            return true;
        }
    }

    createDetail(target, place) {
        if (!target.classList.contains("place")) return;

        const detail = document.createElement("div");
        detail.classList.add("bus-stop-detail-watermark");

        const detailValues = document.createElement("div");
        detailValues.classList.add("bus-stop-detail");
        detail.appendChild(detailValues);

        const ul = document.createElement("ul");
        detailValues.appendChild(ul);

        let li = document.createElement("li");
        ul.appendChild(li);
        li.innerHTML = place.name ? place.name : "";

        li = document.createElement("li");
        ul.appendChild(li);

        // li.innerHTML = `<p>Autobusy:</p><p>1, 2, 3, 4, 5</p><p>ID : ${place.id}</p>`
        let buses = [...new Set(this.buslines.filter(x => x.route.includes(place.id)).map(x => x.number))]

        let p = document.createElement("p");
        p.innerHTML = "Autobusy: " + buses.join(", ");
        li.appendChild(p);

        // Only a debug option
        // li = document.createElement('li');
        // ul.appendChild(li);
        // li.innerHTML = `ID : ${place.id}`;

        const [x, y] = this.getPosition(place);

        detail.style.top = y + "px";
        detail.style.left = x + "px";
        this.map.parentElement.appendChild(detail);

        if (parseInt(x, 10) + detail.offsetWidth > this.width * this.sizeCoeficient) {
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
}

export default Pardubice;