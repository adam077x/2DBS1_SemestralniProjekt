// src/meeting/meeting.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { MeetingService } from './meeting.service';

@Controller('meetings')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post('schuzka')
  async VytvoritSchuzku(
    @Body()
    body: {
      typ_schuzky: string;
      umisteni_odkaz: string;
      datum: Date;
      cas: Date;
    },
  ) {
    await this.meetingService.VytvoritSchuzku(
      body.typ_schuzky,
      body.umisteni_odkaz,
      body.datum,
      body.cas,
    );
  }
}
