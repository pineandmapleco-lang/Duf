// Vercel serverless function (Node runtime). Deployed alongside the Vite
// static build at /api/notion-agent-activity — this is the only place the
// real Notion integration token ever touches: it stays a server-side env
// var and is never bundled into client JS.
//
// Required env vars (set in the Vercel project, NOT prefixed with VITE_):
//   NOTION_API_KEY                        — internal integration token
//   NOTION_HANDOFF_LEDGER_DATA_SOURCE_ID   — data source id for the
//                                            "OMNISTACK — Handoff Ledger" db
//
// This function only proxies the authenticated query and returns the raw
// Notion rows — the mapping into AgentActivity[] happens client-side in
// src/lib/data-sources/notion.ts, since that logic contains no secrets.

export default async function handler(req, res) {
  const token = process.env.NOTION_API_KEY
  const dataSourceId = process.env.NOTION_HANDOFF_LEDGER_DATA_SOURCE_ID

  if (!token || !dataSourceId) {
    res.status(500).json({
      error: 'Server is missing NOTION_API_KEY or NOTION_HANDOFF_LEDGER_DATA_SOURCE_ID',
    })
    return
  }

  try {
    const notionResponse = await fetch(`https://api.notion.com/v1/data_sources/${dataSourceId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2025-09-03',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sorts: [{ property: 'Created', direction: 'descending' }],
        page_size: 100,
      }),
    })

    if (!notionResponse.ok) {
      const detail = await notionResponse.text()
      res.status(notionResponse.status).json({ error: `Notion API error: ${detail}` })
      return
    }

    const data = await notionResponse.json()
    res.status(200).json({ results: data.results })
  } catch (err) {
    res.status(502).json({ error: err instanceof Error ? err.message : 'Failed to reach Notion API' })
  }
}
