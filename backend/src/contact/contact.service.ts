// src/contact/contact.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ContactService {
  constructor(private databaseService: DatabaseService) {}

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
    await this.databaseService.execute(query, {
      jmeno,
      stredni_jmeno,
      prijmeni,
      telefonni_cislo,
      email,
      popis,
      zpravaId,
    });
  }
}
