async function getSportsData(){
    var sportsApiKey = 'bcd495c361e96ccce459ebee06dbfc62'
    var sportsApiUrl = "https://v3.football.api-sports.io/fixtures?live=all&timezone=Africa/Cairo"
    var myHeaders = new Headers();
    myHeaders.append("x-apisports-key", sportsApiKey);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    var response = await fetch(sportsApiUrl, requestOptions)
    var data = await response.json()
    console.log(data.response[0])


    var matchRow = document.createElement('div')
    matchRow.classList.add('row')
    var matchData =
    `
    <h4 class="col-12 text-start"><img style="width: 50px" src="${data.response[0].league.logo}"> ${data.response[0].league.name}</h4> 
    <hr>   
    <p class="col-4">${data.response[0].teams.home.name}</p>
    <section class="col-1">
        <img src="${data.response[0].teams.home.logo}" style="width: 30px;" alt="">
    </section>
    <p class="col-2">${data.response[0].goals.home} : ${data.response[0].goals.away}</p>
    <section class="col-1">
        <img src="${data.response[0].teams.away.logo}" style="width: 30px;" alt="">
    </section>
    <p class="col-4">${data.response[0].teams.away.name}</p>
    `
    matchRow.innerHTML = matchData
    document.querySelector('#live-matches').appendChild(matchRow)
}