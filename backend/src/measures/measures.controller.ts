import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MeasuresService } from './measures.service';

@Controller('measures')
export class MeasuresController {
  constructor(private readonly measuresService: MeasuresService) {}

  @Get('opatreni/:zpravaId')
  async NacistOpatreni(@Param('zpravaId') zpravaId: number) {
    return await this.measuresService.NacistOpatreni(zpravaId);
  }

  @Post('opatreni')
  async VytvoritOpatreni(
    @Body()
    body: {
      popis: string;
      zpravaId: number;
      naklady: number;
    },
  ) {
    return await this.measuresService.VytvoritOpatreni(
      body.popis,
      body.zpravaId,
      body.naklady,
    );
  }
}
