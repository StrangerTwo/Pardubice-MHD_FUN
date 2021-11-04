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

        this.fillInPlaces();
    }

    fillInPlaces() {
        this.places = [...this.places, new BusStop("Srch, točna", 832, 66)];
        this.places = [...this.places, new BusStop("Srch, točna", 832, 66)];
        this.places = [...this.places, new BusStop("Srch, obecní úřad", 637, 66)];
        this.places = [...this.places, new Place(619, 66)];
        this.places = [...this.places, new Place(461, 96)];
        this.places = [...this.places, new BusStop("Srch, pohránov", 423, 105)];
        this.places = [...this.places, new BusStop("Srch, hrádek", 354, 122)];
        this.places = [...this.places, new Place(348, 124)];
        this.places = [...this.places, new BusStop("Doubravice, náměstí", 375, 187)];
        this.places = [...this.places, new Place(393, 227)];
        this.places = [...this.places, new Place(385, 251)];
        this.places = [...this.places, new BusStop("Semtín, hlavní brána", 351, 251)];
        this.places = [...this.places, new BusStop("Semtín, vlečka", 319, 251)];
        this.places = [...this.places, new BusStop("Rybitví, závod", 295, 251)];
        this.places = [...this.places, new Place(274, 283)];
        this.places = [...this.places, new BusStop("Rybitví, léčebna", 266, 299)];
        this.places = [...this.places, new BusStop("Rybitví, křižovatka", 255, 326)];
        this.places = [...this.places, new Place(249, 341)];
        this.places = [...this.places, new BusStop("Rybitví, Stavební šk.", 235, 341)];
        this.places = [...this.places, new BusStop("Černá u Boh., bytovky", 239, 364)];
        this.places = [...this.places, new BusStop("Černá u Boh.", 215, 424)];
        this.places = [...this.places, new Place(138, 406)];
        this.places = [...this.places, new BusStop("Živanice, Dědek", 68, 388)];
        this.places = [...this.places, new Place(68, 417)];
        this.places = [...this.places, new BusStop("Živanice", 68, 457)];
        this.places = [...this.places, new BusStop("Živanice, Nerad, odb.", 68, 512)];
        this.places = [...this.places, new BusStop("Živanice, Nerad", 68, 580)];
        this.places = [...this.places, new BusStop("UMA, továrna", 262, 251)];
        this.places = [...this.places, new BusStop("UMA, točna", 231, 251)];
        this.places = [...this.places, new BusStop("Lázdně Bohdaneč, aut. nádr.", 203, 251)];
        this.places = [...this.places, new BusStop("Lázdně Bohdaneč, nám.", 178, 251)];
        this.places = [...this.places, new BusStop("Lázdně Bohdaneč, točna", 147, 251)];
        this.places = [...this.places, new BusStop("Semtín zastávka", 416, 251)];
        this.places = [...this.places, new Place(503, 251)];
        this.places = [...this.places, new BusStop("Globus", 524, 251)];
        this.places = [...this.places, new BusStop("Trnová", 603, 251)];
        this.places = [...this.places, new Place(629, 251)];
        this.places = [...this.places, new BusStop("Globus, parkoviště", 503, 288)];
        this.places = [...this.places, new Place(503, 160)];
        this.places = [...this.places, new BusStop("Ohrazenice, točna", 468, 160)];
        this.places = [...this.places, new BusStop("Ohrazenice, Semtínská", 538, 160)];
        this.places = [...this.places, new Place(629, 160)];
        this.places = [...this.places, new Place(813, 160)];
        this.places = [...this.places, new BusStop("Staré Hradiště, Na Hledíku", 871, 174)];
        this.places = [...this.places, new BusStop("Staré Hradiště, ObÚ", 972, 206)];
        this.places = [...this.places, new Place(1022, 222)];
        this.places = [...this.places, new BusStop("Staré Hradiště, Psinek", 1051, 222)];
        this.places = [...this.places, new BusStop("Staré Hradiště, Brozany", 1140, 222)];
        this.places = [...this.places, new Place(1162, 222)];
        this.places = [...this.places, new BusStop("Ráby, křižovatka", 1162, 204)];
        this.places = [...this.places, new BusStop("Ráby, prodejna", 1162, 173)];
        this.places = [...this.places, new BusStop("Ráby, Kunětická hora", 1162, 139)];
        this.places = [...this.places, new BusStop("Němčice, chaloupky", 1162, 112)];
        this.places = [...this.places, new BusStop("Němčice, rybníček", 1162, 88)];
        this.places = [...this.places, new BusStop("Dříteč", 1162, 49)];
        this.places = [...this.places, new BusStop("Ohrazenice, škola", 629, 178)];
        this.places = [...this.places, new Place(629, 243)];
        this.places = [...this.places, new BusStop("Trnová", 649, 243)];
        this.places = [...this.places, new BusStop("Poděbradská", 788, 243)];
        this.places = [...this.places, new Place(833, 243)];
        this.places = [...this.places, new Place(871, 302)];
        this.places = [...this.places, new BusStop("Hradecká", 871, 377)];
        this.places = [...this.places, new Place(871, 444)];
        this.places = [...this.places, new BusStop("Univerzita", 995, 444)];
        this.places = [...this.places, new Place(1022, 444)];
        this.places = [...this.places, new BusStop("Cihelna, točna", 1022, 366)];
        this.places = [...this.places, new BusStop("Fáblovka", 1022, 296)];
        this.places = [...this.places, new Place(1022, 272)];
        this.places = [...this.places, new BusStop("Fáblovka, točna", 978, 272)];
        this.places = [...this.places, new BusStop("Staré Hradiště, hostinec", 1022, 250)];
        this.places = [...this.places, new BusStop("Trnová, nám.", 629, 280)];
        this.places = [...this.places, new BusStop("Polabiny, TÚ", 629, 341)];
        this.places = [...this.places, new BusStop("Polabiny, Sluneční", 629, 401)];
        this.places = [...this.places, new BusStop("Polabiny, Okrajová", 629, 425)];
        this.places = [...this.places, new Place(629, 444)];
        this.places = [...this.places, new BusStop("Rosice, Kréta", 519, 444)];
        this.places = [...this.places, new BusStop("Rosice, pošta", 433, 444)];
        this.places = [...this.places, new BusStop("Rosice, náměstí", 397, 444)];
        this.places = [...this.places, new BusStop("Rosice, Gen. Svobody", 353, 444)];
        this.places = [...this.places, new BusStop("Rosice, točna", 295, 444)];
        this.places = [...this.places, new BusStop("Rybitví, zadní brána", 271, 389)];
        this.places = [...this.places, new BusStop("Bělehradská", 673, 444)];
        this.places = [...this.places, new Place(775, 444)];
        this.places = [...this.places, new BusStop("Polabiny, hotel", 813, 444)];
        this.places = [...this.places, new BusStop("Polabiny, Kosmonautů", 775, 386)];
        this.places = [...this.places, new BusStop("Polabiny, točna", 775, 327)];
        this.places = [...this.places, new BusStop("Kpt. Bartoše", 629, 507)];
        this.places = [...this.places, new BusStop("Lidická", 629, 584)];
        this.places = [...this.places, new BusStop("Polabiny, Albert HM", 629, 824)];
        this.places = [...this.places, new BusStop("Stavařov", 871, 509)];
        this.places = [...this.places, new BusStop("Zimní stadion", 871, 562)];
        this.places = [...this.places, new BusStop("Zimní stadion", 871, 674)];
        this.places = [...this.places, new Place(871, 700)];
        this.places = [...this.places, new BusStop("Sukova", 923, 700)];
        this.places = [...this.places, new BusStop("Sukova", 988, 700)];
        this.places = [...this.places, new Place(1081, 700)];
        this.places = [...this.places, new BusStop("Náměstí Republiky", 1081, 782)];
        this.places = [...this.places, new BusStop("Masarikovo náměstí", 871, 810)];
        this.places = [...this.places, new Place(871, 880)];
        this.places = [...this.places, new BusStop("Třída Míru", 924, 878)];
        this.places = [...this.places, new BusStop("U Grandu", 1052, 871)];
        this.places = [...this.places, new Place(1081, 866)];
        this.places = [...this.places, new BusStop("Palackého", 814, 880)];
        this.places = [...this.places, new Place(787, 882)];
        this.places = [...this.places, new BusStop("Palackého", 787, 888)];
        this.places = [...this.places, new BusStop("Autobus. nádraží", 719, 887)];
        this.places = [...this.places, new BusStop("Hlavní nádraží", 654, 894)];
        this.places = [...this.places, new Place(629, 893)];
        this.places = [...this.places, new BusStop("Albert HM", 603, 893)];
        this.places = [...this.places, new Place(570, 895)];
        this.places = [...this.places, new BusStop("Nadjezd Paramo", 570, 921)];
        this.places = [...this.places, new BusStop("K Polabinám", 775, 785)];        //Tady končí 14
        this.places = [...this.places, new BusStop("K Polabinám", 775, 760)];
        this.places = [...this.places, new Place(775, 750)];
        this.places = [...this.places, new BusStop("Závodu míru, sídliště", 730, 750)];
        this.places = [...this.places, new BusStop("Závodu míru", 680, 750)];
        this.places = [...this.places, new BusStop("17. listopadu", 871, 997)];
        this.places = [...this.places, new BusStop("Na Spravedlnosti", 871, 1102)];
        this.places = [...this.places, new Place(871, 1182)];
        this.places = [...this.places, new BusStop("Domov mládeže", 793, 1182)];
        this.places = [...this.places, new BusStop("Teplého", 668, 1182)];
        this.places = [...this.places, new Place(624, 1182)];
        this.places = [...this.places, new BusStop("Dopravní podnik, vozovna", 620, 1165)];           //Dopravní podnik pro trolejbus
        this.places = [...this.places, new BusStop("Dopravní podnik", 600, 1182)];
        this.places = [...this.places, new Place(570, 1185)];
        this.places = [...this.places, new BusStop("Závodiště", 511, 1185)];
        this.places = [...this.places, new Place(458, 1185)];
        this.places = [...this.places, new BusStop("Letiště", 422, 1185)];
        this.places = [...this.places, new BusStop("Letiště terminál", 422, 1270)];
        this.places = [...this.places, new Place(411, 1185)];
        this.places = [...this.places, new BusStop("Popkovice, školka", 370, 1210)];
        this.places = [...this.places, new Place(331, 1185)];
        this.places = [...this.places, new BusStop("Popkovice, hostinec", 298, 1185)];
        this.places = [...this.places, new BusStop("Svítkov, les", 458, 1150)];
        this.places = [...this.places, new Place(458, 1039)];
        this.places = [...this.places, new BusStop("Svítkov, škola", 433, 1039)];
        this.places = [...this.places, new BusStop("Svítkov, Kostnická", 368, 1039)];
        this.places = [...this.places, new Place(331, 1039)];
        this.places = [...this.places, new BusStop("Svítkov, park", 331, 1047)];
        this.places = [...this.places, new Place(331, 1085)];
        this.places = [...this.places, new BusStop("Popkovice, křižovatka", 331, 1152)];
        this.places = [...this.places, new Place(276, 1185)];
        this.places = [...this.places, new Place(257, 1085)];
        this.places = [...this.places, new BusStop("Svítkov, stadion", 267, 1071)];
        this.places = [...this.places, new Place(402, 864)];
        this.places = [...this.places, new BusStop("Nové Srnojedy", 382, 864)];
        this.places = [...this.places, new BusStop("Staré Srnojedy", 357, 864)];
        this.places = [...this.places, new BusStop("Lány na Důlku, Krchleby", 332, 864)];
        this.places = [...this.places, new BusStop("Lány na Důlku", 307, 864)];
        this.places = [...this.places, new BusStop("Lány na Důlku, Na Cihelně", 283, 864)];
        this.places = [...this.places, new BusStop("Opočínek, točna", 249, 864)];
        this.places = [...this.places, new Place(261, 1185)];
        this.places = [...this.places, new Place(261, 1397)];
        this.places = [...this.places, new BusStop("Starý Mateřov", 323, 1397)];
        this.places = [...this.places, new BusStop("Starý Mateřov, křižovatka", 370, 1397)];
        this.places = [...this.places, new BusStop("Čepí, prodejna", 370, 1512)];
        this.places = [...this.places, new BusStop("Staré Čivice, Přeloučská", 238, 1185)];
        this.places = [...this.places, new BusStop("Staré Čivice, hostinec", 214, 1185)];
        this.places = [...this.places, new Place(193, 1185)];
        this.places = [...this.places, new Place(214, 1185)];
        this.places = [...this.places, new Place(174, 1185)];
        this.places = [...this.places, new BusStop("Staré Čivice, točna", 192, 1215)];
        this.places = [...this.places, new BusStop("Staré Čivice, Na Štěpnici", 196, 1171)];
        this.places = [...this.places, new BusStop("Staré Čivice, Panasonic", 205, 1144)];
        this.places = [...this.places, new Place(222, 1091)];
        this.places = [...this.places, new BusStop("Staré Čivice, JTEKT", 205, 1092)];
        this.places = [...this.places, new BusStop("Staré Čivice, KYB", 157, 1094)];
        this.places = [...this.places, new Place(125, 1095)];
        this.places = [...this.places, new BusStop("Staré Čivice, Průmyslová zóna", 139, 995)];
    }

    Render() {
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
    }

    getPosition(place) {
        return [ place.x * this.sizeCoeficient, place.y * this.sizeCoeficient ];
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
    }
}

export default Pardubice;