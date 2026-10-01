var detailsParams =
    new URLSearchParams(window.location.search);

var detailsCategory =
    detailsParams.get('category') || 'sports';

var detailsId =
    Number(detailsParams.get('id')) || 0;

var detailsContainer =
    document.querySelector('#news-details');


if (
    API_CONFIG.demoMode ||
    API_CONFIG.newsApiKey == ''
) {

    var demoArticle =
        demoNews[detailsCategory][detailsId];

    renderNewsDetails(demoArticle);

} else {

    var detailsUrl =
        `https://newsdata.io/api/1/latest?apikey=${API_CONFIG.newsApiKey}&country=eg&category=${detailsCategory}`;

    var detailsResponse =
        await fetch(detailsUrl);

    if (detailsResponse.ok) {

        var detailsResult =
            await detailsResponse.json();

        renderNewsDetails(
            detailsResult.results[detailsId]
        );

    } else {

        renderNewsDetails(
            demoNews[detailsCategory][detailsId]
        );
    }
}


function renderNewsDetails(article) {

    var image =
        article.image ||
        article.image_url ||
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';

    var title =
        article.title;

    var date =
        article.date ||
        article.pubDate ||
        '';

    var description =
        article.description ||
        'No article description is available.';

    detailsContainer.innerHTML = `
        <a
            href="news.html?category=${detailsCategory}"
            class="back-link"
        >
            ← Back to news
        </a>

        <img
            src="${image}"
            class="details-image"
            alt=""
        >

        <div class="details-content">
            <p class="news-date">${date}</p>
            <h1>${title}</h1>
            <p>${description}</p>
            <p>
                This article is displayed inside the Know IT
                news dashboard. Add your NewsData API key in
                <code>js/config.js</code> to use live articles.
            </p>
        </div>
    `;
}
