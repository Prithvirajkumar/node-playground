const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
  dsn: "https://2687e6d7c6af4b14838b2651a40ad5a3@o1161257.ingest.us.sentry.io/6307748",
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

function addNumbers(a, b) {
  // Convert inputs to numbers and validate
  const numA = Number(a);
  const numB = Number(b);

  // Check if either conversion resulted in NaN
  if (isNaN(numA)) {
    throw new TypeError(`Invalid first argument: Expected a number, got ${typeof a}`);
  }
  if (isNaN(numB)) {
    throw new TypeError(`Invalid second argument: Expected a number, got ${typeof b}`);
  }

  // Perform the addition with validated numbers
  return numA + numB;
}

try {
  const result = addNumbers(5, "ten");
  console.log(`Result: ${result}`);
} catch (error) {
  Sentry.captureException(error);
  console.error("Error captured in Sentry:", error);
}

module.exports = { addNumbers };
