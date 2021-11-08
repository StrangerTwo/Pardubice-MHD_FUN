import Model from './model.js';
const Place = Model.Place;
const BusStop = Model.BusStop;

class Pardubice {

    places;
    sizeCoeficient;
    width = 2339;
    height = 1654;
    map;

    constructor(sizeCoeficient) {
        this.places = [];
        this.sizeCoeficient = sizeCoeficient;

        this.map = document.getElementById("pce-map");
        this.fillInPlaces()

    }

    fillInPlaces() {
        fetch('api/getPlaces')
            .then(response => response.json())
            .then(data => {
                this.places = data;
            })
    }
    Render() {
        if (this.places.length == 0) {return false};
        // console.log(this.places.length)
        this.map.style.width = this.width * this.sizeCoeficient + "px";
        this.map.style.height = this.height * this.sizeCoeficient + "px";

        this.places.forEach((place) => {
            let circle = document.createElement("div");

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
                circle.classList.add("place");
            }

            const [x, y] = this.getPosition(place);

            circle.style.left = x + "px";
            circle.style.top = y + "px";

            this.map.appendChild(circle);
        })
        return true;
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
        if (!target.classList.contains("bus-stop")) return;
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
        li.innerHTML = place.name;

        li = document.createElement("li");
        ul.appendChild(li);

        li.innerHTML = `<p>Autobusy:</p><p>1, 2, 3, 4, 5</p>`

        target.appendChild(this.detailDiv);

        if (parseInt(target.style.left, 10) + this.detailDiv.offsetWidth > this.width * this.sizeCoeficient) {
            this.detailDiv.classList.add("option-left");
        }
    }
}

export default Pardubice;