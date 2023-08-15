SENTRY_ORG=prithvi-0c
SENTRY_PROJECT=prithvi-node
RELEASE=test

# sentry-cli releases -o $SENTRY_ORG new -p $SENTRY_PROJECT $RELEASE
# sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits --auto $RELEASE

sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits --commit $RELEASE

node index.js