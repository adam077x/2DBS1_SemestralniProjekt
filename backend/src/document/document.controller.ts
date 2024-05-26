// src/document/document.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('dokument')
  async VytvoritDokument(
    @Body()
    body: {
      nazev: string;
      soubor: Buffer;
      typ_obsahu: string;
      zpravaId: number;
    },
  ) {
    await this.documentService.VytvoritDokument(
      body.nazev,
      body.soubor,
      body.typ_obsahu,
      body.zpravaId,
    );
  }
}
