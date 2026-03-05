# EcomOS Client Portal

Investor-facing dashboard for Digital Shaheens — a managed TikTok Shop service. Clients can track their store performance, view invoices, receive notifications, and submit support requests.

## Stack

- **Next.js 15** (App Router)
- **React 19** with TypeScript (strict mode)
- **Tailwind CSS v4** — utility classes + inline styles for colors
- **Recharts** — bar charts for revenue visualization
- **Lucide React** — SVG icons
- **Google Sheets API** — live performance data from client spreadsheets
- **Supabase** — Postgres database for clients, notifications, invoices, support tickets
- **Vercel** — deployment

## Setup

```bash
npm install
cp .env.local.example .env.local   # fill in your values
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY` | Google Sheets API key (public reads) |
| `GOOGLE_SHEETS_API_KEY` | Same key for server-side fetch |
| `DEFAULT_SHEET_ID` | Default Google Sheet ID (Deal Hoper sheet) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server only) |

## Google Sheets Data Structure

Sheet: `1H8q41yDxNIXsCWo1Xv1raQuF5NyuRzrAwlWDcBFY0EU`

### DASHBOARD tab

**Daily data** — columns A:H starting row 6:
`Date | Listings | Orders | Our Earnings | Total Purchase | TikTok Fees | Profit | ROI`

**Monthly summary** — columns K:S starting row 6:
`Month | (empty) | Listings | Orders | Our Earnings | Total Purchase | TikTok Fees | Profit | ROI`

### Profit Sheet

Full order-level ledger with columns:
`Month | Status On TTS | Status On Supplier | Date | Ship By Date | TTS Customer Name | Order ID | Product Link | Supplier Order No | Carrier | Tracking ID | You Earned | Subtotal | COGS | TikTok Fees | Refunds | Loss | Net Profit | 50% Split | Comments | ROI%`

## API Routes

### `GET /api/sheets?sheetId=<id>`

Returns parsed monthly + daily data from the Google Sheet.

**Response:**
```json
{
  "monthly": [
    { "month": "January", "listings": 24, "orders": 108, "revenue": 1694.40, "cogs": 1265.38, "fees": 0, "profit": 429.02, "roi": 33.90 }
  ],
  "daily": [],
  "totals": { "totalRevenue": 17812.37, "totalOrders": 1013, "totalProfit": 2810.48, "avgRoi": 18.73 }
}
```

## Supabase Schema

Run `supabase/schema.sql` against your Supabase project to create tables: `clients`, `notifications`, `invoices`, `support_tickets`.

## Pages

| Route | Description |
|---|---|
| `/login` | Login page |
| `/signup` | Onboarding signup |
| `/dashboard` | Main KPI dashboard (live Google Sheets data) |
| `/dashboard/invoices` | Monthly invoices |
| `/dashboard/notifications` | Policy, invoice, milestone alerts |
| `/dashboard/support` | Support tickets + FAQ |
