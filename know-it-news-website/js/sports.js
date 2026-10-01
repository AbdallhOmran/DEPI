var sportsApiBase =
    'https://v3.football.api-sports.io';


var demoLeagues = [
    {
        id: 39,
        name: 'Premier League',
        country: 'England',
        logo: 'https://media.api-sports.io/football/leagues/39.png'
    },
    {
        id: 140,
        name: 'La Liga',
        country: 'Spain',
        logo: 'https://media.api-sports.io/football/leagues/140.png'
    },
    {
        id: 78,
        name: 'Bundesliga',
        country: 'Germany',
        logo: 'https://media.api-sports.io/football/leagues/78.png'
    },
    {
        id: 135,
        name: 'Serie A',
        country: 'Italy',
        logo: 'https://media.api-sports.io/football/leagues/135.png'
    }
];


var demoMatches = [
    {
        league: 'Premier League',
        date: '2026-10-03',
        home: 'Arsenal',
        away: 'Chelsea',
        homeLogo: 'https://media.api-sports.io/football/teams/42.png',
        awayLogo: 'https://media.api-sports.io/football/teams/49.png',
        homeGoals: '-',
        awayGoals: '-',
        status: 'Scheduled'
    },
    {
        league: 'Premier League',
        date: '2026-10-04',
        home: 'Liverpool',
        away: 'Manchester City',
        homeLogo: 'https://media.api-sports.io/football/teams/40.png',
        awayLogo: 'https://media.api-sports.io/football/teams/50.png',
        homeGoals: '-',
        awayGoals: '-',
        status: 'Scheduled'
    },
    {
        league: 'La Liga',
        date: '2026-10-04',
        home: 'Barcelona',
        away: 'Real Madrid',
        homeLogo: 'https://media.api-sports.io/football/teams/529.png',
        awayLogo: 'https://media.api-sports.io/football/teams/541.png',
        homeGoals: '-',
        awayGoals: '-',
        status: 'Scheduled'
    },
    {
        league: 'Serie A',
        date: '2026-10-05',
        home: 'Inter',
        away: 'AC Milan',
        homeLogo: 'https://media.api-sports.io/football/teams/505.png',
        awayLogo: 'https://media.api-sports.io/football/teams/489.png',
        homeGoals: '-',
        awayGoals: '-',
        status: 'Scheduled'
    }
];


async function sportsFetch(endpoint) {

    var headers =
        new Headers();

    headers.append(
        'x-apisports-key',
        API_CONFIG.sportsApiKey
    );

    var response =
        await fetch(
            sportsApiBase + endpoint,
            {
                method: 'GET',
                headers: headers
            }
        );

    if (!response.ok) {
        return null;
    }

    return await response.json();
}


async function getSportsData() {

    var container =
        document.querySelector('#live-matches');

    if (!container) {
        return;
    }

    if (
        API_CONFIG.demoMode ||
        API_CONFIG.sportsApiKey == 'pub_be0fd549a0b947b3b31dd909efea9973'
    ) {

        renderLiveMatches(demoMatches.slice(0, 2));
        return;
    }

    var data =
        await sportsFetch(
            '/fixtures?live=all&timezone=Africa/Cairo'
        );

    if (
        !data ||
        data.response.length == 0
    ) {

        renderLiveMatches([]);

        return;
    }

    var matches = [];

    for (
        var i = 0;
        i < data.response.length && i < 5;
        i++
    ) {

        var match =
            data.response[i];

        matches.push({
            league: match.league.name,
            date: match.fixture.date,
            home: match.teams.home.name,
            away: match.teams.away.name,
            homeLogo: match.teams.home.logo,
            awayLogo: match.teams.away.logo,
            homeGoals: match.goals.home == null ? 0 : match.goals.home,
            awayGoals: match.goals.away == null ? 0 : match.goals.away,
            status: match.fixture.status.short
        });
    }

    renderLiveMatches(matches);
}


function renderLiveMatches(matches) {

    var container =
        document.querySelector('#live-matches');

    container.innerHTML = `
        <h2 class="card-title">Live Matches</h2>
    `;

    if (matches.length == 0) {

        container.innerHTML += `
            <div class="empty-box">
                No live matches right now.
            </div>
        `;

    } else {

        for (var i = 0; i < matches.length; i++) {

            var match =
                matches[i];

            container.innerHTML += `
                <div class="live-match">
                    <p class="match-league">${match.league}</p>

                    <div class="live-team">
                        <div>
                            <img src="${match.homeLogo}" alt="">
                            <span>${match.home}</span>
                        </div>

                        <strong>
                            ${match.homeGoals} : ${match.awayGoals}
                        </strong>

                        <div>
                            <img src="${match.awayLogo}" alt="">
                            <span>${match.away}</span>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    container.innerHTML += `
        <a href="fixtures.html" class="btn btn-primary btn-sm mt-3">
            View Fixtures
        </a>
    `;
}


async function getFixtures() {

    var container =
        document.querySelector('#fixtures-container');

    var league =
        document.querySelector('#fixture-league').value;

    var from =
        document.querySelector('#fixture-from').value;

    var to =
        document.querySelector('#fixture-to').value;


    if (
        API_CONFIG.demoMode ||
        API_CONFIG.sportsApiKey == ''
    ) {

        renderFixtures(
            filterDemoMatches(league, from, to)
        );

        return;
    }


    var query =
        '?timezone=Africa/Cairo';

    if (league != '') {
        query += `&league=${league}`;
    }

    if (from != '') {
        query += `&from=${from}`;
    }

    if (to != '') {
        query += `&to=${to}`;
    }


    var data =
        await sportsFetch(
            `/fixtures${query}`
        );


    if (!data) {

        renderFixtures([]);

        return;
    }


    var matches = [];

    for (
        var i = 0;
        i < data.response.length && i < 20;
        i++
    ) {

        var match =
            data.response[i];

        matches.push({
            league: match.league.name,
            date: match.fixture.date.slice(0, 10),
            home: match.teams.home.name,
            away: match.teams.away.name,
            homeLogo: match.teams.home.logo,
            awayLogo: match.teams.away.logo,
            homeGoals: match.goals.home == null ? '-' : match.goals.home,
            awayGoals: match.goals.away == null ? '-' : match.goals.away,
            status: match.fixture.status.long
        });
    }

    renderFixtures(matches);
}


function filterDemoMatches(league, from, to) {

    var matches = demoMatches;

    if (league != '') {

        var leagueIdMap = {
            '39': 'Premier League',
            '140': 'La Liga',
            '78': 'Bundesliga',
            '135': 'Serie A'
        };

        if (leagueIdMap[league]) {

            matches =
                matches.filter(function (match) {
                    return match.league ==
                        leagueIdMap[league];
                });

        }
    }

    if (from != '') {

        matches =
            matches.filter(function (match) {
                return match.date >= from;
            });

    }

    if (to != '') {

        matches =
            matches.filter(function (match) {
                return match.date <= to;
            });

    }

    return matches;
}


function renderFixtures(matches) {

    var container =
        document.querySelector('#fixtures-container');

    container.innerHTML = '';

    if (matches.length == 0) {

        container.innerHTML = `
            <div class="col-12">
                <div class="empty-box">
                    No fixtures found.
                </div>
            </div>
        `;

        return;
    }

    for (var i = 0; i < matches.length; i++) {

        var match =
            matches[i];

        container.innerHTML += `
            <div class="col-md-6">
                <article class="info-card fixture-card">
                    <div class="fixture-top">
                        <span>${match.league}</span>
                        <span>${match.date}</span>
                    </div>

                    <div class="fixture-teams">
                        <div class="fixture-team">
                            <img src="${match.homeLogo}" alt="">
                            <p>${match.home}</p>
                        </div>

                        <div class="fixture-score">
                            <strong>
                                ${match.homeGoals} : ${match.awayGoals}
                            </strong>
                            <span>${match.status}</span>
                        </div>

                        <div class="fixture-team">
                            <img src="${match.awayLogo}" alt="">
                            <p>${match.away}</p>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }
}


async function getLeagues() {

    var search =
        document.querySelector('#league-search').value;

    if (
        API_CONFIG.demoMode ||
        API_CONFIG.sportsApiKey == ''
    ) {

        var leagues =
            demoLeagues.filter(function (league) {

                return league.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            });

        if (search == '') {
            leagues = demoLeagues;
        }

        renderLeagues(leagues);

        return;
    }


    var endpoint =
        `/leagues?search=${encodeURIComponent(search)}`;

    var data =
        await sportsFetch(endpoint);


    if (!data) {

        renderLeagues([]);

        return;
    }


    var leagues = [];

    for (
        var i = 0;
        i < data.response.length && i < 20;
        i++
    ) {

        leagues.push({
            id: data.response[i].league.id,
            name: data.response[i].league.name,
            country: data.response[i].country.name,
            logo: data.response[i].league.logo
        });
    }

    renderLeagues(leagues);
}


function renderLeagues(leagues) {

    var container =
        document.querySelector('#leagues-container');

    container.innerHTML = '';

    if (leagues.length == 0) {

        container.innerHTML = `
            <div class="col-12">
                <div class="empty-box">
                    No leagues found.
                </div>
            </div>
        `;

        return;
    }

    for (var i = 0; i < leagues.length; i++) {

        var league =
            leagues[i];

        container.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <article class="info-card league-card">
                    <img
                        src="${league.logo}"
                        class="league-logo"
                        alt=""
                    >

                    <h3>${league.name}</h3>

                    <p>${league.country}</p>

                    <small>League ID: ${league.id}</small>

                    <div class="d-flex gap-2 justify-content-center mt-3">
                        <a
                            href="standings.html?league=${league.id}"
                            class="btn btn-primary btn-sm"
                        >
                            Standings
                        </a>

                        <a
                            href="stats.html?league=${league.id}"
                            class="btn btn-outline-primary btn-sm"
                        >
                            Stats
                        </a>
                    </div>
                </article>
            </div>
        `;
    }
}


async function getStandings() {

    var league =
        document.querySelector('#standings-league').value;

    var season =
        document.querySelector('#standings-season').value;

    var container =
        document.querySelector('#standings-container');


    if (
        API_CONFIG.demoMode ||
        API_CONFIG.sportsApiKey == ''
    ) {

        renderDemoStandings();

        return;
    }


    var data =
        await sportsFetch(
            `/standings?league=${league}&season=${season}`
        );


    if (
        !data ||
        data.response.length == 0
    ) {

        container.innerHTML = `
            <div class="empty-box">
                No standings found.
            </div>
        `;

        return;
    }


    var leagueInfo =
        data.response[0].league;

    var standings =
        leagueInfo.standings[0];

    renderStandings(
        leagueInfo.name,
        standings
    );
}


function renderDemoStandings() {

    var teams = [
        ['Arsenal', 6, 5, 1, 0, 16, 5, 11, 16],
        ['Liverpool', 6, 5, 0, 1, 15, 6, 9, 15],
        ['Chelsea', 6, 4, 1, 1, 13, 7, 6, 13],
        ['Manchester City', 6, 4, 0, 2, 14, 8, 6, 12],
        ['Manchester United', 6, 3, 1, 2, 10, 8, 2, 10],
        ['Tottenham', 6, 2, 2, 2, 9, 8, 1, 8]
    ];

    renderStandings(
        'Premier League',
        teams
    );
}


function renderStandings(title, standings) {

    var container =
        document.querySelector('#standings-container');

    var rows = '';

    if (
        standings.length > 0 &&
        Array.isArray(standings[0])
    ) {

        for (var i = 0; i < standings.length; i++) {

            var team = standings[i];

            rows += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${team[0]}</td>
                    <td>${team[1]}</td>
                    <td>${team[2]}</td>
                    <td>${team[3]}</td>
                    <td>${team[4]}</td>
                    <td>${team[5]}</td>
                    <td>${team[6]}</td>
                    <td>${team[7]}</td>
                    <td><strong>${team[8]}</strong></td>
                </tr>
            `;
        }

    } else {

        for (var j = 0; j < standings.length; j++) {

            var item =
                standings[j];

            rows += `
                <tr>
                    <td>${item.rank}</td>
                    <td>
                        <div class="standing-team">
                            <img src="${item.team.logo}" alt="">
                            <span>${item.team.name}</span>
                        </div>
                    </td>
                    <td>${item.all.played}</td>
                    <td>${item.all.win}</td>
                    <td>${item.all.draw}</td>
                    <td>${item.all.lose}</td>
                    <td>${item.all.goals.for}</td>
                    <td>${item.all.goals.against}</td>
                    <td>${item.goalsDiff}</td>
                    <td><strong>${item.points}</strong></td>
                </tr>
            `;
        }
    }

    container.innerHTML = `
        <div class="table-heading">
            <div>
                <p class="eyebrow">LEAGUE TABLE</p>
                <h2>${title}</h2>
            </div>
        </div>

        <div class="table-responsive">
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>P</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                        <th>Pts</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>
        </div>
    `;
}


async function getTopScorers() {

    if (
        API_CONFIG.demoMode ||
        API_CONFIG.sportsApiKey == ''
    ) {

        renderStatsList(
            '#top-scorers',
            [
                ['Mohamed Salah', 'Liverpool', 9],
                ['Erling Haaland', 'Manchester City', 8],
                ['Bukayo Saka', 'Arsenal', 7],
                ['Cole Palmer', 'Chelsea', 6]
            ],
            'goals'
        );

        return;
    }


    var league =
        document.querySelector('#stats-league').value;

    var season =
        document.querySelector('#stats-season').value;

    var data =
        await sportsFetch(
            `/players/topscorers?league=${league}&season=${season}`
        );


    var list = [];

    if (data) {

        for (
            var i = 0;
            i < data.response.length && i < 10;
            i++
        ) {

            var player =
                data.response[i];

            list.push([
                player.player.name,
                player.statistics[0].team.name,
                player.statistics[0].goals.total
            ]);
        }
    }

    renderStatsList(
        '#top-scorers',
        list,
        'goals'
    );
}


async function getYellowCards() {

    if (
        API_CONFIG.demoMode ||
        API_CONFIG.sportsApiKey == ''
    ) {

        renderStatsList(
            '#yellow-cards',
            [
                ['Player One', 'Arsenal', 4],
                ['Player Two', 'Chelsea', 4],
                ['Player Three', 'Liverpool', 3],
                ['Player Four', 'Tottenham', 3]
            ],
            'cards'
        );

        return;
    }


    var league =
        document.querySelector('#stats-league').value;

    var season =
        document.querySelector('#stats-season').value;

    var data =
        await sportsFetch(
            `/players/topyellowcards?league=${league}&season=${season}`
        );

    var list = [];

    if (data) {

        for (
            var i = 0;
            i < data.response.length && i < 10;
            i++
        ) {

            var player =
                data.response[i];

            list.push([
                player.player.name,
                player.statistics[0].team.name,
                player.statistics[0].cards.yellow
            ]);
        }
    }

    renderStatsList(
        '#yellow-cards',
        list,
        'cards'
    );
}


async function getRedCards() {

    if (
        API_CONFIG.demoMode ||
        API_CONFIG.sportsApiKey == ''
    ) {

        renderStatsList(
            '#red-cards',
            [
                ['Player One', 'Arsenal', 1],
                ['Player Two', 'Chelsea', 1],
                ['Player Three', 'Liverpool', 1]
            ],
            'cards'
        );

        return;
    }


    var league =
        document.querySelector('#stats-league').value;

    var season =
        document.querySelector('#stats-season').value;

    var data =
        await sportsFetch(
            `/players/topredcards?league=${league}&season=${season}`
        );

    var list = [];

    if (data) {

        for (
            var i = 0;
            i < data.response.length && i < 10;
            i++
        ) {

            var player =
                data.response[i];

            list.push([
                player.player.name,
                player.statistics[0].team.name,
                player.statistics[0].cards.red
            ]);
        }
    }

    renderStatsList(
        '#red-cards',
        list,
        'cards'
    );
}


function renderStatsList(selector, list, type) {

    var container =
        document.querySelector(selector);

    container.innerHTML = '';

    if (list.length == 0) {

        container.innerHTML = `
            <div class="empty-box">
                No statistics found.
            </div>
        `;

        return;
    }

    for (var i = 0; i < list.length; i++) {

        container.innerHTML += `
            <div class="stat-player">
                <div>
                    <h3>${list[i][0]}</h3>
                    <p>${list[i][1]}</p>
                </div>
                <strong>${list[i][2]}</strong>
            </div>
        `;
    }
}
