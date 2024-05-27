import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { ReportController } from './report/report.controller';
import { ReportService } from './report/report.service';
import { FeedbackController } from './feedback/feedback.controller';
import { FeedbackService } from './feedback/feedback.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
import { DocumentController } from './document/document.controller';
import { DocumentService } from './document/document.service';
import { MeetingController } from './meeting/meeting.controller';
import { MeetingService } from './meeting/meeting.service';
import { DatabaseService } from './database/database.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    UserController,
    ReportController,
    FeedbackController,
    ContactController,
    DocumentController,
    MeetingController,
  ],
  providers: [
    UserService,
    ReportService,
    FeedbackService,
    ContactService,
    DocumentService,
    MeetingService,
    DatabaseService,
  ],
})
export class AppModule {}
