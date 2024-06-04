import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as oracledb from 'oracledb';

@Injectable()
export class ContactService {
  constructor(private databaseService: DatabaseService) {}

  async NacistKontakty(id_zprava: number): Promise<any> {
    console.log('NacistKontakty', id_zprava);

    const query = `
      BEGIN
        NacistKontakty(:id_zprava, :result_cursor);
      END;
    `;
    const result = await this.databaseService.execute(query, {
      id_zprava,
      result_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR },
    });
    const resultSet = result.outBinds.result_cursor;
    let row;
    const contacts = [];
    while ((row = await resultSet.getRow())) {
      contacts.push(
        Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key.toLowerCase(), value]),
        ),
      );
    }
    await resultSet.close();
    return contacts;
  }

  async VytvoritKontakt(
    jmeno: string,
    stredni_jmeno: string,
    prijmeni: string,
    telefonni_cislo: string,
    email: string,
    popis: string,
    zpravaId: number,
  ): Promise<void> {
    const query = `
      BEGIN
        VytvoritKontakt(:jmeno, :stredni_jmeno, :prijmeni, :telefonni_cislo, :email, :popis, :zpravaId);
      END;
    `;

    const response = await this.databaseService.execute(query, {
      jmeno,
      stredni_jmeno,
      prijmeni,
      telefonni_cislo,
      email,
      popis,
      zpravaId,
    });

    this.databaseService.commit();

    return response;
  }
}
