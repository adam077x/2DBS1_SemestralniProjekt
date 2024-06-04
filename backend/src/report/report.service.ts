import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as oracledb from 'oracledb';

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
      const lowerCaseRow = {};
      for (const key in row) {
        lowerCaseRow[key.toLowerCase()] = row[key];
      }
      reports.push(lowerCaseRow);
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
      const lowerCaseRow = {};
      for (const key in row) {
        lowerCaseRow[key.toLowerCase()] = row[key];
      }
      reports.push(lowerCaseRow);
    }
    await resultSet.close();
    return reports[0];
  }

  async VytvoritZpravu(
    titulek: string,
    popis: string,
    uzivatelId: number,
    temaId: number,
  ): Promise<void> {
    const query = `
      BEGIN
        VytvoritZpravu(:titulek, :popis, :uzivatelId, :temaId, :created_report);
      END;
    `;
    const result = await this.databaseService.execute(query, {
      titulek,
      popis,
      temaId,
      uzivatelId,
      created_report: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    });

    const resultSet = result.outBinds.created_report;
    let row;
    const reports = [];
    while ((row = await resultSet.getRow())) {
      const lowerCaseRow = {};
      for (const key in row) {
        lowerCaseRow[key.toLowerCase()] = row[key];
      }
      reports.push(lowerCaseRow);
    }
    await resultSet.close();
    this.databaseService.commit();
    return reports[0];
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
