SENTRY_ORG=prithvi-0c
SENTRY_PROJECT=nodejs
RELEASE="my-repo"
VERSION=`sentry-cli releases propose-version`
GITHUB_ORG="https://github.com/Prithvirajkumar"
GITHUB_REPO="node-playground"


# sentry-cli releases -o $SENTRY_ORG new -p $SENTRY_PROJECT $RELEASE
# sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits --auto $RELEASE

# sentry-cli releases -o $SENTRY_ORG new -p $SENTRY_PROJECT $RELEASE
sentry-cli releases -o $SENTRY_ORG -p $SENTRY_PROJECT set-commits "$VERSION" --commit "Prithvirajkumar/node-playground@3c759a33a956224bd2a68fbf3809fc7fc88835b0"

node index.js