"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FcClubsService = void 0;
const eafc_clubs_api_1 = require("eafc-clubs-api");
class FcClubsService {
    api = new eafc_clubs_api_1.EAFCApiService();
    async searchClub(clubName, platform) {
        const clubs = await this.api.searchClub({
            clubName,
            platform: platform
        });
        return clubs;
    }
    async getMembersStats(clubId, platform) {
        const stats = await this.api.memberCareerStats({
            clubId,
            platform: platform
        });
        return stats;
    }
}
exports.FcClubsService = FcClubsService;
//# sourceMappingURL=fcClubs.js.map