export const CURRENCY_CODES = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "INR",
  "CAD",
  "AUD",
  "CHF",
  "CNY",
  "SGD",
  "NZD",
  "HKD",
  "KRW",
  "BRL",
  "MXN",
  "ZAR",
  "SEK",
  "NOK",
  "DKK",
  "PLN",
] as const;

export type CurrencyCode = (typeof CURRENCY_CODES)[number];

export interface FxRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

/** Fetch latest FX rates from Frankfurter (ECB), no API key. */
export async function fetchFxRates(base: CurrencyCode = "USD"): Promise<FxRates> {
  const res = await fetch(
    `https://api.frankfurter.app/latest?from=${encodeURIComponent(base)}`
  );
  if (!res.ok) throw new Error("Could not load exchange rates. Try again later.");
  const data = (await res.json()) as {
    base: string;
    date: string;
    rates: Record<string, number>;
  };
  return {
    base: data.base,
    date: data.date,
    rates: { ...data.rates, [data.base]: 1 },
  };
}

export function convertCurrency(
  amount: number,
  from: string,
  to: string,
  rates: FxRates
): number {
  if (!Number.isFinite(amount)) throw new Error("Enter a valid amount.");
  const fromRate = rates.rates[from];
  const toRate = rates.rates[to];
  if (fromRate == null || toRate == null) {
    throw new Error("Currency not available in the latest rate set.");
  }
  // rates are relative to rates.base
  const inBase = amount / fromRate;
  return inBase * toRate;
}
