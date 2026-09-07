let airports = []

Papa.parse("csv/airports.csv" , {download:true, header:true, complete: function(results) {
    airports = results.data;
    console.log("number of airports:", airports.length);
    console.log(airports)
}})

function findAirport(entry) {
 
    entry = entry.toLowerCase().trim()
    const results = []

    for(const airport of airports) {
       
        const iata = airport.iata_code || "";
        const name = airport.name || "";
        const municipality = airport.municipality || "";
        const iso_country = airport.iso_country || "";

        if(airport.iata_code !== "") {
            if(
                iata.toLowerCase().includes(entry) || 
                name.toLowerCase().includes(entry) ||
                municipality.toLowerCase().includes(entry) || 
                iso_country.toLowerCase().includes(entry)  
            ) {
                results.push([iata, municipality, name, iso_country]);
            } 
        }
    }

    return results;
}

document.getElementById("searchButton").addEventListener("click", () => {

    const query = document.getElementById("searchBox").value;

    const results = findAirport(query);

    console.log(results);
});