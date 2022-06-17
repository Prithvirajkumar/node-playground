const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

Sentry.init({
  dsn: "https://07664b63c7554e029b5aa39d08cf28c9@o87286.ingest.sentry.io/6469184",
  tracesSampleRate: 1.0,
});

// fingerprint rule tests
// message:"Ambassador client request failed:*" -> ambassador-request-error title="[CustomGroup] Ambassador client request failed (see Events tab for more): {{ tags.which-message }}"

// const transaction = Sentry.startTransaction({
//   op: "test",
//   name: "My First Test Transaction",
// });

// try {
//   Sentry.configureScope(function (scope) {
//     scope.setTag("which-function", "foo-function");
//   });
//   foo();
// } catch (e) {
//   Sentry.captureException(e);
// } finally {
//   transaction.finish();
// }

// const transaction2 = Sentry.startTransaction({
//   op: "test",
//   name: "My Second Test Transaction",
// });

// try {
//   Sentry.configureScope(function (scope) {
//     scope.setTag("which-function", "bar-function");
//   });
//   bar();
//   set;
// } catch (e) {
//   Sentry.captureException(e);
// } finally {
//   transaction2.finish();
// }

// const transaction3 = Sentry.startTransaction({
//   op: "test",
//   name: "My Third Test Transaction",
// });

// try {
//   Sentry.configureScope(function (scope) {
//     scope.setTag("which-message", "new-bar-function");
//   });
//   newBar();
// } catch (e) {
//   Sentry.captureMessage("Ambassador client request failed:");
// } finally {
//   transaction3.finish();
// }

// const transaction4 = Sentry.startTransaction({
//   op: "test",
//   name: "My Fourth Test Transaction",
// });

// try {
//   Sentry.configureScope(function (scope) {
//     scope.setTag("which-message", "new-foo-function");
//   });
//   newFoo();
// } catch (e) {
//   Sentry.captureMessage("Ambassador client request failed:");
// } finally {
//   transaction4.finish();
// }

// scope of tags test

const transaction = Sentry.startTransaction({
  op: "test",
  name: "My Transaction",
});

// const foo = () => {
//   try {
//     Sentry.configureScope(function (scope) {
//       scope.setTag("inner-scope", "foo-function");
//     });
//     throw new Error("Error from foo function");
//   } catch (e) {
//     Sentry.captureException(e);
//   }
// };

// try {
//   Sentry.configureScope(function (scope) {
//     scope.setTag("outer-scope", "calling-foo-function");
//   });
//   foo();
// } catch (e) {
//   Sentry.captureException(e);
// } finally {
//   transaction.finish();
// }

const foo = () => {
  try {
    Sentry.configureScope(function (scope) {
      scope.setTag("inner-scope", "foo-function");
      Sentry.configureScope(function (scope) {
        scope.setTag("nested-inner-scope", "will-it-work");
      });
    });
    throw new Error("New Error from foo function");
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
};

foo();

console.log("Sentry test done!");
