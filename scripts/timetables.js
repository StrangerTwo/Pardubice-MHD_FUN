const puppeteer = require('puppeteer');
const fs = require('fs');



async function getTimeTable(page, smer, busNumber, link) {
    await page.goto(link);
    await page.waitForSelector('div.times')
    
    const [times, delayes] = await page.evaluate(() => {
        var rows = Array.from(document.querySelectorAll('div.times > table > tbody tr'));
        
        var times = [];
        for (let i = 1; i < rows.length; i++) {
            let valuesCell = rows[i].querySelector("td:nth-child(2)");
            if (valuesCell.innerText != ' ') {
                valuesCell.innerText.split(' ').forEach((minute) => {
                    times = [...times, i + 2 + ":" + minute.match(/\d+/).join('')];
                });
            }
        }

        rows = Array.from(document.querySelectorAll('div.stations > table > tbody tr'));
        var delayes = [];

        for(let row of rows) {
            valuesCell = row.querySelector("td:nth-child(3)");
            delayes.push(valuesCell.innerText);
        }
        return [times, delayes];
    })

    return {
        number: busNumber,
        smer: smer,
        times: times,
        delayes: delayes,
    };
}

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    var timetables = [];

    timetables = [...timetables, await getTimeTable(page, 1, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR100000001001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 2, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR200000039001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 2, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR200000020001B.htm')];
    timetables = [...timetables, await getTimeTable(page, 3, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210823/JR300000016001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 3, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210823/JR300000038002B.htm')];
    
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