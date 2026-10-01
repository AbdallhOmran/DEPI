async function getWeatherData() {

    var weatherContainer =
        document.querySelector('#temp');

    if (!weatherContainer) {
        return;
    }

    if (
        API_CONFIG.demoMode ||
        API_CONFIG.weatherApiKey == '609e412a819d4f8699314363426011'
    ) {

        weatherContainer.innerHTML = `
            <div class="weather-icon">☀️</div>
            <p class="eyebrow">WEATHER</p>
            <h2>31°C</h2>
            <h3>Asyut</h3>
            <p class="text-muted mb-0">Clear sky</p>
        `;

        return;
    }

    var weatherApiUrl =
        `https://api.weatherapi.com/v1/current.json?key=${API_CONFIG.weatherApiKey}&q=${API_CONFIG.weatherCity}`;

    var response =
        await fetch(weatherApiUrl);

    if (!response.ok) {

        weatherContainer.innerHTML = `
            <p class="text-muted">
                Weather data is not available.
            </p>
        `;

        return;
    }

    var result =
        await response.json();

    weatherContainer.innerHTML = `
        <div class="weather-icon">
            <img
                src="https:${result.current.condition.icon}"
                alt=""
            >
        </div>

        <p class="eyebrow">WEATHER</p>

        <h2>${result.current.temp_c}°C</h2>

        <h3>${result.location.name}</h3>

        <p class="text-muted mb-0">
            ${result.current.condition.text}
        </p>
    `;
}
