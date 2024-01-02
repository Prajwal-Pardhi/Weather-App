const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'e0cbd15f1amshe51c30df3482868p1f5030jsn2fbbcf8b272c',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};
async function fetchData(cityName) {
    const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + cityName;
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log('result ='+ result);
        if(result.slice(2,7) == 'error'){
            alert('Sorry, the city entered is not in our database');
        }
        return result
    } catch (error) {
        console.error(error);
        // console.log('Sorry, But city not included in API server');

    }
}

function clearTable() {
    var table = document.getElementById('data-table');
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i >= 0; i--) {
        table.deleteRow(i);
    }
}

function addDataToHTML(data, cityName) {
    let cityTitleElement = document.querySelector('.city-title');
    let cityTitle = cityTitleElement.innerHTML;
    cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
    cityTitle = 'City: ' + cityName;
    cityTitleElement.innerHTML = cityTitle;

    var tableBody = document.querySelector('#data-table tbody');
    clearTable();
    // Populating the table dynamically
    data.forEach(function (item) {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);

        cell1.textContent = item.text;
        cell2.textContent = item.value;
    });
}

async function main(cityName) {

    let data = await fetchData(cityName);
    data = JSON.parse(data);
    console.log('data received!!');

    var dataArray = [
        { text: 'Cloud Percentage', value: data.cloud_pct },
        { text: 'Feels Like', value: data.feels_like },
        { text: 'Humidity', value: data.humidity },
        { text: 'Max Temperature', value: data.max_temp },
        { text: 'Min Temperature', value: data.min_temp },
        { text: 'Sunrise', value: data.sunrise },
        { text: 'Sunset', value: data.sunset },
        { text: 'Temperature', value: data.temp },
        { text: 'Wind Degrees', value: data.wind_degrees },
        { text: 'Wind Speed', value: data.wind_speed }
    ];
    addDataToHTML(dataArray, cityName);
}

function getWeather() {
    var cityName = document.getElementById('cityInput').value;
    console.log('City Name:', cityName);
    main(cityName);
}

function keyPressed(event) {
    if (event.key === "Enter") {
        getWeather();
    }
}