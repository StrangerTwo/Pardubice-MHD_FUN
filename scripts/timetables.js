const puppeteer = require('puppeteer');
const fs = require('fs');

async function getTimeTable(page, busNumber, link) {
    await page.goto(link);
    
    console.log(link);
}

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    var timetables = [];

    timetables = [...timetables, await getTimeTable(page, 1, 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR100000001001A.htm')]

    
    await browser.close();

    const timetablesJson = JSON.stringify(timetables);
    fs.writeFile(__dirname + "/../server/files/timetables.json", timetablesJson, (err) => {
        if(err) {
            return console.log(err);
        }
        console.log("Timetables were updated successfully!");
    });
}

run();