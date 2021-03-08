import React from 'react'

class Test extends React.Component {
  render() {
    // Replace with your view ID. */

    var VIEW_ID = '229844781'

    // Query the API and print the results to the page. */
    function queryReports() {
      gapi.client
        .request({
          path: '/v4/reports:batchGet',
          root: 'https://analyticsreporting.googleapis.com/',
          method: 'POST',
          body: {
            reportRequests: [
              {
                viewId: VIEW_ID,
                dateRanges: [
                  {
                    startDate: '7daysAgo',
                    endDate: 'today',
                  },
                ],
                metrics: [
                  {
                    expression: 'ga:sessions',
                  },
                ],
              },
            ],
          },
        })
        .then(displayResults, console.error.bind(console))
    }

    function displayResults(response) {
      var formattedJson = JSON.stringify(response.result, null, 2)
      document.getElementById('query-output').value = formattedJson
    }
    return (
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Hello Analytics Reporting API V4</title>
          <meta
            name="google-signin-client_id"
            content="1075573877493-1f6ev81d3v2aq4caf22qv3e9h9s78d9i.apps.googleusercontent.com"
          />
          <meta
            name="google-signin-scope"
            content="https://www.googleapis.com/auth/analytics.readonly"
          />
        </head>
        <body>
          <h1>Hello Analytics Reporting API V4</h1>

          {/* <!-- The Sign-in button. This will run `queryReports()` on success. --> */}
          <p class="g-signin2" data-onsuccess="queryReports"></p>

          {/* <!-- The API response will be printed here. --> */}
          <textarea cols="80" rows="20" id="query-output"></textarea>

          <script>{this.queryReports()}</script>
          {/* {this.queryReports()} */}

          {/* <!-- Load the JavaScript API client and Sign-in library. --> */}
          <script src="https://apis.google.com/js/client:platform.js"></script>
        </body>
      </html>
    )
  }
}

export default Test
