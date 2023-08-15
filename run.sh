SENTRY_ORG=prithvi-0c
SENTRY_PROJECT=nodejs
RELEASE="my-new-release"
VERSION=`sentry-cli releases propose-version`

# sentry-cli releases -o $SENTRY_ORG new -p $SENTRY_PROJECT $RELEASE
# sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits --auto $RELEASE

sentry-cli releases -o $SENTRY_ORG new -p $SENTRY_PROJECT $RELEASE
sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits $VERSION --commit "Prithvirajkumar/node-playground@5da209e453f5d0db0e100e92ac27e8f653dc8d0c"

node index.js