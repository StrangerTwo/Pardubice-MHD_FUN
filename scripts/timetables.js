const puppeteer = require('puppeteer');
const fs = require('fs');

const TYPE_POLOOKRUZNI = "polookruzni";

async function getTimeTable(page, busNumber, type, link) {
    await page.goto(link);
    console.log(type);
}

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    var timetables = [];

    timetables = [...timetables, await getTimeTable(page, 1, TYPE_POLOOKRUZNI, 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR100000001001A.htm')]

    
    await browser.close();

    const timetablesJson = JSON.stringify(timetables);
    fs.writeFile(__dirname + "/../server/files/timetables.json", timetablesJson, (err) => {
        if(err) {
            return console.log(err);
        }
        console.log("Timetables were updated successfully!");
    });
}

console.log("not working yet");
//run();