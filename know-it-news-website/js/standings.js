var standingsParams =
    new URLSearchParams(window.location.search);

var standingsLeagueId =
    standingsParams.get('league');

var standingsLeague =
    document.querySelector('#standings-league');

var standingsSeason =
    document.querySelector('#standings-season');

if (standingsLeagueId) {
    standingsLeague.value =
        standingsLeagueId;
}

if (standingsSeason.value == '') {
    standingsSeason.value = new Date().getFullYear();
}

var standingsButton =
    document.querySelector('#search-standings');

standingsButton.addEventListener(
    'click',
    function () {
        getStandings();
    }
);

getStandings();
