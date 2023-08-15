const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

Sentry.init({
  dsn: "https://07664b63c7554e029b5aa39d08cf28c9@o87286.ingest.sentry.io/6469184",
  tracesSampleRate: 1,
  release: "prithvi-node@1.0.1",
  environment: "env-test-staging",

  beforeSend(event) {
    let doesEventHaveMessage;

    event.exception.values.forEach((element, index, array) => {
      console.log(element.value); //logging the exception value (message)
      if (element.value.includes("What")) {
        return (doesEventHaveMessage = true);
      } else doesEventHaveMessage = false;
    });

    if (doesEventHaveMessage === false) {
      return event;
    } else return null;
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
  Sentry.captureException("What the hell, bruhh!"); //Change this to see if this works correctly
})();
