const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const axios = require("axios"); // Import axios

// E2E test's flag
// window.isAutomated = true;

Sentry.init({
  dsn: "https://2687e6d7c6af4b14838b2651a40ad5a3@o1161257.ingest.sentry.io/6307748",
  environment: "local",
  release: "owners-release-test",
  beforeSend(event) {
    console.log(event);
    return event;
  },
});

const foo = () => {
  try {
    throw new Error("Owner Test");
  } catch (error) {
    // Capture the exception with a custom message
    Sentry.captureException(error);
  }
};
foo();
