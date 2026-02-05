import type { MarketLandscapeData } from '../types'
import './SourcesFooter.css'


interface SourcesFooterProps {
  meta: MarketLandscapeData['meta']
}

export function SourcesFooter({ meta }: SourcesFooterProps) {
  return (
    <footer className="sources-footer">
      <div className="sources-inner">
        <h3>데이터 출처</h3>
        <ul>
          <li>
            <strong>MSME 거시경제:</strong>{' '}
            <a href={meta.msme_url} target="_blank" rel="noopener noreferrer">
              {meta.msme_source}
            </a>
          </li>
          <li>
            <strong>기업 금융 행태:</strong>{' '}
            <a href={meta.wb_url} target="_blank" rel="noopener noreferrer">
              {meta.wb_source}
            </a>
          </li>
        </ul>
        <p className="period">{meta.period} 기준</p>
      </div>
    </footer>
  )
}
