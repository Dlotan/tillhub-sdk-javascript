import analytics from './analytics'

export interface AnalyticsHandlerTypesV3 {
  analytics: {
    reports: {
      AnalyticsReportsDatev: any
      AnalyticsReportsTransactions: any
      AnalyticsReportsBalances: any
      AnalyticsReportsCountingProtocols: any
      AnalyticsReportsRevenues: any
    }
  }
}

export default {
  analytics
}
