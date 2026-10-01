var newsParams =
    new URLSearchParams(window.location.search);

var newsCategory =
    newsParams.get('category') || 'sports';

var newsTitle =
    document.querySelector('#news-page-title');

newsTitle.innerText =
    newsCategory.charAt(0).toUpperCase() +
    newsCategory.slice(1) +
    ' News';

var newsPageContainer =
    document.querySelector('#news-page-container');


if (
    API_CONFIG.demoMode ||
    API_CONFIG.newsApiKey == ''
) {

    renderFullNewsPage(
        demoNews[newsCategory],
        newsCategory
    );

} else {

    var newsPageUrl =
        `https://newsdata.io/api/1/latest?apikey=${API_CONFIG.newsApiKey}&country=eg&category=${newsCategory}`;

    var newsPageResponse =
        await fetch(newsPageUrl);

    if (newsPageResponse.ok) {

        var newsPageResult =
            await newsPageResponse.json();

        renderFullNewsPage(
            newsPageResult.results,
            newsCategory
        );

    } else {

        renderFullNewsPage(
            demoNews[newsCategory],
            newsCategory
        );
    }
}


function renderFullNewsPage(articles, category) {

    newsPageContainer.innerHTML = '';

    for (var i = 0; i < articles.length; i++) {

        var article =
            articles[i];

        var image =
            article.image ||
            article.image_url ||
            'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80';

        var title =
            article.title;

        var date =
            article.date ||
            article.pubDate ||
            '';

        var description =
            article.description ||
            '';

        var card =
            document.createElement('div');

        card.classList.add(
            'col-md-6',
            'col-lg-4'
        );

        card.innerHTML = `
            <article class="news-card h-100">
                <img src="${image}" alt="">
                <div class="news-card-body">
                    <p class="news-date">${date}</p>
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <a
                        class="read-more"
                        href="news-details.html?category=${category}&id=${i}"
                    >
                        Read article →
                    </a>
                </div>
            </article>
        `;

        newsPageContainer.appendChild(card);
    }
}
