import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as oracledb from 'oracledb'; // Import oracledb

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async Prihlasit(email: string, heslo: string): Promise<any> {
    const query = `
      BEGIN
        Prihlasit(:email, :heslo, :result_cursor);
      END;
    `;
    const result = await this.databaseService.execute(query, {
      email,
      heslo,
      result_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    });
    const resultSet = result.outBinds.result_cursor;
    let row;
    const users = [];
    while ((row = await resultSet.getRow())) {
      users.push(
        Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.toLowerCase(), value]),
        ),
      );
    }
    await resultSet.close();
    return users;
  }

  async NacistUzivatele(id_uzivatele: number): Promise<any> {
    const query = `
      BEGIN
        NacistUzivatele(:id_uzivatele, :result_cursor);
      END;
    `;
    const result = await this.databaseService.execute(query, {
      id_uzivatele,
      result_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    });
    const resultSet = result.outBinds.result_cursor;
    let row;
    const users = [];
    while ((row = await resultSet.getRow())) {
      users.push(row);
    }
    await resultSet.close();
    return users;
  }

  async VytvoritUzivatele(
    jmeno: string,
    email: string,
    heslo: string,
    pravaId: number,
    uzivatelId: number,
  ): Promise<void> {
    const query = `
      BEGIN
        VytvoritUzivatele(:jmeno, :email, :heslo, :pravaId, :uzivatelId);
      END;
    `;
    await this.databaseService.execute(query, {
      jmeno,
      email,
      heslo,
      pravaId,
      uzivatelId,
    });
  }
}
