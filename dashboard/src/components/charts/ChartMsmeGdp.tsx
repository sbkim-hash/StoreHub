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

interface ChartMsmeGdpProps {
  countries: CountryData[]
}

export function ChartMsmeGdp({ countries }: ChartMsmeGdpProps) {
  const chartData = countries
    .filter((c) => c.msme_gdp_m_usd != null)
    .map((c, i) => ({
      name: c.name,
      value: c.msme_gdp_m_usd!,
      fill: COLORS[i % COLORS.length],
    }))

  if (chartData.length === 0) {
    return <p className="chart-empty">데이터 없음</p>
  }

  return (
    <div className="chart-wrap chart-bar">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 12, right: 12, bottom: 12, left: 12 }}>
          <XAxis dataKey="name" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : String(v))}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--surface-hover)',
              border: '1px solid var(--border)',
              borderRadius: 8,
            }}
            labelStyle={{ color: 'var(--text)' }}
            formatter={(value: number) => [`${(value / 1000).toFixed(1)}k M USD`, 'MSME GDP']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
