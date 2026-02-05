import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { CountryData } from '../../types'
import './Chart.css'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b']

type PctKey =
  | 'msme_gdp_to_total_pct'
  | 'msme_loans_to_total_pct'
  | 'msme_employees_to_total_pct'
  | 'pct_firms_checking_savings'
  | 'pct_firms_bank_working_capital'
  | 'pct_payments_electronically'

interface ChartPctBarsProps {
  countries: CountryData[]
  dataKey: PctKey
}

export function ChartPctBars({ countries, dataKey }: ChartPctBarsProps) {
  const data = countries
    .filter((c) => c[dataKey] != null)
    .map((c, i) => ({
      name: c.name,
      value: c[dataKey] as number,
      fill: COLORS[i % COLORS.length],
    }))

  if (data.length === 0) {
    return <p className="chart-empty">데이터 없음</p>
  }

  return (
    <div className="chart-wrap chart-bar">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 12, right: 12, bottom: 12, left: 12 }}>
          <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--surface-hover)',
              border: '1px solid var(--border)',
              borderRadius: 8,
            }}
            labelStyle={{ color: 'var(--text)' }}
            formatter={(value: number) => [`${value}%`, '']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
