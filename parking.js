'use strict';
const API_URL = "https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_parkings_publics/records?limit=30";

// array om data op te slaan
let parkings = [];
let favorieten = JSON.parse(localStorage.getItem("favorieten")) || [];
let toonAlleenFavorieten = false;

// data ophalen (async + await)
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

// tabel maken met template literals
function maakTabel(data) {
    const tableBody = document.querySelector("#parkingTable tbody");

    tableBody.innerHTML = data.map(p => `
        <tr>
            <td>${p.name_nl || "-"}</td>
            <td>${p.adres_ || "-"}</td>
            <td>${p.operator_fr || "-"}</td>
            <td>${p.capacity || "-"}</td>
            <td>${p.maxheight || "-"}</td>
            <td>${p.commune_gemeente || "-"}</td>
            <td>
                <button onclick="toggleFavoriet('${p.name_nl}')">
                    ${favorieten.includes(p.name_nl) ? "❤️" : "No"}
                </button>
            </td>
        </tr>
    `).join("");
}

// zoekfunctie (event listener)
document.getElementById("searchInput").addEventListener("input", (e) => {
    const zoekTerm = e.target.value.toLowerCase();

    const gefilterd = parkings.filter(p =>
        (p.name_nl || "").toLowerCase().includes(zoekTerm) ||
        (p.adres_ || "").toLowerCase().includes(zoekTerm)
    );

    maakTabel(gefilterd);
});

document.getElementById("toggleFavs").addEventListener("click", () => {
    toonAlleenFavorieten = !toonAlleenFavorieten;
if (toonAlleenFavorieten){
    const gefilterd = parkings.filter(p =>
        favorieten.includes(p.name_nl)
    );
    maakTabel(gefilterd);
}else{
    maakTabel(parkings);
}
})

// sorteer systeem
let sorteerRichtingPerKolom = {};

document.querySelectorAll("th").forEach(kolom => {
    kolom.addEventListener("click", () => {
        const sleutel = kolom.dataset.key;

        sorteerRichtingPerKolom[sleutel] = !sorteerRichtingPerKolom[sleutel];

        const gesorteerdeParkings = [...parkings].sort((a, b) => {
            let waardeA = a[sleutel];
            let waardeB = b[sleutel];

            // cijfers sorteren
            if (!isNaN(Number(waardeA)) && !isNaN(Number(waardeB))) {
                return sorteerRichtingPerKolom[sleutel]
                    ? waardeA - waardeB
                    : waardeB - waardeA;
            }

            
            waardeA = (waardeA || "").toString().toLowerCase();
            waardeB = (waardeB || "").toString().toLowerCase();

            if (waardeA < waardeB) return sorteerRichtingPerKolom[sleutel] ? -1 : 1;
            if (waardeA > waardeB) return sorteerRichtingPerKolom[sleutel] ? 1 : -1;

            return 0;
        });

        maakTabel(gesorteerdeParkings);
    });
});

getParkings();
function toggleFavoriet(naam) {
    if (favorieten.includes(naam)) {
        favorieten = favorieten.filter(f => f !== naam);
    } else {
        favorieten.push(naam);
    }

    localStorage.setItem("favorieten", JSON.stringify(favorieten));
    if (toonAlleenFavorieten) {
        const gefilterd = parkings.filter(p =>
            favorieten.includes(p.name_nl)
        );
        maakTabel(gefilterd);
    } else {
        maakTabel(parkings);
    }
}
// Observer API
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log("Element zichtbaar")
        }
    });
});
observer.observe(document.querySelector("table"));

document.body.classList.toggle("dark")
const themeBtn = document.getElementById("themeBtn")
themeBtn.addEventListener("click", () => {
    document.body.style.backgroundColor("dark");
});