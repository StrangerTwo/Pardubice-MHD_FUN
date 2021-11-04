class Place {
    x;
    y;

    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}

class BusStop {
    place;
    name;
    
    constructor (name, x, y) {
        this.name = name;
        this.place = new Place(x, y);
    }
}

module.exports = {
    Place : Place,
    BusStop : BusStop
}