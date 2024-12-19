import * as Sentry from '@sentry/node';
import { sentry_dsn } from '../config/config';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { Router } from 'express';

export const sentryInitiator = (router: Router) => {
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
