import { Client } from '../client'
import * as errors from '../errors'

export interface PaymentOptionsOptions {
  user?: string
  base?: string
}

export interface PaymentOptionsQuery {
  limit?: number
  uri?: string
}

export interface PaymentOptionsResponse {
  data: PaymentOption[]
  metadata: object
}

export interface PaymentOptionResponse {
  data: PaymentOption
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}
export interface PaymentOption {
  id?: string
}

export type PaymentOptionType = 'expense' | 'deposit' | 'bank'

export interface PaymentOption {
  active?: boolean
  type: PaymentOptionType
  name: string
  cost_center?: string
  currency: string
  accounts: string[]
  diff_account: string
  order_index: number
  summable: boolean
}

export class PaymentOptions {
  endpoint: string
  http: Client
  public options: PaymentOptionsOptions

  constructor(options: PaymentOptionsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/payment_options'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: PaymentOptionsQuery | undefined): Promise<PaymentOptionsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.PaymentOptionsFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as PaymentOptionsResponse)
      } catch (error) {
        return reject(new errors.PaymentOptionsFetchFailed(undefined, { error }))
      }
    })
  }

  get(paymentOptionId: string): Promise<PaymentOptionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${paymentOptionId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.PaymentOptionFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as PaymentOption,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as PaymentOptionResponse)
      } catch (error) {
        return reject(new errors.PaymentOptionFetchFailed(undefined, { error }))
      }
    })
  }

  put(paymentOptionId: string, paymentOption: PaymentOption): Promise<PaymentOptionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${paymentOptionId}`
      try {
        const response = await this.http.getClient().put(uri, paymentOption)

        return resolve({
          data: response.data.results[0] as PaymentOption,
          metadata: { count: response.data.count }
        } as PaymentOptionResponse)
      } catch (error) {
        return reject(new errors.PaymentOptionPutFailed(undefined, { error }))
      }
    })
  }

  create(paymentOption: PaymentOption): Promise<PaymentOptionResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, paymentOption)

        return resolve({
          data: response.data.results[0] as PaymentOption,
          metadata: { count: response.data.count }
        } as PaymentOptionResponse)
      } catch (error) {
        return reject(new errors.PaymentOptionCreationFailed(undefined, { error }))
      }
    })
  }
}