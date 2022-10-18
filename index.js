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

// const transaction = Sentry.startTransaction({
//   op: "test",
//   name: "My Transaction",
// });

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

// const foo = () => {
//   try {
//     Sentry.configureScope(function (scope) {
//       scope.setTag("inner-scope", "foo-function");
//       Sentry.configureScope(function (scope) {
//         scope.setTag("nested-inner-scope", "will-it-work");
//       });
//     });
//     throw new Error("New Error from foo function");
//   } catch (e) {
//     Sentry.captureException(e);
//   } finally {
//     transaction.finish();
//   }
// };

// foo();

console.log("Sentry test started!");

const outerTransaction = Sentry.startTransaction({
  op: "outer-transaction",
  name: "Outer Transaction",
});

console.log("started outer transaction");

if (outerTransaction) {
  let span = outerTransaction.startChild({
    op: "span-containing-inner-transaction",
    description: "span containing inner transaction",
  });
  const foo = new Promise((resolve, reject) => {
    console.log("running foo()");
    const innerTransaction = Sentry.startTransaction({
      op: "inner-transaction",
      name: "Inner Transaction",
    });
    console.log("started inner transaction");
    setTimeout(() => {
      innerTransaction.finish();
      console.log("finished inner transaction");
      resolve("resolved");
    }, 3000);
  });

  foo.then(() => {
    span.finish();
    setTimeout(() => {
      outerTransaction.finish();
      console.log("finished outer transaction");
      console.log("Sentry test done!");
    }, 5000);
  });
}
