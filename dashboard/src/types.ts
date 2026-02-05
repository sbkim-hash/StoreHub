export interface MsmesBySector {
  manufacturing: number | null;
  services: number | null;
  trade: number | null;
  others: number | null;
}

export interface CountryData {
  code: string;
  name: string;
  msme_gdp_m_usd: number | null;
  msme_gdp_to_total_pct: number | null;
  msme_loans_to_total_pct: number | null;
  msme_employees_to_total_pct: number | null;
  msmes_by_sector_pct: MsmesBySector;
  pct_firms_checking_savings: number | null;
  pct_firms_bank_working_capital: number | null;
  pct_payments_electronically: number | null;
}

export interface MarketLandscapeData {
  meta: {
    description: string;
    period: string;
    msme_source: string;
    msme_url: string;
    wb_source: string;
    wb_url: string;
  };
  countries: CountryData[];
}
