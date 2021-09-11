import { ApplicationInsights } from "@microsoft/applicationinsights-web";

export function initAnalytics(): void {
  const appInsights = new ApplicationInsights({
    config: {
      connectionString:
        "InstrumentationKey=bc9e8a1d-ceb7-4a36-bc91-a73f266a3afc;IngestionEndpoint=https://westeurope-2.in.applicationinsights.azure.com/",
    },
  });
  appInsights.loadAppInsights();
  appInsights.trackPageView();
}
