import { NextRequest, NextResponse } from "next/server";
import type { MonthlyData, DailyData, SheetResponse } from "@/types";

const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const DEFAULT_SHEET_ID = process.env.DEFAULT_SHEET_ID;

function cleanNumber(val: string | undefined): number {
  if (!val || val.includes("DIV/0") || val.includes("#")) return 0;
  return parseFloat(val.replace(/[$,%]/g, "").replace(/,/g, "").trim()) || 0;
}

async function fetchRange(sheetId: string, range: string): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${API_KEY}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) {
    throw new Error(`Sheets API error: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return (data.values as string[][] | undefined) ?? [];
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sheetId = searchParams.get("sheetId") ?? DEFAULT_SHEET_ID;

  if (!sheetId) {
    return NextResponse.json({ error: "Missing sheetId" }, { status: 400 });
  }
  if (!API_KEY) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  try {
    const [monthlyRows, dailyRows] = await Promise.all([
      fetchRange(sheetId, "DASHBOARD!K6:S17"),
      fetchRange(sheetId, "DASHBOARD!A6:H35"),
    ]);

    // Monthly: K=Month, L=empty, M=Listings, N=Orders, O=OurEarnings, P=TotalPurchase, Q=TikTokFees, R=Profit, S=ROI
    const monthly: MonthlyData[] = monthlyRows
      .filter((row) => {
        const month = row[0]?.trim();
        const orders = cleanNumber(row[3]);
        return month && month !== "" && orders > 0;
      })
      .map((row) => ({
        month: row[0].trim(),
        listings: cleanNumber(row[2]),
        orders: cleanNumber(row[3]),
        revenue: cleanNumber(row[4]),
        cogs: cleanNumber(row[5]),
        fees: cleanNumber(row[6]),
        profit: cleanNumber(row[7]),
        roi: cleanNumber(row[8]),
      }));

    // Daily: A=Date, B=Listings, C=Orders, D=OurEarnings, E=TotalPurchase, F=TikTokFees, G=Profit, H=ROI
    const daily: DailyData[] = dailyRows
      .filter((row) => {
        const date = row[0]?.trim();
        const orders = cleanNumber(row[2]);
        return date && date !== "" && orders > 0;
      })
      .map((row) => ({
        date: row[0].trim(),
        listings: cleanNumber(row[1]),
        orders: cleanNumber(row[2]),
        revenue: cleanNumber(row[3]),
        totalPurchase: cleanNumber(row[4]),
        fees: cleanNumber(row[5]),
        profit: cleanNumber(row[6]),
        roi: cleanNumber(row[7]),
      }));

    const totalRevenue = monthly.reduce((sum, m) => sum + m.revenue, 0);
    const totalOrders = monthly.reduce((sum, m) => sum + m.orders, 0);
    const totalProfit = monthly.reduce((sum, m) => sum + m.profit, 0);
    const avgRoi =
      monthly.length > 0
        ? monthly.reduce((sum, m) => sum + m.roi, 0) / monthly.length
        : 0;

    const response: SheetResponse = {
      monthly,
      daily,
      totals: {
        totalRevenue: Math.round(totalRevenue * 100) / 100,
        totalOrders,
        totalProfit: Math.round(totalProfit * 100) / 100,
        avgRoi: Math.round(avgRoi * 100) / 100,
      },
    };

    return NextResponse.json(response);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
