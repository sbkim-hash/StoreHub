import { useEffect, useState } from 'react'
import type { MarketLandscapeData } from './types'
import { Header } from './components/Header'
import { KpiCards } from './components/KpiCards'
import { ChartsSection } from './components/ChartsSection'
import { SourcesFooter } from './components/SourcesFooter'
import './App.css'

function App() {
  const [data, setData] = useState<MarketLandscapeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/data/market-landscape.json')
      .then((res) => {
        if (!res.ok) throw new Error('데이터를 불러올 수 없습니다.')
        return res.json()
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="app loading">
        <div className="loader" />
        <p>Market landscape 데이터를 불러오는 중…</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="app error">
        <h1>데이터 로드 실패</h1>
        <p>{error ?? '알 수 없는 오류'}</p>
        <p><code>dashboard/public/data/market-landscape.json</code> 파일이 있는지 확인하세요.</p>
      </div>
    )
  }

  return (
    <div className="app">
      <Header meta={data.meta} />
      <main>
        <KpiCards countries={data.countries} />
        <ChartsSection countries={data.countries} />
      </main>
      <SourcesFooter meta={data.meta} />
    </div>
  )
}

export default App
