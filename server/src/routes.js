"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clubsRouter = void 0;
const express_1 = require("express");
const fcClubs_1 = require("./services/fcClubs");
exports.clubsRouter = (0, express_1.Router)();
const fcClubsService = new fcClubs_1.FcClubsService();
exports.clubsRouter.get('/search', async (req, res) => {
    try {
        const { clubName, platform } = req.query;
        if (!clubName) {
            return res.status(400).json({ error: 'clubName is required' });
        }
        const clubs = await fcClubsService.searchClub(clubName, platform || 'common-gen5');
        res.json(clubs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.clubsRouter.get('/:clubId/members/stats', async (req, res) => {
    try {
        const { clubId } = req.params;
        const { platform } = req.query;
        if (!clubId) {
            return res.status(400).json({ error: 'clubId is required' });
        }
        const stats = await fcClubsService.getMembersStats(clubId, platform || 'common-gen5');
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//# sourceMappingURL=routes.js.map