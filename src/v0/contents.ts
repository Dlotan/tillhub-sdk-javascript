import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'

export interface ContentOptions {
  user?: string
  base?: string
}

export interface ContentsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
  }
}

export interface ContentsResponse {
  data: object[]
  metadata: object
  next?: () => Promise<ContentsResponse>
}

export interface ContentResponse {
  data: Content
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface Content {
  id?: string
}

export type ContentTypeType = 'video' | 'image' | 'text' | 'transition'

export interface Content {
  name?: string
  type: ContentTypeType,
  payload: string | null,
  content_configuration: {
    [key: string]: any
  } | null,
  payload_configuration: {
    [key: string]: any
  } | null,
  active?: boolean
  deleted?: boolean
  metadata: {
    [key: string]: any
  } | null,
}

export class Contents {
  endpoint: string
  http: Client
  public options: ContentOptions
  public uriHelper: UriHelper

  constructor(options: ContentOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/contents'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(queryOrOptions?: ContentsQuery | undefined): Promise<ContentsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (queryOrOptions && queryOrOptions.uri) {
          uri = queryOrOptions.uri
        } else {
          let queryString = ''
          if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
            queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            queryString ? `?${queryString}` : ''
            }`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ContentsFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<ContentsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as ContentsResponse)
      } catch (error) {
        return reject(new ContentsFetchFailed(undefined, { error }))
      }
    })
  }

  get(contentId: string): Promise<ContentResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${contentId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new ContentFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Content,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ContentResponse)
      } catch (error) {
        return reject(new ContentFetchFailed(undefined, { error }))
      }
    })
  }

  patch(contentId: string, content: Content): Promise<ContentResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${contentId}`
      try {
        const response = await this.http.getClient().patch(uri, content)

        return resolve({
          data: response.data.results[0] as Content,
          metadata: { count: response.data.count }
        } as ContentResponse)
      } catch (error) {
        return reject(new ContentPatchFailed(undefined, { error }))
      }
    })
  }

  create(content: Content): Promise<ContentResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, content)

        return resolve({
          data: response.data.results[0] as Content,
          metadata: { count: response.data.count }
        } as ContentResponse)
      } catch (error) {
        return reject(new ContentCreationFailed(undefined, { error }))
      }
    })
  }

  delete(contentId: string): Promise<ContentResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${contentId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new ContentDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as ContentResponse)
      } catch (err) {
        return reject(new ContentDeleteFailed())
      }
    })
  }
}

export class ContentsFetchFailed extends BaseError {
  public name = 'ContentsFetchFailed'
  constructor(public message: string = 'Could not fetch contents', properties?: any) {
    super(message, properties)
  }
}

export class ContentFetchFailed extends BaseError {
  public name = 'ContentFetchFailed'
  constructor(public message: string = 'Could not fetch content', properties?: any) {
    super(message, properties)
  }
}

export class ContentPatchFailed extends BaseError {
  public name = 'ContentPatchFailed'
  constructor(public message: string = 'Could not alter content', properties?: any) {
    super(message, properties)
  }
}

export class ContentCreationFailed extends BaseError {
  public name = 'ContentCreationFailed'
  constructor(public message: string = 'Could not create content', properties?: any) {
    super(message, properties)
  }
}

export class ContentDeleteFailed extends BaseError {
  public name = 'ContentDeleteFailed'
  constructor(public message: string = 'Could not delete content', properties?: any) {
    super(message, properties)
  }
}