import _ from 'lodash';
import { Like, Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateConcertDto } from './dto/update-concert.dto';
import { Concert } from './entities/concert.entity';
import { FindAllSearchConcertDto } from './dto/findAll-search-concert.dto';

@Injectable()
export class ConcertService {
  constructor(
    @InjectRepository(Concert)
    private readonly concertRepository: Repository<Concert>,
  ) {}

  async findAll({ keyword }: FindAllSearchConcertDto): Promise<Concert[]> {
    const concert = await this.concertRepository.find({
      select: ['id', 'title'],
      where: {
        ...(keyword && { title: Like(`%${keyword}%`) }),
      },
    });

    return concert;
  }

  async findOne(id: number) {
    return await this.verifyConcertById(id);
  }

  async create(UpdateConcertDto: UpdateConcertDto) {
    return (await this.concertRepository.save(UpdateConcertDto)).id;
  }

  async update(id: number, updateConcertDto: UpdateConcertDto) {
    await this.verifyConcertById(id);
    await this.concertRepository.update({ id }, updateConcertDto);
  }

  async delete(id: number) {
    await this.verifyConcertById(id);
    await this.concertRepository.delete({ id });
  }

  private async verifyConcertById(id: number) {
    const concert = await this.concertRepository.findOneBy({ id });
    if (_.isNil(concert)) {
      throw new NotFoundException('존재하지 않는 콘서트입니다.');
    }

    return concert;
  }
}