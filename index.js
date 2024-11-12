const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: "https://2687e6d7c6af4b14838b2651a40ad5a3@o1161257.ingest.us.sentry.io/6307748",
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

function problematicFunction() {
  throw new Error("This is a test error for Sentry.");
}

try {
  problematicFunction();
} catch (error) {
  Sentry.captureException(error);
  console.error("An error occurred:", error);
}
