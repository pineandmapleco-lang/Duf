import { subHours, subMinutes } from 'date-fns'
import { getSourceMode, mockDelay } from './config'
import type { DriveFile } from '../../types/dashboard'

function filesMock(): DriveFile[] {
  const now = new Date()
  return [
    {
      id: 'drive-1',
      name: 'COA_Vol3_Ch4-6_Lettering_FINAL.psd',
      entity: 'wiseminds',
      modifiedTime: subMinutes(now, 25).toISOString(),
      modifiedBy: 'Trixie',
      project: 'COA (Children of Ash)',
      url: 'https://drive.google.com/coa-vol3-lettering',
    },
    {
      id: 'drive-2',
      name: 'Wren_Cycle_Bk2_KDP_Proof_v4.pdf',
      entity: 'wiseminds',
      modifiedTime: subHours(now, 1).toISOString(),
      modifiedBy: 'Dispatch',
      project: 'The Wren Cycle',
      url: 'https://drive.google.com/wren-kdp-proof-v4',
    },
    {
      id: 'drive-3',
      name: 'Osgood_Resonator_Progress_Photos.zip',
      entity: 'blackgoat',
      modifiedTime: subHours(now, 2).toISOString(),
      modifiedBy: 'Trixie',
      project: 'Osgood Custom Resonator',
      url: 'https://drive.google.com/osgood-progress-photos',
    },
    {
      id: 'drive-4',
      name: 'Element34_Batch22_QC_Log.xlsx',
      entity: 'element34',
      modifiedTime: subHours(now, 3).toISOString(),
      modifiedBy: 'Trixie',
      project: 'Autumn Apothecary Batch',
      url: 'https://drive.google.com/e34-batch22-qc',
    },
    {
      id: 'drive-5',
      name: 'MaddyMadeThem_Wholesale_SampleKit_Deck.pptx',
      entity: 'maddymade',
      modifiedTime: subHours(now, 5).toISOString(),
      modifiedBy: 'Manus',
      project: 'Wholesale Outreach',
      url: 'https://drive.google.com/mmt-wholesale-deck',
    },
    {
      id: 'drive-6',
      name: 'Sable_Smoke_Teaser_Storyboard.fig',
      entity: 'wiseminds',
      modifiedTime: subHours(now, 6).toISOString(),
      modifiedBy: 'Gem',
      project: 'Sable & Smoke',
      url: 'https://drive.google.com/sable-storyboard',
    },
    {
      id: 'drive-7',
      name: 'Eats_Treats_Weekend_Market_Inventory.csv',
      entity: 'eatstreats',
      modifiedTime: subHours(now, 9).toISOString(),
      modifiedBy: 'Trixie',
      project: 'Weekend Market Circuit',
      url: 'https://drive.google.com/et-market-inventory',
    },
    {
      id: 'drive-8',
      name: 'Q3_CrossEntity_Ops_Summary.docx',
      entity: 'omnistack',
      modifiedTime: subHours(now, 11).toISOString(),
      modifiedBy: 'Chad',
      project: 'OmniStack Ops',
      url: 'https://drive.google.com/q3-ops-summary',
    },
  ]
}

async function fetchLiveFiles(): Promise<DriveFile[]> {
  // Live wiring point: same server-side-proxy requirement as Google Calendar
  // — the OAuth token must stay server-side, never in a VITE_-prefixed env
  // var. A proxy (e.g. api/google-drive-files.js) would call
  // GET https://www.googleapis.com/drive/v3/files
  // orderBy=modifiedTime desc, filtered to project folders, and this
  // function would fetch() that endpoint instead of calling Google directly.
  throw new Error('Live Google Drive integration not yet implemented — set VITE_GOOGLE_DRIVE_MODE=mock')
}

export async function getRecentDriveFiles(): Promise<DriveFile[]> {
  if (getSourceMode('googleDrive') === 'live') return fetchLiveFiles()
  await mockDelay()
  return filesMock()
}
