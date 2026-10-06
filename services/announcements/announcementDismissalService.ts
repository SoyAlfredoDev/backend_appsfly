import { generalPrisma as general } from '../../dbGeneral.js'

const MAX_ANNOUNCEMENT_ID_LENGTH = 120
const MAX_STORED_IDS = 200

function normalizeAnnouncementId(announcementId: unknown) {
  if (typeof announcementId !== 'string') return null
  const normalized = announcementId.trim()
  if (!normalized || normalized.length > MAX_ANNOUNCEMENT_ID_LENGTH) return null
  return normalized
}

function normalizeAnnouncementIds(announcementIds: unknown) {
  if (!Array.isArray(announcementIds)) return []
  const unique = new Set<string>()
  for (const value of announcementIds) {
    const normalized = normalizeAnnouncementId(value)
    if (normalized) unique.add(normalized)
  }
  return [...unique]
}

export async function getDismissedAnnouncementIds(userId: string) {
  const user = await general.user.findUnique({
    where: { userId },
    select: { userDismissedAnnouncementIds: true },
  })
  return user?.userDismissedAnnouncementIds ?? []
}

export async function addDismissedAnnouncementIds(userId: string, announcementIds: unknown) {
  const incoming = normalizeAnnouncementIds(announcementIds)
  if (incoming.length === 0) {
    return getDismissedAnnouncementIds(userId)
  }

  const existing = await getDismissedAnnouncementIds(userId)
  const merged = [...new Set([...existing, ...incoming])].slice(-MAX_STORED_IDS)

  const updated = await general.user.update({
    where: { userId },
    data: { userDismissedAnnouncementIds: merged },
    select: { userDismissedAnnouncementIds: true },
  })

  return updated.userDismissedAnnouncementIds
}
