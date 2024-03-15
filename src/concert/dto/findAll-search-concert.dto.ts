import { IsOptional, IsString } from "class-validator";

export class FindAllSearchConcertDto {
    @IsOptional() // undefined를 받을 수 있으면서 값이 존재할 때는 @IsString(), @IsNumber() 등으로 타입 체크도 가능
    @IsString()
    keyword?: string;
}