// src/document/document.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class DocumentService {
  constructor(private databaseService: DatabaseService) {}

  async VytvoritDokument(
    nazev: string,
    soubor: Buffer,
    typ_obsahu: string,
    zpravaId: number,
  ): Promise<void> {
    const query = `
      BEGIN
        VytvoritDokument(:nazev, :soubor, :typ_obsahu, :zpravaId);
      END;
    `;
    await this.databaseService.execute(query, {
      nazev,
      soubor,
      typ_obsahu,
      zpravaId,
    });
  }
}
