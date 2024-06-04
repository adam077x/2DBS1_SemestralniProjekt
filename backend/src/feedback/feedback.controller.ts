import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Get('zpetnevazby/:zpravaId')
  async NacistZpetneVazby(@Param('zpravaId') zpravaId: number) {
    return await this.feedbackService.NacistZpetneVazby(zpravaId);
  }

  @Post('zpetnavazba')
  async VytvoritZpetnouVazbu(
    @Body()
    body: {
      zpravaId: number;
      uzivatelId: number;
      zpetnaVazba: string;
    },
  ) {
    await this.feedbackService.VytvoritZpetnouVazbu(
      body.zpravaId,
      body.uzivatelId,
      body.zpetnaVazba,
    );
  }
}
