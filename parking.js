'use strict';
async function dataophalen() { const response = await 
    fetch ('https://opendata.brussels.be/explore/dataset/bruxelles_parkings_publics/api/?')
    const data = await response.json();
    console.log(data); 
}
dataophalen();
