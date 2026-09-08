let airports = []
let airlines = []
let countries = []

Papa.parse("csv/airports.csv" , {download:true, header:true, complete: function(results) {
    airports = results.data;
    console.log("number of airports:", airports.length);
    console.log(airports)
}});

Papa.parse("csv/all.csv", {download:true, header:true, complete:function(results) {
    countries = results.data;
    console.log("number of countries:", countries.length);
    console.log(countries);
}});

Papa.parse("csv/iata_airlines.csv", {download:true, header:true, delimiter: "^", complete:function(results) {
    airlines = results.data;
    console.log("number of airlines:", airlines.length);
    console.log(airlines);
}});


function findCountry(query) {

    query = (query || "").toLowerCase().trim();

    if(query === "") {
        return "";
    }

    for(const country of countries) {
        const alpha2 = (country["alpha-2"] || "").toLowerCase();
        const name = country.name || "";

        if(alpha2 === query) {
            return name;
        }
    }

    return "";
}

function findAirport(query) {

    if(query === "") return;

    query = query.toLowerCase().trim()
    const results = []

    if (query.length == 2) {

        for(const airport of airports) {
       
            const iata = airport.iata_code || "";
            const name = airport.name || "";
            const municipality = airport.municipality || "";
            const iso_country = airport.iso_country || "";

            if(airport.iata_code !== "") {
                if(iso_country.toLowerCase().includes(query)) {
                    results.push([iata, municipality, name, iso_country, findCountry(iso_country)]);
                }
            }
        }

        return results;
    }

    for(const airport of airports) {
    
        const iata = airport.iata_code || "";
        const name = airport.name || "";
        const municipality = airport.municipality || "";
        const iso_country = airport.iso_country || "";

        if(airport.iata_code !== "") {
            if(
                iata.toLowerCase().includes(query) || 
                name.toLowerCase().includes(query) ||
                municipality.toLowerCase().includes(query) || 
                iso_country.toLowerCase().includes(query)  
            ) {
                results.push([iata, municipality, name, iso_country, findCountry(iso_country)]);
            } 
        }
    }

    return results;
}

function findAirline(query) {

    if(query === "") return;

    query = query.toLowerCase().trim()
    const results = []

    if(query.length == 2) {
        for(const airline of airlines) {
            const iata = airline.iata_code || "";
            const icao = airline.icao_code || "";
            const name = airline.name || "";
            const alias = airline.alias || "";

            if(iata.toLowerCase().includes(query)) {
                results.push([iata,icao,name,alias]);
                console.log(iata, icao);
            }
        }
        return results;
    }

    for (const airline of airlines) {
        const iata = airline.iata_code || "";
        const icao = airline.icao_code || "";
        const name = airline.name || "";
        const alias = airline.alias || "";

        if(iata !== "") {
            if(
                iata.toLowerCase().includes(query) || 
                icao.toLowerCase().includes(query) ||
                name.toLowerCase().includes(query) ||
                alias.toLowerCase().includes(query)
            ) {
                results.push([iata,icao,name,alias]);
            }
        }
    }

    return results;
}

document.getElementById("airportSearchButton").addEventListener("click", () => {

    const query = document.getElementById("airportSearchBox").value;
    const resultsDiv = document.getElementById("results");

    const results = findAirport(query);

    resultsDiv.innerHTML = "";

    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>IATA</th>
                <th>City</th>
                <th>Airport</th>
                <th>Country Code</th>
                <th>Country</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    results.forEach(airport => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${airport[0]}</td>
            <td>${airport[1]}</td>
            <td>${airport[2]}</td>
            <td>${airport[3]}</td>
            <td>${airport[4]}</td>
        `;
        tbody.appendChild(row);
    });

    resultsDiv.appendChild(table);
});

document.getElementById("airlineSearchButton").addEventListener("click", () => {

    const query = document.getElementById("airlineSearchBox").value;
    const resultsDiv = document.getElementById("results");

    const results = findAirline(query);

    resultsDiv.innerHTML = "";

    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>IATA</th>
                <th>ICAO</th>
                <th>Name</th>
                <th>Alias</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector("tbody");

    results.forEach(airline => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${airline[0]}</td>
            <td>${airline[1]}</td>
            <td>${airline[2]}</td>
            <td>${airline[3]}</td>
        `;
        tbody.appendChild(row);
    });

    resultsDiv.appendChild(table);
});
