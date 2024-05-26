import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('prihlasit')
  async Prihlasit(@Body() body: { email: string; heslo: string }) {
    return this.userService.Prihlasit(body.email, body.heslo);
  }

  @Get('uzivatele')
  async NacistUzivatele(@Query('id_uzivatele') id_uzivatele: number) {
    return this.userService.NacistUzivatele(id_uzivatele);
  }

  @Post('uzivatele')
  async VytvoritUzivatele(
    @Body()
    body: {
      jmeno: string;
      email: string;
      heslo: string;
      pravaId: number;
      uzivatelId: number;
    },
  ) {
    await this.userService.VytvoritUzivatele(
      body.jmeno,
      body.email,
      body.heslo,
      body.pravaId,
      body.uzivatelId,
    );
  }
}
