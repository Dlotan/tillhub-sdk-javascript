import { Client } from '../client'
import * as errors from '../errors'

export interface AnalyticsOptions {
  user?: string
  base?: string
}

export interface AnalyticsResponse {
  data: object[]
  metadata: object
  msg?: string
}

export interface DayOfWeekOptions {
  branch_number?: string | null
  start: string
  end: string
}

export interface RevenuesOptions {
  branch_number?: string | null
  precision?: 'hour' | 'day'
  start: string
  end: string
}

export class Analytics {
  endpoint: string
  http: Client
  public options: AnalyticsOptions

  constructor(options: AnalyticsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/analytics'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getRevenuesForDayOfWeek(query: DayOfWeekOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const startEnd = `start=${query.start}&end=${query.end}`
        const branch = query.branch_number ? `&branch_number=${query.branch_number}` : ''
        const dayOfWeek = `aggregates/revenues/day_of_week?${startEnd}${branch}`
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${dayOfWeek}`

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.RevenuesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.RevenuesFetchFailed())
      }
    })
  }

  getRevenues(query: RevenuesOptions): Promise<AnalyticsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const startEnd = `start=${query.start}&end=${query.end}`
        const branch = query.branch_number ? `&branch_number=${query.branch_number}` : ''
        const precision = `&precision=${query.precision}`
        const revenueQuery = `aggregates/revenues?${startEnd}${branch}${precision}`
        let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${revenueQuery}`
        const response = await this.http.getClient().get(uri)

        response.status !== 200 && reject(new errors.RevenuesFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as AnalyticsResponse)
      } catch (err) {
        return reject(new errors.RevenuesFetchFailed())
      }
    })
  }
}