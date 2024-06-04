import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as oracledb from 'oracledb';

@Injectable()
export class MeasuresService {
  constructor(private databaseService: DatabaseService) {}

  async NacistOpatreni(zpravaId: number) {
    const query = `
      BEGIN
        NacistOpatreni(:zpravaId, :result_cursor);
      END;
    `;
    const result = await this.databaseService.execute(query, {
      result_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
      zpravaId,
    });
    const resultSet = result.outBinds.result_cursor;
    let row;
    const measures = [];
    while ((row = await resultSet.getRow())) {
      measures.push(
        Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.toLowerCase(), value]),
        ),
      );
    }
    await resultSet.close();
    return measures;
  }

  async VytvoritOpatreni(popis: string, zpravaId: number, naklady: number) {
    const query = `
      BEGIN
        VytvoritOpatreni(:popis, :zpravaId, :naklady);
      END;
    `;
    await this.databaseService.execute(query, {
      popis,
      zpravaId,
      naklady,
    });

    this.databaseService.commit();
  }
}
