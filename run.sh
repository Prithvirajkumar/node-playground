SENTRY_ORG=prithvi-0c
SENTRY_PROJECT=nodejs
# RELEASE="my-new-release-test5"
# VERSION=`sentry-cli releases propose-version`

# sentry-cli releases -o $SENTRY_ORG new -p $SENTRY_PROJECT $RELEASE
# sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits --auto $RELEASE

# sentry-cli releases -o $SENTRY_ORG new -p $SENTRY_PROJECT $RELEASE
# sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits $RELEASE@$VERSION --commit "Prithvirajkumar/node-playground@a4f4b7c17924b0b8532c8198381cb13b34e29ca5"
# sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits $RELEASE --commit "Prithvirajkumar/node-playground@f5ba4c7270d3705fdd56bb970a7542f97f7f5ecc"
sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits "slack-test-release-2" --commit "Prithvirajkumar/node-playground@ebaab561274580bd3170b107cf66d54b9771d70a"