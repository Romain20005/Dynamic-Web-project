const API_URL = "https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_parkings_publics/records?limit=30";

let parkings = [];

async function getParkings() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        parkings = data.results;
        maakTabel(parkings);

    } catch (error) {
        console.error("Fout bij ophalen data:", error);
    }
}


function maakTabel(data) {
    const tableBody = document.querySelector("#parkingTable tbody");

    tableBody.innerHTML = data.map(p => `
        <tr>
            <td>${p.name_nl}</td>
            <td>${p.adres_}</td>
            <td>${p.operator_fr}</td>
            <td>${p.capacity}</td>
            <td>${p.maxheight}</td>
            <td>${p.commune_gemeente}</td>
        </tr>
    `).join("");
}

document.getElementById("searchInput").addEventListener("input", (e) => {
    const zoekTerm = e.target.value.toLowerCase();

    const gefilterd = parkings.filter(p =>
        p.name_nl.toLowerCase().includes(zoekTerm) ||
        p.adres_.toLowerCase().includes(zoekTerm)
    );

    maakTabel(gefilterd);
});
let sorteerRichtingPerKolom = {};

document.querySelectorAll("th").forEach(kolom => {
    kolom.addEventListener("click", () => {
        const sleutel = kolom.dataset.key;

        sorteerRichtingPerKolom[sleutel] = !sorteerRichtingPerKolom[sleutel];

        const gesorteerdeParkings = [...parkings].sort((eersteParking, tweedeParking) => {
            let waardeEerste = eersteParking[sleutel];
            let waardeTweede = tweedeParking[sleutel];

            if (!isNaN(waardeEerste) && !isNaN(waardeTweede)) {
                return sorteerRichtingPerKolom[sleutel]
                    ? waardeEerste - waardeTweede
                    : waardeTweede - waardeEerste;
            }

            waardeEerste = (waardeEerste || "").toString().toLowerCase();
            waardeTweede = (waardeTweede || "").toString().toLowerCase();

            if (waardeEerste < waardeTweede) {
                return sorteerRichtingPerKolom[sleutel] ? -1 : 1;
            }

            if (waardeEerste > waardeTweede) {
                return sorteerRichtingPerKolom[sleutel] ? 1 : -1;
            }

            return 0;
        });

        maakTabel(gesorteerdeParkings);
    });
});
getParkings();