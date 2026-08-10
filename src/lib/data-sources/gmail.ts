import { subDays, subHours } from 'date-fns'
import { getSourceMode, mockDelay } from './config'
import type { FlaggedThread } from '../../types/dashboard'

// Gmail is only ever surfaced as subject + sender + snippet — never full
// message bodies — both in mock data and in the live wiring point below.

function threadsMock(): FlaggedThread[] {
  const now = new Date()
  return [
    {
      id: 'gmail-1',
      subject: 'Re: Resonator build — timeline check-in',
      sender: 'Dana Osgood',
      senderEmail: 'dana.osgood@example.com',
      snippet: "Just wanted to check if we're still on track for the review call this week...",
      entity: 'blackgoat',
      receivedTime: subHours(now, 4).toISOString(),
      url: 'https://mail.google.com/mail/u/0/#inbox/osgood-thread',
    },
    {
      id: 'gmail-2',
      subject: 'Wholesale terms question',
      sender: 'Priya Nair — Thistle & Bloom Boutique',
      senderEmail: 'priya@thistleandbloom.example.com',
      snippet: 'Loved the sample kit! Quick question about minimum order quantities before we...',
      entity: 'maddymade',
      receivedTime: subHours(now, 7).toISOString(),
      url: 'https://mail.google.com/mail/u/0/#inbox/thistle-bloom-thread',
    },
    {
      id: 'gmail-3',
      subject: 'KDP proof — one more revision needed',
      sender: 'Amazon KDP Support',
      senderEmail: 'no-reply@kdp.amazon.com',
      snippet: 'Your uploaded interior file has a minor bleed issue on pages 112-114...',
      entity: 'wiseminds',
      receivedTime: subHours(now, 9).toISOString(),
      url: 'https://mail.google.com/mail/u/0/#inbox/kdp-thread',
    },
    {
      id: 'gmail-4',
      subject: 'Farmers market vendor renewal',
      sender: 'Downtown Harvest Market Assoc.',
      senderEmail: 'vendors@harvestmarket.example.org',
      snippet: 'Your vendor spot renewal for the fall season needs confirmation by Friday...',
      entity: 'eatstreats',
      receivedTime: subDays(now, 1).toISOString(),
      url: 'https://mail.google.com/mail/u/0/#inbox/market-renewal-thread',
    },
    {
      id: 'gmail-5',
      subject: 'Tonewood shipment delay — updated ETA',
      sender: 'Cascade Tonewood Supply',
      senderEmail: 'orders@cascadetonewood.example.com',
      snippet: 'We wanted to give you a heads up that your order is now expected to ship...',
      entity: 'blackgoat',
      receivedTime: subDays(now, 1).toISOString(),
      url: 'https://mail.google.com/mail/u/0/#inbox/tonewood-thread',
    },
  ]
}

async function fetchLiveThreads(): Promise<FlaggedThread[]> {
  const token = import.meta.env.VITE_GMAIL_ACCESS_TOKEN as string | undefined
  if (!token) {
    throw new Error('Gmail live mode requires VITE_GMAIL_ACCESS_TOKEN')
  }
  // Live wiring point: GET https://gmail.googleapis.com/gmail/v1/users/me/threads
  // with Authorization: Bearer {token}, then per-thread fetch limited to
  // metadata (From, Subject) + snippet — never format=full.
  throw new Error('Live Gmail integration not yet implemented — set VITE_GMAIL_MODE=mock')
}

export async function getFlaggedThreads(): Promise<FlaggedThread[]> {
  if (getSourceMode('gmail') === 'live') return fetchLiveThreads()
  await mockDelay()
  return threadsMock()
}
