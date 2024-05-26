// src/meeting/meeting.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class MeetingService {
  constructor(private databaseService: DatabaseService) {}

  async VytvoritSchuzku(
    typ_schuzky: string,
    umisteni_odkaz: string,
    datum: Date,
    cas: Date,
  ): Promise<void> {
    const query = `
      BEGIN
        VytvoritSchuzku(:typ_schuzky, :umisteni_odkaz, :datum, :cas);
      END;
    `;
    await this.databaseService.execute(query, {
      typ_schuzky,
      umisteni_odkaz,
      datum,
      cas,
    });
  }
}
