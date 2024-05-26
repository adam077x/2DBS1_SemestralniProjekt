// src/report/report.controller.ts
import { Controller, Get, Post, Put, Body, Param, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('zpravy')
  async NacistZpravy(@Query('temaId') temaId: number) {
    return this.reportService.NacistZpravy(temaId);
  }

  @Get('zprava/:id')
  async NacistZpravu(@Param('id') id: number) {
    return this.reportService.NacistZpravu(id);
  }

  @Post('zprava')
  async VytvoritZpravu(
    @Body()
    body: {
      temaId: number;
      nazev: string;
      popis: string;
      datum: Date;
      uzivatelId: number;
    },
  ) {
    await this.reportService.VytvoritZpravu(
      body.temaId,
      body.nazev,
      body.popis,
      body.datum,
      body.uzivatelId,
    );
  }

  @Put('uzavritzpravu')
  async UzavritZpravu(@Body() body: { zpravaId: number }) {
    await this.reportService.UzavritZpravu(body.zpravaId);
  }
}
