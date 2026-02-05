import type { CountryData } from '../types'
import { ChartMsmeGdp } from './charts/ChartMsmeGdp'
import './ChartsSection.css'
import { ChartPctBars } from './charts/ChartPctBars'
import { ChartSectorStacked } from './charts/ChartSectorStacked'
import './ChartsSection.css'

interface ChartsSectionProps {
  countries: CountryData[]
}

export function ChartsSection({ countries }: ChartsSectionProps) {
  return (
    <section className="charts-section">
      <h2 className="section-title">지표별 시각화</h2>

      <div className="chart-card">
        <h3>1) MSME GDP (M USD)</h3>
        <p className="chart-desc">Table 2: MSME Landscape · MSME GDP 2023-2024 (연평균 환율 적용)</p>
        <ChartMsmeGdp countries={countries} />
      </div>

      <div className="chart-card">
        <h3>2) MSME GDP to Total (% to GDP)</h3>
        <p className="chart-desc">Table 2 · MSME GDP to total (%)</p>
        <ChartPctBars countries={countries} dataKey="msme_gdp_to_total_pct" />
      </div>

      <div className="chart-card">
        <h3>3) MSME Loans to Total (%)</h3>
        <p className="chart-desc">Table 3: MSME Financing · MSME loans to total loans (%)</p>
        <ChartPctBars countries={countries} dataKey="msme_loans_to_total_pct" />
      </div>

      <div className="chart-card">
        <h3>4) MSME Employees to Total (%)</h3>
        <p className="chart-desc">Table 2 · MSME employees to total (%)</p>
        <ChartPctBars countries={countries} dataKey="msme_employees_to_total_pct" />
      </div>

      <div className="chart-card">
        <h3>5) MSMEs by Sector (%)</h3>
        <p className="chart-desc">Table 2 · MSMEs by sector ~ Others (섹터별 MSME 개수 비중)</p>
        <ChartSectorStacked countries={countries} />
      </div>

      <div className="chart-card">
        <h3>6) % of firms with checking/savings account</h3>
        <p className="chart-desc">WBES Finance · Credit and Loans · Indicator 291</p>
        <ChartPctBars countries={countries} dataKey="pct_firms_checking_savings" />
      </div>

      <div className="chart-card">
        <h3>7) % of firms using banks for working capital</h3>
        <p className="chart-desc">WBES Finance · Working Capital Financing · Indicator 294</p>
        <ChartPctBars countries={countries} dataKey="pct_firms_bank_working_capital" />
      </div>

      <div className="chart-card">
        <h3>8) % of payments made electronically</h3>
        <p className="chart-desc">WBES Finance · Electronic Payments · Indicator 310</p>
        <ChartPctBars countries={countries} dataKey="pct_payments_electronically" />
      </div>
    </section>
  )
}
