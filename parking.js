'use strict';
const API_URL = "https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_parkings_publics/records?limit=20";
async function getParkings() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const tableBody = document.querySelector("#parkingTable tbody");

        tableBody.innerHTML = data.results.map(p => `
            <tr>
                <td>${p.name_nl}</td>
                <td>${p.adres_}</td>
                <td>${p.operator_fr}</td>
                <td>${p.capacity}</td>
                <td>${p.maxheight}</td>
                <td>${p.commune_gemeente}</td>
            </tr>
        `).join("");

    } catch (error) {
        console.error("Fout bij ophalen parkings:", error);
    }
}

getParkings();