import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { TillhubClient, v1 } from '../src/tillhub-js'
import { Client } from '../src/Client'

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

describe('SDK: can instantiate SDK', () => {
  it('TillhubClient is instantiable', () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function(config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: '4564'
            }
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

    const th = new TillhubClient(options)
    expect(th).toBeInstanceOf(TillhubClient)
  })

  it('Tillhub is instantiable', () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function(config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: '4564'
            }
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

    expect(new TillhubClient(options)).toBeInstanceOf(TillhubClient)
  })

  it('Tillhub is inittable', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function(config) {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: '4564'
            }
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

    const th = new TillhubClient(options)

    const result = await th.init()

    expect(result).toBeInstanceOf(v1.Auth)
    expect(th.http).toBeInstanceOf(Client)
  })
})
