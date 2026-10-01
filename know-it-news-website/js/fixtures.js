var fixtureButton =
    document.querySelector('#search-fixtures');

fixtureButton.addEventListener(
    'click',
    function () {
        getFixtures();
    }
);

getFixtures();
