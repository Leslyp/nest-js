import { check, sleep } from 'k6';
import http from 'k6/http';
import { Rate } from 'k6/metrics';

export let errorRate = new Rate('errors');
const testConfig = JSON.parse(open('./load-test.json'));

/**
 * Fetches the auth token that will be used later in the load test iterations.
 *
 * Will run once per virtual user.
 */
export function setup() {
  let auth0Request = JSON.stringify({
    grant_type: 'client_credentials',
    client_id: __ENV.LOAD_TEST_AUTH0_CLIENT_ID,
    client_secret: __ENV.LOAD_TEST_AUTH0_CLIENT_SECRET,
    audience: __ENV.LOAD_TEST_AUTH0_AUDIENCE,
  });

  let auth0Url = `https://${__ENV.LOAD_TEST_AUTH0_DOMAIN}/oauth/token`;
  let params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let response = http.post(auth0Url, auth0Request, params);
  let externalIdentityToken = response.json().access_token;

  return externalIdentityToken;
}

/**
 * Runs the load test, checks for a 200 response, and records the error rate.
 */
export default function (externalIdentityToken) {
  let applicant = testConfig.applicants[0];
  applicant.writeKey = __ENV.LOAD_TEST_WRITE_KEY;

  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${externalIdentityToken}`,
    },
  };

  let res = http.post(__ENV.LOAD_TEST_URL, JSON.stringify(applicant), params);
  sleep(1);
  const success = check(res, {
    'status is 200': (res) => res.status === 200,
  });
  errorRate.add(!success);
}
