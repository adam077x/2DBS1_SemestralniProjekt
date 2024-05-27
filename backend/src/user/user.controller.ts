import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Res,
  Req,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('prihlasit')
  @HttpCode(HttpStatus.OK)
  async Prihlasit(
    @Body() body: { email: string; heslo: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.userService.Prihlasit(body.email, body.heslo);

    if (!user) {
      throw new BadRequestException('Neplatné přihlašovací údaje');
    }

    const jwt = await this.jwtService.signAsync(user[0]);

    await res.cookie('jwt', jwt, { httpOnly: true, secure: true });

    return {
      jwt,
      user,
    };
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
