window.addEventListener('load', () => {
    let long;
    let lat;
    const temperatureDescription = document.querySelector('.temperature-description');
    const temperatureDegree = document.querySelector('.temperature-value');
    const locationTimezone = document.querySelector('.location-timezone');
    const temperatureIcon = document.querySelector('#icon');
    const temperatureSection = document.querySelector('.temperature-section');
    const temperatureSpan = document.querySelector('.temperature-section span');
    const fullLocation = document.querySelector('.full-location');

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const weatherApi = `${proxy}https://api.darksky.net/forecast/95827d45f30e937c997920fefc17cf70/${lat},${long}`;
            const locationApi = `${proxy}https://api.opencagedata.com/geocode/v1/json?q=${lat},${long}&key=aa4fab39ef934d2b8744fe82352bfe02`;

            fetch(locationApi)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    locationTimezone.textContent = data.results[0].components.city;
                    fullLocation.textContent = data.results[0].formatted.split(',').slice(1,3);
                });
            fetch(weatherApi)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {summary, temperature, icon} = data.currently;
                    //Set DOM Elements from the API
//                    locationTimezone.textContent = data.timezone;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    //Set Icon
                    setIcons(icon, temperatureIcon);
                    //Formula for celsius
                    const celsius = (temperature - 32) * 5 / 9;
                    //Change temperature to Celsius/Fahrenheit
                    temperatureSpan.textContent = ' C ';
                    temperatureDegree.textContent = Math.floor(celsius);
                })
        })
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "rgb(80,192,229)"});
        skycons.play();
        return skycons.set(iconID, icon);
    }
});
