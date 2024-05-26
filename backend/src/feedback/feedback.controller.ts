// src/feedback/feedback.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('zpetnavazba')
  async VytvoritZpetnouVazbu(
    @Body()
    body: {
      zpravaId: number;
      uzivatelId: number;
      komentar: string;
      hodnoceni: number;
    },
  ) {
    await this.feedbackService.VytvoritZpetnouVazbu(
      body.zpravaId,
      body.uzivatelId,
      body.komentar,
      body.hodnoceni,
    );
  }
}
