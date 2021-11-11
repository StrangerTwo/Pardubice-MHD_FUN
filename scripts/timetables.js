const puppeteer = require('puppeteer');
const fs = require('fs');



async function getTimeTable(page, busNumber, smer, link) {
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

    // https://www.dpmp.cz/cestovani-mhd/jizdni-rady/1-17.html

    timetables = [...timetables, await getTimeTable(page, 1, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR100000001001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 2, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR200000039001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 2, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR200000020001B.htm')];
    timetables = [...timetables, await getTimeTable(page, 3, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210823/JR300000016001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 3, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210823/JR300000038002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 4, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR400000039001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 5, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR500000042001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 5, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR500000110002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 6, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR600000124001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 6, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR600000065002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 7, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR700000065002A.htm')];
    timetables = [...timetables, await getTimeTable(page, 7, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR700000035004B.htm')];
    timetables = [...timetables, await getTimeTable(page, 8, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR800000221002A.htm')];
    timetables = [...timetables, await getTimeTable(page, 9, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR900000016002A.htm')];
    timetables = [...timetables, await getTimeTable(page, 9, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR900000247002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 10, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR1000000165001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 10, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR1000000117001B.htm')];
    timetables = [...timetables, await getTimeTable(page, 11, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1100000035004A.htm')];
    timetables = [...timetables, await getTimeTable(page, 11, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1100000110002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 12, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1200000016001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 12, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1200000235002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 13, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR1300000117001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 13, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR1300000110002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 14, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1400000203001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 14, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1400000039001B.htm')];
    timetables = [...timetables, await getTimeTable(page, 15, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR1500000146001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 15, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR1500000016002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 16, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1600000016002A.htm')];
    timetables = [...timetables, await getTimeTable(page, 16, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1600000183002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 17, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1700000016002A.htm')];
    timetables = [...timetables, await getTimeTable(page, 17, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1700000173002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 18, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1800000179001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 18, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1800000111001B.htm')];
    timetables = [...timetables, await getTimeTable(page, 19, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1900000205002A.htm')];
    timetables = [...timetables, await getTimeTable(page, 19, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR1900000151001B.htm')];
    timetables = [...timetables, await getTimeTable(page, 23, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR2300000203001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 23, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR2300000039001B.htm')];
    timetables = [...timetables, await getTimeTable(page, 24, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR2400000017001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 24, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR2400000016002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 25, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR2500000110002A.htm')];
    timetables = [...timetables, await getTimeTable(page, 25, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR2500000110002A.htm')];
    timetables = [...timetables, await getTimeTable(page, 26, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR2600000087004A.htm')];
    timetables = [...timetables, await getTimeTable(page, 26, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR2600000016002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 27, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR2700000098002A.htm')];
    timetables = [...timetables, await getTimeTable(page, 28, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR2800000197001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 28, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR2800000227002B.htm')];
    timetables = [...timetables, await getTimeTable(page, 29, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR2900000078002A.htm')];
    timetables = [...timetables, await getTimeTable(page, 29, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR2900000053001B.htm')];
    timetables = [...timetables, await getTimeTable(page, 33, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR3300000016001A.htm')];
    timetables = [...timetables, await getTimeTable(page, 33, "B", 'https://www.dpmp.cz/download/other/jr/platnost_20210701/JR3300000035004B.htm')];
    timetables = [...timetables, await getTimeTable(page, 88, "A", 'https://www.dpmp.cz/download/other/jr/platnost_20210901/JR8800000221002A.htm')];

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