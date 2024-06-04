// src/contact/contact.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get('kontakty/:id_zpravy')
  async NacistKontakty(@Param('id_zpravy') id_zpravy: number) {
    return await this.contactService.NacistKontakty(id_zpravy);
  }

  @Post('kontakt')
  async VytvoritKontakt(
    @Body()
    body: {
      jmeno: string;
      stredni_jmeno: string;
      prijmeni: string;
      telefonni_cislo: string;
      email: string;
      popis: string;
      zpravaId: number;
    },
  ) {
    return await this.contactService.VytvoritKontakt(
      body.jmeno,
      body.stredni_jmeno,
      body.prijmeni,
      body.telefonni_cislo,
      body.email,
      body.popis,
      body.zpravaId,
    );
  }
}
