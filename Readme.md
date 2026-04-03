# Brussels Parkings Explorer

##  Projectbeschrijving

Dit project is een interactieve webapplicatie die gebruik maakt van de open data API van Brussel.
De applicatie toont publieke parkings in Brussel en laat gebruikers toe om deze te bekijken, zoeken, sorteren en opslaan als favorieten.

Het doel van dit project is om verschillende JavaScript concepten toe te passen in een realistische webapplicatie.

---

## ⚙️ Functionaliteiten

*  Data ophalen via API
*  Zoekfunctie (op naam en adres)
*  Favorieten opslaan (localStorage)
*  Filteren op favorieten
*  Sorteren per kolom (tekst + cijfers)
*  Dark mode (met opslag)
*  Formulier met validatie
*  Observer API (detectie zichtbaarheid tabel)
*  Afbeeldingen gekoppeld aan parkings

---

## 🌐 Gebruikte API

* https://opendata.brussels.be/api/explore/v2.1/catalog/datasets/bruxelles_parkings_publics/records

De API levert informatie over publieke parkings in Brussel zoals:

* naam
* adres
* capaciteit
* hoogte
* gemeente

---

## Technische vereisten (met uitleg)

### DOM manipulatie

* `querySelector` → elementen selecteren
* `innerHTML` → tabel dynamisch opbouwen
* `addEventListener` → events koppelen

### Modern JavaScript

* `const` en `let`
* Template literals → `${}`
* Arrow functions → `() => {}`
* Array methodes → `map()`, `filter()`, `sort()`
* Ternary operator → `? :`
* Spread operator → `[...array]`
* Async/Await → API calls
* Promises → via fetch
* Callback functies → sort()

### Data & API

* `fetch()` → data ophalen
* JSON verwerken → `response.json()`

### Opslag & validatie

* `localStorage` → favorieten + dark mode + naam
* Form validatie → lengte check naam

### Observer API

* `IntersectionObserver` → detectie wanneer tabel zichtbaar is

---

##  Gebruikte bronnen

* https://www.w3schools.com/
* https://developer.mozilla.org/
* OpenAI ChatGPT
* Claude AI

---

## Taakverdeling

* Romain → JavaScript, API, functionaliteit
* Ilias → JavaScript ,CSS, layout, 

---

## Uitdagingen & oplossingen

### Probleem:

Sorteren werkte niet correct met cijfers en tekst.

### Oplossing:

Controle toegevoegd met `isNaN()` om numerieke en tekstwaarden apart te behandelen.

---

### Probleem:

Data ging verloren bij refresh.

### Oplossing:

Gebruik van `localStorage` om data persistent te maken.

---

## 🚀 Conclusie

Dit project combineert meerdere JavaScript technieken om een interactieve webapplicatie te bouwen met echte data.
De focus lag op gebruiksvriendelijkheid, dynamische data en moderne JavaScript concepten.

Sorteer functie:
- https://www.w3schools.com/howto/howto_js_sort_table.asp
- https://devdoc.net/web/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort.html
CSS Design voor het project:
-https://claude.ai/share/69212a0f-42cb-4ff7-8867-e881c6098bbe
-https://claude.ai/share/272c2652-9a52-42ac-959c-11f57da4ef9d
