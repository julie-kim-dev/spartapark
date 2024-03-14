import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateConcertDto {
  @IsString()
  @IsNotEmpty({ message: '콘서트 이름을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '콘서트 정보를 입력해주세요.' })
  content: string;

  @IsString()
  @IsNotEmpty({ message: '콘서트 날짜를 입력해주세요.' })
  date: string;

  @IsNumber()
  @IsNotEmpty({ message: '티켓의 가격을 입력해주세요.' })
  price: number;
}