var demoNews = {

    sports: [
        {
            title: 'Local football action returns with a busy weekend schedule',
            date: '2026-09-30',
            image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=900&q=80',
            description: 'A simple demo sports article used while the project is running without an external news key.'
        },
        {
            title: 'Football teams prepare for the next round',
            date: '2026-09-29',
            image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=900&q=80',
            description: 'Follow the latest fixtures, standings and football statistics from the dashboard.'
        },
        {
            title: 'New season brings more fixtures and statistics',
            date: '2026-09-28',
            image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=900&q=80',
            description: 'The Know IT sports section collects fixtures, league tables and player statistics.'
        },
        {
            title: 'Know IT adds a simple football dashboard',
            date: '2026-09-27',
            image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=900&q=80',
            description: 'A lightweight frontend project built with HTML, CSS, Bootstrap and JavaScript.'
        }
    ],

    education: [
        {
            title: 'Students explore new ways to learn with technology',
            date: '2026-09-30',
            image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80',
            description: 'Technology continues to create new ways for students to learn and practice.'
        },
        {
            title: 'Web development remains a practical learning path',
            date: '2026-09-29',
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
            description: 'Projects are a practical way to turn programming lessons into real experience.'
        },
        {
            title: 'Building projects helps connect theory with practice',
            date: '2026-09-28',
            image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80',
            description: 'Small projects can help students practice HTML, CSS and JavaScript concepts.'
        },
        {
            title: 'Simple dashboards are useful frontend practice',
            date: '2026-09-27',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=900&q=80',
            description: 'This project demonstrates API calls, DOM manipulation and responsive layouts.'
        }
    ],

    entertainment: [
        {
            title: 'Entertainment platforms continue to expand digital content',
            date: '2026-09-30',
            image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
            description: 'A demo entertainment article for the Know IT dashboard.'
        },
        {
            title: 'Music and film remain popular online topics',
            date: '2026-09-29',
            image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80',
            description: 'Browse entertainment stories in the same simple card layout.'
        },
        {
            title: 'Digital media gives creators new ways to reach audiences',
            date: '2026-09-28',
            image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
            description: 'A demo article used when the external news service is not configured.'
        },
        {
            title: 'The Know IT news page gets a clean responsive layout',
            date: '2026-09-27',
            image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
            description: 'The layout is designed to stay simple on both desktop and mobile.'
        }
    ]
};


async function getNewsData(category) {

    var container =
        document.querySelector(`#${category}-news`);

    if (!container) {
        return;
    }

    if (
        API_CONFIG.demoMode ||
        API_CONFIG.newsApiKey == 'pub_be0fd549a0b947b3b31dd909efea9973'
    ) {

        renderNewsCards(
            container,
            demoNews[category],
            category
        );

        return;
    }

    var newsApiUrl =
        `https://newsdata.io/api/1/latest?apikey=${API_CONFIG.newsApiKey}&country=eg&category=${category}`;

    var response =
        await fetch(newsApiUrl);

    if (!response.ok) {

        renderNewsCards(
            container,
            demoNews[category],
            category
        );

        return;
    }

    var result =
        await response.json();

    renderNewsCards(
        container,
        result.results.slice(0, 4),
        category
    );
}


function renderNewsCards(container, articles, category) {

    container.innerHTML = '';

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

        var detailsUrl =
            `news-details.html?category=${category}&id=${i}`;

        var card =
            document.createElement('div');

        card.classList.add(
            'col-md-6'
        );

        card.innerHTML = `
            <article class="news-card">
                <img src="${image}" alt="">
                <div class="news-card-body">
                    <p class="news-date">${date}</p>
                    <h3>${title}</h3>
                    <p>${description}</p>
                    <a
                        href="${detailsUrl}"
                        class="read-more"
                    >
                        Read article →
                    </a>
                </div>
            </article>
        `;

        container.appendChild(card);
    }
}
