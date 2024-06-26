import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as oracledb from 'oracledb';

@Injectable()
export class FeedbackService {
  constructor(private databaseService: DatabaseService) {}

  async VytvoritZpetnouVazbu(
    zpravaId: number,
    uzivatelId: number,
    zpetnaVazba: string,
  ): Promise<void> {
    const query = `
      BEGIN
        VytvoritZpetnouVazbu(:zpetnaVazba, :zpravaId, :uzivatelId);
      END;
    `;
    await this.databaseService.execute(query, {
      zpravaId,
      uzivatelId,
      zpetnaVazba,
    });

    this.databaseService.commit();
  }

  async NacistZpetneVazby(zpravaId: number) {
    const query = `
      BEGIN
        NacistZpetneVazby(:zpravaId, :result_cursor);
      END;
    `;
    const result = await this.databaseService.execute(query, {
      result_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
      zpravaId,
    });
    const resultSet = result.outBinds.result_cursor;
    let row;
    const feedbacks = [];
    while ((row = await resultSet.getRow())) {
      feedbacks.push(
        Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.toLowerCase(), value]),
        ),
      );
    }
    await resultSet.close();
    return feedbacks;
  }
}
