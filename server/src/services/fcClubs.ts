import { EAFCApiService } from 'eafc-clubs-api';

export class FcClubsService {
  private api = new EAFCApiService();

  async searchClub(clubName: string, platform: string) {
    const clubs = await this.api.searchClub({
      clubName,
      platform: platform as any
    });
    return clubs;
  }

  async getMembersStats(clubId: string, platform: string) {
    const stats = await this.api.memberCareerStats({
      clubId,
      platform: platform as any
    });
    return stats;
  }
}
