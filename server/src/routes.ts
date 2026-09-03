import { Router } from 'express';
import { FcClubsService } from './services/fcClubs';

export const clubsRouter = Router();
const fcClubsService = new FcClubsService();

clubsRouter.get('/search', async (req, res) => {
  try {
    const { clubName, platform } = req.query;
    if (!clubName) {
      return res.status(400).json({ error: 'clubName is required' });
    }
    const clubs = await fcClubsService.searchClub(clubName as string, (platform as string) || 'common-gen5');
    res.json(clubs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

clubsRouter.get('/:clubId/members/stats', async (req, res) => {
  try {
    const { clubId } = req.params;
    const { platform } = req.query;
    if (!clubId) {
      return res.status(400).json({ error: 'clubId is required' });
    }
    const stats = await fcClubsService.getMembersStats(clubId, (platform as string) || 'common-gen5');
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
