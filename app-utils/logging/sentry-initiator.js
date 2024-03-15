const Sentry = require("@sentry/node");
const {nodeProfilingIntegration} = require("@sentry/profiling-node");
const {sentry_dsn} = require("../config/config")

const sentryInitiator = (router) => {
  Sentry.init({
    dsn: sentry_dsn,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ router }),
      nodeProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

  return Sentry;
}

module.exports = {
  sentryInitiator
}