'use strict';
async function dataophalen() { const response = await 
    fetch ('https://opendata.brussels.be/explore/embed/dataset/bruxelles_parkings_publics/table/?disjunctive.name_nl&disjunctive.commune_gemeente&sort=name_nl')
    const data = await response.json();
    console.log(data); 
}
dataophalen();
