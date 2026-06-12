const { test, expect, request } = require('@playwright/test')

let apiContext

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: process.env.BASE_URL,
    httpCredentials: {
      username: process.env.HTTP_USERNAME,
      password: process.env.HTTP_PASSWORD,
    },
    storageState: 'auth/user.json',
  })
})

test.afterAll(async () => {
  await apiContext.dispose()
})

test.describe('Cars API tests', () => {
  test('Should create car with valid data', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: 100,
      },
    })

    expect(response.status()).toBe(201)

    const body = await response.json()

    expect(body.status).toBe('ok')
    expect(body.data.id).toBeTruthy()
    expect(body.data.carBrandId).toBe(1)
    expect(body.data.carModelId).toBe(1)
    expect(body.data.mileage).toBe(100)
  })

  test('Should not create car without carBrandId', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        carModelId: 1,
        mileage: 100,
      },
    })

    expect(response.status()).toBe(400)
  })

  test('Should not create car with invalid mileage', async () => {
    const response = await apiContext.post('/api/cars', {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: -1,
      },
    })

    expect(response.status()).toBe(400)
  })
})