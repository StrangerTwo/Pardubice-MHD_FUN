import BusManager from './busManager.js';

class Pardubice {

    busManager;
    places;
    buslines;
    sizeCoeficient;
    width = 3067;
    height = 3500;
    map;
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
        for (let i = 1; i < busline.route.length; i++) {
            this.linedraw(this.getPlaceById(busline.route[i - 1]), this.getPlaceById(busline.route[i]));
        }
    }

    getPlaceById(id) {
        return this.places.find(x => x.id == id);
    }

    linedraw(a, b) {
        var [ax, ay] = this.getPosition(a);
        var [bx, by] = this.getPosition(b);

        var length = Math.hypot(ax - bx, ay - by);
        var angle = Math.atan2(by-ay, bx-ax) * 180 / Math.PI;

        const line = document.createElement("div");
        line.classList.add("road");
        line.style.height = 4 + "px";
        line.style.width = length + "px";
        line.style.left = ax + "px";
        line.style.top = ay + "px";
        line.style.transform = "rotate(" + angle + "deg)";
        line.style.transformOrigin = "left 50%";

        this.map.appendChild(line);
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

    detailDiv;

    removeDetail() {
        if (this.detailDiv) {
            this.detailDiv.parentNode.removeChild(this.detailDiv);
            this.detailDiv = null;
        }
    }

    createDetail(target, place) {
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

        let p = document.createElement("p");
        p.innerHTML = "Autobusy: "
        for (let i = 0; i < buses.length; i++) {
            p.innerHTML += buses[i];
            if(i != buses.length - 1){
                p.innerHTML += ", ";
            }
        }
        li.appendChild(p);

        li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML = `ID : ${place.id}`;

        target.appendChild(this.detailDiv);

        if (parseInt(target.style.left, 10) + this.detailDiv.offsetWidth > this.width * this.sizeCoeficient) {
            this.detailDiv.classList.add("option-left");
        }
    }
}

export default Pardubice;