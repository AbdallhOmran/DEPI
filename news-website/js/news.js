async function getNewsData(category){
    // var newApiKey = '25bd71fbac92e8a3c905d02b5f735925'
    var newApiKey = 'pub_15195a2a769d860bb1675300eb53ffeedb5e4'
    // var newApiUrl = `https://gnews.io/api/v4/top-headlines?category=${newsApiCategory[0]}&apikey=${newApiKey}`
    var newApiUrl = `https://newsdata.io/api/1/latest?apikey=${newApiKey}&country=eg&category=${category}`
    var data = await fetch(newApiUrl)
    var result = await data.json()
    for(var a = 0; a <= 3; a = a + 1 ){
        var articleContent = `    
            <img class="img-fluid" src="${result.results[a].image_url}">
            <article class="row">
                <p class="col-6">${result.results[a].pubDate}</p>
                <p class="col-6">
                    <span class="badge bg-success float-end"><img style="width: 20px" src="${result.results[a].source_icon}" ></span>
                </p>
            </article>
            <h4>${result.results[a].title}</h4>
        `
        var article = document.createElement('section')
        article.classList.add('col-3')
        article.innerHTML = articleContent
        document.querySelector(`#${category}-news`).appendChild(article)
    }
    // console.log(result)
}