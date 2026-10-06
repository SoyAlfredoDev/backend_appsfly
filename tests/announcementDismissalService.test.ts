import { beforeEach, describe, expect, it, vi } from 'vitest'

const prismaMock = vi.hoisted(() => ({
  user: {
    findUnique: vi.fn(),
    update: vi.fn(),
  },
}))

vi.mock('../dbGeneral.js', () => ({
  generalPrisma: prismaMock,
}))

import {
  addDismissedAnnouncementIds,
  getDismissedAnnouncementIds,
} from '../services/announcements/announcementDismissalService.ts'

describe('announcementDismissalService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns stored announcement ids for a user', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      userDismissedAnnouncementIds: ['pwa-install-v2'],
    })

    await expect(getDismissedAnnouncementIds('user-1')).resolves.toEqual(['pwa-install-v2'])
  })

  it('merges new announcement ids without duplicates', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      userDismissedAnnouncementIds: ['pwa-install-v2'],
    })
    prismaMock.user.update.mockResolvedValue({
      userDismissedAnnouncementIds: ['pwa-install-v2', 'feature-x-v1'],
    })

    await expect(
      addDismissedAnnouncementIds('user-1', ['pwa-install-v2', 'feature-x-v1', '  ']),
    ).resolves.toEqual(['pwa-install-v2', 'feature-x-v1'])

    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      data: { userDismissedAnnouncementIds: ['pwa-install-v2', 'feature-x-v1'] },
      select: { userDismissedAnnouncementIds: true },
    })
  })
})
