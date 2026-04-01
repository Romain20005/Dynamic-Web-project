'use strict';
async function dataophalen() { const response = await 
    fetch ('/api/explore/v2.1/catalog/datasets/bruxelles_parkings_publics/records?limit=20')
    const data = await response.json();
    console.log(data); 
}
dataophalen();
