import axios from 'axios'

enum QUERY {
  TOP_TOKENS = `{
    tokens(where: {totalLiquidity_gt: 1}, first: 5, orderBy: tradeVolumeUSD, orderDirection: desc) {
      id
      name
      symbol
    }
  }`,
  TOKEN_DAILY = `{
    tokenDayDatas(where: {token: "$token_id"}, orderBy: date, orderDirection: desc) {
      id
      date
      totalLiquidityUSD
    }
  }`
}

const URL = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'

const cacheLayer: { [key: string]: TokenData[] } = {}

export const getTokens = async (): Promise<Token[]> =>
  await axios
    .post(URL, {
      query: QUERY.TOP_TOKENS
    })
    .then((res) => res.data.data.tokens)

export const getTokenDaily = async (token: string): Promise<TokenData[]> => {
  if (!token) return []
  if (cacheLayer[token]) return cacheLayer[token]

  const tokenDayDatas = (await axios
    .post(URL, {
      query: QUERY.TOKEN_DAILY.replace('$token_id', token)
    })
    .then((res) => res.data.data.tokenDayDatas)) as TokenDaily[]

  const data = tokenDayDatas.reverse().map((d) => ({
    label: new Date(d.date * 1000).toISOString().split('T')[0],
    value: parseInt(d.totalLiquidityUSD.split('.')[0])
  }))

  cacheLayer[token] = data

  return data
}

export const getTokenMonthly = async (token: string): Promise<TokenData[]> => {
  if (!token) return []

  const tokenDaily = await getTokenDaily(token)
  const months: { [key: string]: number } = {}
  tokenDaily.forEach((d) => {
    const month = d.label.substring(0, 7)
    if (!months[month]) months[month] = 0
    months[month] += d.value
  })
  return Object.keys(months)
    .sort()
    .map((m) => ({
      label: m,
      value: months[m]
    }))
}
