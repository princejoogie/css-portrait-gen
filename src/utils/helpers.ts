import { logEvent, AnalyticsCallOptions } from "firebase/analytics";
import { analytics } from "./database";
import { AnalyticsEvent } from "./analytics-event";

export const handleAnalytics = (
  event: keyof typeof AnalyticsEvent,
  eventParams?: {
    [key: string]: any;
  },
  options?: AnalyticsCallOptions
): void => {
  logEvent(analytics, event, eventParams, options);
};
