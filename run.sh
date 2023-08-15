SENTRY_ORG=prithvi-0c
SENTRY_PROJECT=nodejs
RELEASE="my-new-release"
VERSION=`sentry-cli releases propose-version`

# sentry-cli releases -o $SENTRY_ORG new -p $SENTRY_PROJECT $RELEASE
# sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits --auto $RELEASE

# sentry-cli releases -o $SENTRY_ORG new -p $SENTRY_PROJECT $RELEASE
sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits $RELEASE@$VERSION --commit "Prithvirajkumar/node-playground@eaeb0df931875ba8497863afc85280e352284d7c"

node index.js