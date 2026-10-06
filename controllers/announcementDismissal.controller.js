import {
  addDismissedAnnouncementIds,
  getDismissedAnnouncementIds,
} from '../services/announcements/announcementDismissalService.ts'

function readUserId(req) {
  return req.user?.payload?.id ?? null
}

export async function getDismissedAnnouncementsController(req, res) {
  try {
    const userId = readUserId(req)
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized', code: 'UNAUTHORIZED' })
    }

    const ids = await getDismissedAnnouncementIds(userId)
    return res.status(200).json({ ids })
  } catch (error) {
    console.error('(announcementDismissal.controller): get dismissed announcements failed', error)
    return res.status(500).json({ message: 'Internal server error', code: 'INTERNAL_ERROR' })
  }
}

export async function dismissAnnouncementsController(req, res) {
  try {
    const userId = readUserId(req)
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized', code: 'UNAUTHORIZED' })
    }

    const ids = await addDismissedAnnouncementIds(userId, req.body?.announcementIds)
    return res.status(200).json({ ids })
  } catch (error) {
    console.error('(announcementDismissal.controller): dismiss announcements failed', error)
    return res.status(500).json({ message: 'Internal server error', code: 'INTERNAL_ERROR' })
  }
}
