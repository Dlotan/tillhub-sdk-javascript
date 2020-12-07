import qs from 'qs'
import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

const query = {
  deleted: false
}

function queryString () {
  return qs.stringify(query)
}

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Customers: can get count number of all customers logs', () => {
  it("Tillhub's branches are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
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

      mock
        .onGet(`https://api.tillhub.com/api/v1/customers/${legacyId}/meta?${queryString()}`)
        .reply(() => {
          return [
            200,
            {
              results: [{ count: 50 }]
            }
          ]
        })
    }

    const th = await initThInstance()

    const CustomersV1 = th.customersV1()

    expect(CustomersV1).toBeInstanceOf(v1.Customers)

    const { data } = await CustomersV1.meta(query)

    expect(data).toEqual({ count: 50 })
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
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

      mock
        .onGet(`https://api.tillhub.com/api/v1/customers/${legacyId}/meta?${queryString()}`)
        .reply(() => {
          return [302]
        })
    }

    const th = await initThInstance()

    try {
      await th.customersV1().meta(query)
    } catch (err) {
      expect(err.name).toBe('CustomersMetaFailed')
    }
  })
})
