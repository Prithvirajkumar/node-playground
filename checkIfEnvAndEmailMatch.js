const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

Sentry.init({
  dsn: "https://07664b63c7554e029b5aa39d08cf28c9@o87286.ingest.sentry.io/6469184",
  tracesSampleRate: 1,
  release: "prithvi-node@1.0.1",
  environment: "env-test-staging", //changing this to staging should include the email address

  beforeSend(event) {
    console.log(event.environment); //logging environment
    console.log(event.user.email); //logging user's email address

    // condition to check a user's email address along with the environment that they are on
    if (
      event.environment === "env-test-production" &&
      event.user.email === "john.doe@example.com"
    ) {
      return null;
    } else return event;
  },
});

(function () {
  Sentry.configureScope(function (scope) {
    scope.setTag("my-tag", "my value");
    scope.setUser({
      id: 42,
      email: "john.doe@example.com",
    });
  });
  Sentry.captureException("What the hell, bruhh!");
})();
