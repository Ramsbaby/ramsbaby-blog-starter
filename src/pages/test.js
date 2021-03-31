import React, { useState, useEffect } from 'react'
import GoogleLogin from 'react-google-login'

var VIEW_ID = '229844781'

// Query the API and print the results to the page.
const queryReports = function() {
  console.log(gapi)

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
                startDate: '2020-09-01',
                endDate: 'today',
              },
            ],
            metrics: [
              {
                expression: 'ga:users',
              },
            ],
          },
        ],
      },
    })
    .then(displayResults, console.error.bind(console))
}

const displayResults = function(response) {
  var formattedJson = JSON.stringify(response.result, null, 2)
  console.log(formattedJson)
  document.getElementById('query-output').value = formattedJson
}

const onSuccess = googleUser => {
  console.log('Logged in as: ' + googleUser.getBasicProfile().getName())
}

const onFailure = error => {
  console.log(error)
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    scope: 'profile email',
    width: 240,
    height: 50,
    longtitle: true,
    theme: 'dark',
    onsuccess: onSuccess,
    onfailure: onFailure,
  })
}

export default class Test extends React.Component {
  render() {
    const responseGoogle = response => {
      console.log(response)
    }

    return (
      <div>
        <html>
          <head>
            <title>Hello Analytics Reporting API V4</title>
            {/* <meta
              name="google-signin-client_id"
              content="1075573877493-gh02u2kgns67o6rjttfvaj2q7t24olfr.apps.googleusercontent.com"
            /> */}

            <meta
              name="google-signin-scope"
              content="https://www.googleapis.com/auth/analytics.readonly"
            />

            {/* <!-- Load the JavaScript API client and Sign-in library. --> */}
          </head>
          <body>
            <h1>Hello Analytics Reporting API V4</h1>

            {/* <!-- The Sign-in button. This will run `queryReports()` on success. --> */}
            {/* <p class="g-signin2" data-onsuccess="queryReports"></p> */}

            <GoogleLogin
              clientId="1075573877493-gh02u2kgns67o6rjttfvaj2q7t24olfr.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={queryReports}
              onFailure={responseGoogle}
              cookiePolicy={'none'}
            />

            {/* <!-- The API response will be printed here. --> */}
            {/* <textarea cols="80" rows="20" id="query-output"></textarea> */}

            <div id="my-signin2">
              {/* <script
                dangerouslySetInnerHTML={{
                  __html: `
              gapi.signin2.render('my-signin2', {
                scope: 'profile email',
                width: 240,
                height: 50,
                longtitle: true,
                theme: 'dark',
                onsuccess: onSuccess,
                onfailure: onFailure,
              })
              `,
                }}
              /> */}
            </div>
          </body>
        </html>
      </div>
    )
  }
}
