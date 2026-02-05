import type { CountryData } from '../types'
import './KpiCards.css'


interface KpiCardsProps {
  countries: CountryData[]
}

const formatNumber = (n: number | null): string => {
  if (n == null) return '–'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function KpiCards({ countries }: KpiCardsProps) {
  return (
    <section className="kpi-cards">
      <h2 className="section-title">국가별 핵심 지표 요약</h2>
      <div className="kpi-grid">
        {countries.map((c) => (
          <article key={c.code} className="kpi-card">
            <h3>{c.name}</h3>
            <dl>
              <div>
                <dt>MSME GDP</dt>
                <dd>{c.msme_gdp_m_usd != null ? `${formatNumber(c.msme_gdp_m_usd)} M USD` : '–'}</dd>
              </div>
              <div>
                <dt>MSME GDP 비중</dt>
                <dd>{c.msme_gdp_to_total_pct != null ? `${c.msme_gdp_to_total_pct}%` : '–'}</dd>
              </div>
              <div>
                <dt>MSME 대출 비중</dt>
                <dd>{c.msme_loans_to_total_pct != null ? `${c.msme_loans_to_total_pct}%` : '–'}</dd>
              </div>
              <div>
                <dt>MSME 고용 비중</dt>
                <dd>{c.msme_employees_to_total_pct != null ? `${c.msme_employees_to_total_pct}%` : '–'}</dd>
              </div>
              <div>
                <dt>법인 계좌 보유 기업</dt>
                <dd>{c.pct_firms_checking_savings != null ? `${c.pct_firms_checking_savings}%` : '–'}</dd>
              </div>
              <div>
                <dt>은행 운전자금 이용</dt>
                <dd>{c.pct_firms_bank_working_capital != null ? `${c.pct_firms_bank_working_capital}%` : '–'}</dd>
              </div>
              <div>
                <dt>전자 결제 비중</dt>
                <dd>{c.pct_payments_electronically != null ? `${c.pct_payments_electronically}%` : '–'}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
