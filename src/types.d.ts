interface Token {
  id: string
  name: string
  symbol: string
}

interface TokenDaily {
  date: number
  totalLiquidityUSD: string
}

interface TokenData {
  label: string
  value: number
}
