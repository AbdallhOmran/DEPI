KNOW IT - News & Football Dashboard
====================================

This project is ready to open and test.

1) Open index.html directly in your browser.
2) The project starts in DEMO MODE, so it does not need API keys.
3) To use real API data, open:
   js/config.js

   Set:
   demoMode: false

   Then add your own:
   weatherApiKey
   currencyApiKey
   newsApiKey
   sportsApiKey

4) Refresh the website.

Pages:
- index.html        Home dashboard
- news.html         News by category
- news-details.html Article details
- fixtures.html     Football fixtures
- league.html       League search
- standings.html    League standings
- stats.html        Player statistics

Notes:
- No try/catch is used.
- Bootstrap is loaded from jsDelivr.
- Demo mode is intentional so the UI can be tested without private API keys.
- Frontend API keys are visible to visitors. For a production project, API calls should be moved to a backend/serverless function.
