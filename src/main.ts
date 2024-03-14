import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // DTO를 엄격하게 사용

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DTO 객체 안에서 클라이언트의 전달 값에 대한 유효성 검사가 자동으로 실행
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true // 컨트롤러에서 유저의 입력값을 자동으로 DTO 객체로 변환해주는 옵션
    })
  )

  await app.listen(3100);
}
bootstrap();
