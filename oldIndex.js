const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

Sentry.init({
  dsn: "https://07664b63c7554e029b5aa39d08cf28c9@o87286.ingest.sentry.io/6469184",
  // Local Instance
  // dsn: "http://50b8c8c36be14728810adefbc51a5117@127.0.0.1:9000/2",
  // transaction test
  // dsn: "https://7f9faa36f4274e02b24d6cb7b56a1b0f@o87286.ingest.sentry.io/4504640041451520",
  // dsn: "https://276d4ffe344e404291ffe838b367548b@o713169.ingest.sentry.io/4504766074585088",

  tracesSampleRate: 1.0,
  release: "prithvi-node@1.0.1",
  autoSessionTracking: false,
  environment: "env-test-staging",
  tracesSampleRate: 1,
  // tracesSampler: (samplingContext) => {
  //   if (samplingContext?.transactionContext?.name === "Transaction1") {
  //     return false;
  //   } else if (samplingContext?.transactionContext?.name === "Transaction2") {
  //     return "1";
  //   } else if (samplingContext?.transactionContext?.name === "Transaction3") {
  //     return 1;
  //   }
  // },

  beforeSend(event) {
    let doesEventHaveMessage;
    event.exception.values.forEach((element, index, array) => {
      console.log(element.value);
      if (element.value.includes("What")) {
        return (doesEventHaveMessage = true);
      } else doesEventHaveMessage = false;
    });
    if (doesEventHaveMessage === false) {
      return event;
    } else return null;
  },

  // beforeSend(event) {
  //   // Modify or drop the event here
  //   if (event.environment === "env-test-production") {
  //     // Don't send user's email address
  //     delete event.user.email;
  //   }
  //   return event;
  // },
});

const newFunction = () => {
  Sentry.configureScope(function (scope) {
    scope.setTag("my-tag", "my value");
    scope.setUser({
      id: 42,
      email: "john.doe@example.com",
    });
  });
  Sentry.captureException("What the hell, bruhh!");
};
newFunction();

// const foo = () => {
//   const transaction = Sentry.startTransaction({
//     op: "test",
//     name: "Transaction1",
//   });
//   transaction.finish();
// };
// foo();

// const foo2 = () => {
//   const transaction2 = Sentry.startTransaction({
//     op: "test",
//     name: "Transaction2",
//   });
//   transaction2.finish();
// };
// foo2();

// const foo3 = () => {
//   const transaction2 = Sentry.startTransaction({
//     op: "test",
//     name: "Transaction3",
//   });
//   transaction2.finish();
// };
// foo3();

// fingerprint rule tests
// message:"Ambassador client request failed:*" -> ambassador-request-error title="[CustomGroup] Ambassador client request failed (see Events tab for more): {{ tags.which-message }}"

// const transaction = Sentry.startTransaction({
//   op: "test",
//   name: "My First Test Transaction",
// });

// try {
//   Sentry.configureScope(function (scope) {
//     scope.setTag("which-function", "foo-function");
//     scope.setUser({
//       id: 42,
//       email: "john.doe@example.com",
//     });
//   });

//   newFoo();
// } catch (e) {
//   Sentry.captureException(e);
// } finally {
//   // transaction.finish();
// }

// try {
//   foo();
// } catch (e) {
//   Sentry.configureScope(function (scope) {
//     Sentry.setTag("gameType", "poker");
//     Sentry.setUser({ email: "john.doe@example.com" });
//     Sentry.setContext("character", {
//       name: "Mighty Fighter",
//       age: 19,
//       attack_type: "melee",
//     });
//     // scope.setFingerprint([String(e.statusCode)]);
//     Sentry.captureException(e);
//   });
// }

// try {
//   bar();
// } catch (e) {
//   Sentry.configureScope(function (scope) {
//     Sentry.setTag("gameType", "backJack");
//     scope.setFingerprint([String(e.statusCode)]);
//     Sentry.captureException(e);
//   });
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

// --------------> Nested Transaction Test  <---------------
// console.log("Sentry test started!");

// const outerTransaction = Sentry.startTransaction({
//   op: "outer-transaction",
//   name: "Outer Transaction",
// });

// console.log("started outer transaction");

// if (outerTransaction) {
//   let span = outerTransaction.startChild({
//     op: "span-containing-inner-transaction",
//     description: "span containing inner transaction",
//   });
//   const foo = new Promise((resolve, reject) => {
//     console.log("running foo()");
//     const innerTransaction = Sentry.startTransaction({
//       op: "inner-transaction",
//       name: "Inner Transaction",
//     });
//     console.log("started inner transaction");
//     setTimeout(() => {
//       innerTransaction.finish();
//       console.log("finished inner transaction");
//       resolve("resolved");
//     }, 3000);
//   });

//   foo.then(() => {
//     span.finish();
//     setTimeout(() => {
//       outerTransaction.finish();
//       console.log("finished outer transaction");
//       console.log("Sentry test done!");
//     }, 5000);
//   });
// }

// -------END---------

// Session test
// const SessionTest = Sentry.startTransaction({
//   op: "session-transaction",
//   name: "Session Transaction",
// });
// const foo = new Promise((resolve, reject) => {
//   Sentry.getCurrentHub().startSession({
//     status: "crashed",
//   });
//   setTimeout(() => {
//     resolve("resolved");
//   }, 3000);
// });

// foo.then(() => {
//   Sentry.getCurrentHub().endSession();
//   SessionTest.finish();
// });

// ---END---
