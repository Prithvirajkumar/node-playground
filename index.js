const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

Sentry.init({
  // dsn: "https://2687e6d7c6af4b14838b2651a40ad5a3@o1161257.ingest.sentry.io/6307748",
  // dsn: "https://82a71827fb8643dea9be8f45fe0c97b5@o1161257.ingest.sentry.io/4504644936859648",
  dsn: "https://53cea17c1e5940eb928a215cacad298d@o87286.ingest.sentry.io/6469184",
  tracesSampleRate: 1,
  integrations: [new Sentry.Integrations.Http({ tracing: true })],
  // beforeSendTransaction(event) {
  //   if (event.tags && event.tags["url"] === "https://sentry.io/") {
  //     event.environment = "sentry-environment";
  //     event.release = "sentry-release";
  //   }
  //   return event;
  // },
  // test 6
  release: "slack-test-release-2",
});

// (function () {
//   const transaction = Sentry.startTransaction({
//     op: "Custom Transaction",
//     name: "Custom Transaction",
//   });
//   const span = transaction.startChild({
//     op: "spanOp",
//     description: `spanDescription`,
//   });
//   Sentry.setTag("url", "https://sentry.io/");
//   span.finish();
//   transaction.finish();
//   throw new Error("Help");
// })();

(function () {
  Sentry.configureScope(function (scope) {
    scope.setLevel("fatal");
    Sentry.setTag("se", "Prithvi");
    throw new Error("Slack Error 2");
  });
})();
