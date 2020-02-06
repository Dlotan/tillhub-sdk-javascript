import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { addMinutes, subMinutes } from 'date-fns'
import qs from 'qs'
dotenv.config()
import { TillhubClient, v0 } from '../../../src/tillhub-js'

let user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME || user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD || user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID || user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY || user.apiKey
}

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const query = {
  limit: 10,
  operation: ['book'],
  embed: ['to', 'from'],
  exclude_errors: true,
  start: subMinutes(new Date(), 5).toISOString(),
  end: addMinutes(new Date(), 5).toISOString(),
  transfer_party: 'c2b68404-aa8c-4a5c-9172-ad1c2036ff93',
  transaction_id: 'bcd81f9e-5e11-4021-b44f-4e9e48ad5768'
}

describe('v0: SafesLogBook: can get all', () => {
  it("Tillhub's SafesLogBook are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: legacyId
            }
          }
        ]
      })

      mock.onGet(`https://api.tillhub.com/api/v0/safes/${legacyId}/logs${qs.stringify(query, { addQueryPrefix: true })}`).reply(function (config) {
        return [
          200,
          {
            count: 1,
            results: [{}]
          }
        ]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const safesLogBook = th.safesLogBook()

    expect(safesLogBook).toBeInstanceOf(v0.SafesLogBook)

    const { data } = await safesLogBook.getAll(query)

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: legacyId
            }
          }
        ]
      })
      mock.onGet(`https://api.tillhub.com/api/v0/safes/${legacyId}/logs${qs.stringify(query, { addQueryPrefix: true })}`).reply(function (config) {
        return [205]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.safesLogBook().getAll(query)
    } catch (err) {
      expect(err.name).toBe('SafesLogBookFetchAllFailed')
    }
  })
})
