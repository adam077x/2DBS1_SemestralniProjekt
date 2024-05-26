// src/report/report.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as oracledb from 'oracledb';  // Import oracledb

@Injectable()
export class ReportService {
  constructor(private databaseService: DatabaseService) {}

  async NacistZpravy(temaId: number): Promise<any> {
    const query = `
      BEGIN
        NacistZpravy(:temaId, :result_cursor);
      END;
    `;
    const result = await this.databaseService.execute(query, {
      temaId,
      result_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    });
    const resultSet = result.outBinds.result_cursor;
    let row;
    const reports = [];
    while ((row = await resultSet.getRow())) {
      reports.push(row);
    }
    await resultSet.close();
    return reports;
  }

  async NacistZpravu(zpravaId: number): Promise<any> {
    const query = `
      BEGIN
        NacistZpravu(:zpravaId, :result_cursor);
      END;
    `;
    const result = await this.databaseService.execute(query, {
      zpravaId,
      result_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    });
    const resultSet = result.outBinds.result_cursor;
    let row;
    const reports = [];
    while ((row = await resultSet.getRow())) {
      reports.push(row);
    }
    await resultSet.close();
    return reports;
  }

  async VytvoritZpravu(
    temaId: number,
    nazev: string,
    popis: string,
    datum: Date,
    uzivatelId: number,
  ): Promise<void> {
    const query = `
      BEGIN
        VytvoritZpravu(:temaId, :nazev, :popis, :datum, :uzivatelId);
      END;
    `;
    await this.databaseService.execute(query, {
      temaId,
      nazev,
      popis,
      datum,
      uzivatelId,
    });
  }

  async UzavritZpravu(zpravaId: number): Promise<void> {
    const query = `
      BEGIN
        UzavritZpravu(:zpravaId);
      END;
    `;
    await this.databaseService.execute(query, { zpravaId });
  }
}
