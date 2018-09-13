import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { v0 } from '../../src/tillhub-js'

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

const query = {
  deliveryId: 'abc123',
  embed: ['location']
}

const responseObj = [
  {
    id: '9a5a461b-89e0-4e3e-900e-92c46bd73869',
    to: {
      id: '21a56b19-7bfe-4f08-8e81-84ab6d3a0ff4',
      name: 'Shelf AB',
      type: 'warehouse_shelf'
    },
    from: {
      id: 'f3a88e0a-b62b-4dfd-9b1e-c49aeac966cb',
      name: 'Zalando HQ',
      type: 'warehouse'
    },
    status: 'in_progress',
    dispatched: false
  }
]

describe('v0: Deliveries', () => {
  it('can set delivery status to in_progress', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)
      const legacyId = '4564'

      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function(config) {
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
        .onPost(
          `https://api.tillhub.com/api/v0/deliveries/${legacyId}/${
            query.deliveryId
          }/in_progress?embed[]=location`
        )
        .reply(function(config) {
          return [
            200,
            {
              results: responseObj
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

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const delivery = th.deliveries()

    expect(delivery).toBeInstanceOf(v0.Deliveries)

    const { data } = await delivery.setInProgress(query)

    expect(data).toEqual(responseObj)
  })
})
