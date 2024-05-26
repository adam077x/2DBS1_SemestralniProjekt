// src/feedback/feedback.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FeedbackService {
  constructor(private databaseService: DatabaseService) {}

  async VytvoritZpetnouVazbu(
    zpravaId: number,
    uzivatelId: number,
    komentar: string,
    hodnoceni: number,
  ): Promise<void> {
    const query = `
      BEGIN
        VytvoritZpetnouVazbu(:zpravaId, :uzivatelId, :komentar, :hodnoceni);
      END;
    `;
    await this.databaseService.execute(query, {
      zpravaId,
      uzivatelId,
      komentar,
      hodnoceni,
    });
  }
}
