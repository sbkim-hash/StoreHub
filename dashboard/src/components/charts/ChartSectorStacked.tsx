import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import type { CountryData } from '../../types'
import './Chart.css'

const SECTOR_COLORS: Record<string, string> = {
  manufacturing: '#6366f1',
  services: '#22c55e',
  trade: '#f59e0b',
  others: '#8b8b96',
}

const SECTOR_LABELS: Record<string, string> = {
  manufacturing: '제조',
  services: '서비스',
  trade: '무역',
  others: '기타',
}

interface ChartSectorStackedProps {
  countries: CountryData[]
}

export function ChartSectorStacked({ countries }: ChartSectorStackedProps) {
  const data = countries.map((c) => {
    const s = c.msmes_by_sector_pct
    const hasAny =
      (s.manufacturing ?? 0) + (s.services ?? 0) + (s.trade ?? 0) + (s.others ?? 0) > 0
    if (!hasAny) return null
    return {
      name: c.name,
      manufacturing: s.manufacturing ?? 0,
      services: s.services ?? 0,
      trade: s.trade ?? 0,
      others: s.others ?? 0,
    }
  }).filter(Boolean) as {
    name: string
    manufacturing: number
    services: number
    trade: number
    others: number
  }[]

  if (data.length === 0) {
    return <p className="chart-empty">데이터 없음</p>
  }

  return (
    <div className="chart-wrap chart-stacked">
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
            formatter={(value: number, name: string) => [`${value}%`, SECTOR_LABELS[name] ?? name]}
          />
          <Legend
            formatter={(name) => SECTOR_LABELS[name] ?? name}
            wrapperStyle={{ fontSize: 12 }}
          />
          <Bar dataKey="manufacturing" stackId="a" fill={SECTOR_COLORS.manufacturing} radius={[0, 0, 0, 0]} />
          <Bar dataKey="services" stackId="a" fill={SECTOR_COLORS.services} radius={[0, 0, 0, 0]} />
          <Bar dataKey="trade" stackId="a" fill={SECTOR_COLORS.trade} radius={[0, 0, 0, 0]} />
          <Bar dataKey="others" stackId="a" fill={SECTOR_COLORS.others} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
