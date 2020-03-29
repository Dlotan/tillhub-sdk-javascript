import { ThAnalyticsBaseHandler, ThAnalyticsExportsBaseResponse } from '../../../base'
import { Client } from '../../../client'
import { BaseError } from '../../../errors'

export interface DatevHandlerOptions {
  user?: string
  base?: string
}

export interface AnalyticsReportsDatevExportResponseItem extends ThAnalyticsExportsBaseResponse {

}

export class AnalyticsReportsDatev extends ThAnalyticsBaseHandler {
  http: Client
  public options: DatevHandlerOptions

  constructor(options: DatevHandlerOptions, http: Client) {
    super(http, options)
    this.options = options
    this.http = http
  }

  static create(options: object, http: Client): AnalyticsReportsDatev {
    return ThAnalyticsBaseHandler.generateAuthenticatedInstance(AnalyticsReportsDatev, options, http)
  }

  public async export(query?: object): Promise<AnalyticsReportsDatevExportResponseItem> {
    try {
      const result = await this.handleExport(`${this.options.base}/api/v2/analytics/${this.options.user}/reports/datev`, query)
      return result
    } catch (err) {
      throw new AnalyticsReportsDatevExportFetchError(undefined, { error: err })
    }
  }
}

export class AnalyticsReportsDatevExportFetchError extends BaseError {
  public name = 'AnalyticsReportsDatevExportFetchError'
  constructor(public message: string = 'Could not fetch datev report. ', properties?: any) {
    super(message, properties)
  }
}