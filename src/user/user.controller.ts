import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { SignUpDto } from './dto/register.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signUpDto: SignUpDto) {
    return await this.userService.signup(signUpDto.email, signUpDto.password, signUpDto.name);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto.email, loginDto.password);
  }

  // AuthGuard는 Nest.js에서 제공하는 인증 가드입니다. 이 가드는 passport 라이브러리를 기반으로 작동하고요. 특정 인증 전략을 사용하여 요청이 처리되기 전에 인증을 수행
  @UseGuards(AuthGuard('jwt')) // 이 데코레이터는 JWT 인증이 된 유저에 한해서 해당 API를 호출하게 해주겠다는 뜻
  @Get('info')
  getInfo(@UserInfo() user: User) {
    return { id: user.id, email: user.email, name: user.name };
  }
  //위에서 Passport를 활용해서 JwtStrategy를 저희가 직접 만들었었죠? 이것을 통해서 인증된 유저만 getEmail API를 호출할 수 있게 됩니다. 로그인 하지 않은 유저는 해당 API를 부를 수 없음 -> 유저인포 호출
}