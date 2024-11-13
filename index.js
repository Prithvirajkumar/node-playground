const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: "https://2687e6d7c6af4b14838b2651a40ad5a3@o1161257.ingest.us.sentry.io/6307748",
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

// Function with a type error
function addNumbers(a, b) {
  return a + b;
}

// Intentionally passing a string to cause a type error
const result = addNumbers(5, "ten");
console.log(`Result: ${result}`);

// Capture the error with Sentry
try {
  if (isNaN(result)) {
    throw new TypeError("Invalid result: Expected a number");
  }
} catch (error) {
  Sentry.captureException(error);
  console.error("Error captured in Sentry:", error);
}
