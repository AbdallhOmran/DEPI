var leagueButton =
    document.querySelector('#search-leagues');

leagueButton.addEventListener(
    'click',
    function () {
        getLeagues();
    }
);

getLeagues();
