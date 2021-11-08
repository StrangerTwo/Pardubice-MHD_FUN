class Place {
    x;
    y;
    type;

    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.type = 'place';
        // console.log("place");
    }
}

class BusStop {
    x;
    y;
    name;
    type;
    
    constructor (name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.type = 'busstop';
        // console.log("place");
    }
}

export default {
    Place : Place,
    BusStop : BusStop
}