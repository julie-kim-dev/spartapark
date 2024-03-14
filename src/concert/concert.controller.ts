import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/types/userRole.type';

import {
  Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseGuards, UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UpdateConcertDto } from './dto/update-concert.dto';
import { ConcertService } from './concert.service';

@UseGuards(RolesGuard) // @UseGuards(RolesGuard)라는 데코레이터를 @Controller 데코레이터 위에 작성했는데요. 이는 곧 해당 가드를 팀 컨트롤러에서는 전부 사용하겠다는 것을 의미해요! 즉, findAll과 findOne 역시 로그인을 하지 않으면 호출을 할 수 없어요!
@Controller('concert')
export class ConcertController {
  constructor(private readonly concertService: ConcertService) {}

  // 콘서트 전체 조회
  @Get()
  async findAll() {
    return await this.concertService.findAll();
  }

  // 콘서트 상세 조회
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.concertService.findOne(id);
  }

  // 콘서트 생성(등록))
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() updateConcertDto: UpdateConcertDto) { // 입력 사항이 똑같아서 업데이트dto를 그대로 사용했는데 혹시 문제가 될까요?
    await this.concertService.create(updateConcertDto);
  }

  // 콘서트 수정
  @Roles(Role.ADMIN)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateConcertDto: UpdateConcertDto) {
    await this.concertService.update(id, updateConcertDto);
  }

  // 콘서트 삭제
  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.concertService.delete(id);
  }
}