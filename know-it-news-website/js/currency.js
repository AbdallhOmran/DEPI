async function getCurrencyData(myCurrency) {

    var currencyContainer =
        document.querySelector('#currency');

    if (!currencyContainer) {
        return;
    }

    if (!currencyContainer.querySelector('.card-title')) {

        currencyContainer.innerHTML = `
            <h2 class="card-title">
                Currency Rates
            </h2>
            <div id="currency-list"></div>
        `;
    }

    var list =
        document.querySelector('#currency-list');

    if (
        API_CONFIG.demoMode ||
        API_CONFIG.currencyApiKey == ''
    ) {

        var demoRates = {
            USD: 50.5,
            SAR: 13.45
        };

        list.innerHTML += `
            <div class="currency-row">
                <strong>${myCurrency}</strong>
                <span>${demoRates[myCurrency] || '--'} EGP</span>
            </div>
        `;

        return;
    }

    var currencyApiUrl =
        `https://v6.exchangerate-api.com/v6/${API_CONFIG.currencyApiKey}/latest/${myCurrency}`;

    var response =
        await fetch(currencyApiUrl);

    if (!response.ok) {
        return;
    }

    var result =
        await response.json();

    list.innerHTML += `
        <div class="currency-row">
            <strong>${result.base_code}</strong>
            <span>${result.conversion_rates.EGP.toFixed(2)} EGP</span>
        </div>
    `;
}
