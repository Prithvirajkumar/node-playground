SENTRY_ORG=testorg-az
SENTRY_PROJECT=prithvi-node
RELEASE=prithvi-node@1.0.1

sentry-cli releases -o $SENTRY_ORG new -p $SENTRY_PROJECT $RELEASE
sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits --auto $RELEASE

node index.js