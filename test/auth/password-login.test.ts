import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
// import {Tillhub} from '../../src/tillhub-js'
import { v0, v1 } from '../../src/tillhub-js'

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

describe('Auth: make auth flow', () => {
  it('v0: Auth: Can make password auth implicitly', async () => {
    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

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

    const auth = new v0.Auth(options)

    let [err, body] = await auth.authenticate()

    expect(err).toBeNull()
    expect(body).toBeTruthy()
    expect(typeof body.token === 'string').toBe(true)
    expect(typeof body.user === 'string').toBe(true)
  })

  it('v1: Auth: Can make password auth implicitly', async () => {
    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

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

    const auth = new v1.Auth(options)

    let [err, body] = await auth.authenticate()

    expect(err).toBeNull()
    expect(body).toBeTruthy()
    expect(typeof body.token === 'string').toBe(true)
    expect(typeof body.user === 'string').toBe(true)
  })
})
