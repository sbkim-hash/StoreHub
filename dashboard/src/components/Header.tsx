import type { MarketLandscapeData } from '../types'
import './Header.css'

interface HeaderProps {
  meta: MarketLandscapeData['meta']
}

export function Header({ meta }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <h1>Market Landscape Dashboard</h1>
        <p className="subtitle">Go-to-Market 전략 수립 · {meta.period}</p>
      </div>
    </header>
  )
}
