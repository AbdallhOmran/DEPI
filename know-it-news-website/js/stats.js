var statsParams =
    new URLSearchParams(window.location.search);

var statsLeagueId =
    statsParams.get('league');

var statsLeague =
    document.querySelector('#stats-league');

var statsSeason =
    document.querySelector('#stats-season');

if (statsLeagueId) {
    statsLeague.value =
        statsLeagueId;
}

if (statsSeason.value == '') {
    statsSeason.value = new Date().getFullYear();
}

var statsButton =
    document.querySelector('#search-stats');

statsButton.addEventListener(
    'click',
    function () {

        getTopScorers();

        getYellowCards();

        getRedCards();

    }
);

getTopScorers();

getYellowCards();

getRedCards();
