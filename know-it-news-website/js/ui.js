function renderHeader() {

    var header = document.querySelector('#site-header');

    if (!header) {
        return;
    }

    header.innerHTML = `
        <nav class="navbar navbar-expand-lg">
            <div class="container">
                <a class="navbar-brand" href="index.html">
                    <span>KNOW</span> IT
                </a>

                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarContent">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="news.html?category=sports">News</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="fixtures.html">Fixtures</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="league.html">Leagues</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="standings.html">Standings</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="stats.html">Stats</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;

    var currentPage = window.location.pathname.split('/').pop();

    if (currentPage == '') {
        currentPage = 'index.html';
    }

    var links = document.querySelectorAll('.nav-link');

    links.forEach(function (link) {
        var href = link.getAttribute('href').split('?')[0];

        if (href == currentPage) {
            link.classList.add('active');
        }
    });
}


function renderFooter() {

    var footer = document.querySelector('#site-footer');

    if (!footer) {
        return;
    }

    footer.innerHTML = `
        <footer class="site-footer">
            <div class="container">
                <p>Know IT © 2026 — Simple information dashboard.</p>
            </div>
        </footer>
    `;
}


function showLoading(element, text) {

    if (!element) {
        return;
    }

    element.innerHTML = `
        <div class="loading-box">
            <span class="spinner-border spinner-border-sm"></span>
            ${text || 'Loading...'}
        </div>
    `;
}


function showMessage(element, text) {

    if (!element) {
        return;
    }

    element.innerHTML = `
        <div class="empty-box">
            ${text}
        </div>
    `;
}


renderHeader();
renderFooter();
