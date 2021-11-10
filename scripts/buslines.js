const fs = require('fs');

function newBusline(busNumber, places) {
    return {
        number: busNumber,
        route: places,
    };
}

async function run() {
    var buslines = [];

    buslines = [...buslines, newBusline(1, [190, 188, 197, 176, 118, 117, 98, 100, 117, 118, 177, 197, 188, 189, 190])];
    buslines = [...buslines, newBusline(2, [86, 85, 83, 82, 75, 87, 88, 89, 108, 107, 106, 103, 99, 98, 93, 96, 208, 209, 211, 231, 251, 252, 260, 272, 273, 274, 275, 276, 300, 302, 300, 299, 322, 296, 288, 286, 259, 258, 257, 256])];

    const buslinesJson = JSON.stringify(buslines);
    fs.writeFile(__dirname + "/../server/files/buslines.json", buslinesJson, (err) => {
        if(err) {
            return console.log(err);
        }
        console.log("Buslines were updated successfully!");
    });
}

run();