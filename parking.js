'use strict';
const API_URL = "https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_parkings_publics/records?limit=30";

const parkingImages = {
    "Alhambra": "Images/Alhambra parking.jpg",
    "Centre": "Images/Centre_Centrum Parking.jpg",
    "De Brouckère": "Images/De brouckère parking.jpg",
    "Docks Bruxsel": "Images/Docks Brussel parking.jpg",
    "Grote Markt": "Images/Grote markt parking.jpg",
    "Guldenvlies": "Images/Guldenvlies parking.jpg",
    "Hallepoort": "Images/Hallepoort parking.jpg",
    "Industrie": "Images/Industrie parking.jpg",
    "Lepage": "Images/Lepage parking.jpg",
    "Munt": "Images/Monnaie_munt parking.jpg",
    "P+R HEYSEL": "Images/P+R Heysel.jpg",
    "Dansaert": "Images/Parking danseart.jpg",
    "Passage 44": "Images/Passage 44 parking.jpg",
    "Poelaert": "Images/Poelaert parking.jpg",
    "Rogier": "Images/Rogier.jpg",
    "Rouppe - Fontainas": "Images/Roupe fontainas parking.jpg",
    "Spectrum": "Images/Spectrum Parking.jpg",
    "Up-Site": "Images/Up site parking.jpg",
    "Vleurgat": "Images/Vleurgat Parking.jpg",
    "Warwick": "Images/Warwick parking.jpg",
    "CCN": "Images/CCN parking.jpg",
    "Albertine Square": "Images/Albertine square.jpg",
    "Pacheco": "Images/Pacheco.jpg",
    "Kruidtuin-Sint-Jan": "Images/Kruidtuin.jpg",
    "Deux Portes":"Images/2portes.jpg",
    "Royal": "Images/royal.jpg",
    "City 2": "Images/city2.jpg",
    "Schildknaap": "Images/schildknaap.jpg"

};
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

    tableBody.innerHTML = data.map(p => {

        const imageKey = Object.keys(parkingImages).find(key =>
            (p.name_nl || "").toLowerCase().includes(key.toLowerCase())
        );

        return `
            <tr>
                <td>${p.name_nl || "-"}</td>
                <td>${p.adres_ || "-"}</td>
                <td>${p.operator_fr || "-"}</td>
                <td>${p.capacity || "-"}</td>
                <td>${p.maxheight || "-"}</td>
                <td>${p.commune_gemeente || "-"}</td>

                <td>
                    <img src="${parkingImages[imageKey] || ''}" width="100">
                </td>

                <td>
                    <button onclick="toggleFavoriet('${p.name_nl}')">
                        ${favorieten.includes(p.name_nl) ? "❤️" : "❌"}
                    </button>
                </td>
            </tr>
        `;
    }).join("");
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
const table = document.querySelector("table");
if (table) {
    observer.observe(table);
}
function updateThemeButton() {
    const btn = document.getElementById("themeBtn");

    if (document.body.classList.contains("dark")) {
        btn.textContent = "☀️ Light mode";
    } else {
        btn.textContent = "🌙 Dark mode";
    }
}
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

updateThemeButton();

// klik
document.getElementById("themeBtn").addEventListener("click", () => {
    document.body.classList.toggle("dark");

    localStorage.setItem("darkMode",
        document.body.classList.contains("dark")
    );

    updateThemeButton(); 
});

const form = document.getElementById("testForm");
const naamInput = document.getElementById("naam");
const welkomTekst = document.getElementById("welkom");
// bij submit
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const naam = naamInput.value.trim();

// VALIDATIE
    if (naam.length < 2) {
        alert("Naam moet minstens 2 letters hebben!");
        return;
    }

    // opslaan
    localStorage.setItem("gebruikerNaam", naam);

    // tonen
    welkomTekst.textContent = `Welkom ${naam} `;

    // reset input
    form.reset();
    const opgeslagenNaam = localStorage.getItem("gebruikerNaam");

if (opgeslagenNaam) {
    welkomTekst.textContent = `Welkom ${opgeslagenNaam} 👋`;
}
});