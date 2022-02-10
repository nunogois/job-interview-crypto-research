import { getTokens, getTokenDaily, getTokenMonthly } from '../api'

const TOKEN_ID = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

describe('getTokens', () => {
  test('retrieves 5 tokens', async () => {
    expect(await getTokens()).toHaveLength(5)
  })
})

describe('getTokenDaily', () => {
  test('retrieves daily data about a specific token', async () => {
    expect(await getTokenDaily(TOKEN_ID)).not.toEqual([])
  })
})

describe('getTokenMonthly', () => {
  test('retrieves monthly data about a specific token', async () => {
    expect(await getTokenMonthly(TOKEN_ID)).not.toEqual([])
  })
})
