const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

Sentry.init({
  dsn: "https://2687e6d7c6af4b14838b2651a40ad5a3@o1161257.ingest.sentry.io/6307748",
  tracesSampleRate: 1,
  integrations: [new Sentry.Integrations.Http({ tracing: true })],
  // beforeSendTransaction(event) {
  //   if (event.tags && event.tags["url"] === "https://sentry.io/") {
  //     event.environment = "sentry-environment";
  //     event.release = "sentry-release";
  //   }
  //   return event;
  // },
  // Commit test
});

(function () {
  const transaction = Sentry.startTransaction({
    op: "Custom Transaction",
    name: "Custom Transaction",
  });
  const span = transaction.startChild({
    op: "spanOp",
    description: `spanDescription`,
  });
  Sentry.setTag("url", "https://sentry.io/");
  span.finish();
  transaction.finish();
  // throw new Error("Help");
})();

// (function () {
//   Sentry.configureScope(function (scope) {
//     scope.setLevel("info");
//     Sentry.setTag("kpi", true);
//     Sentry.captureMessage("Sentry Logs - Button Clicked with Capture Message");
//   });
// })();
