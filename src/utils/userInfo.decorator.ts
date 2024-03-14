import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 유저 정보를 담기 위한 커스텀 데코레이터
// 로그인 해야 호출할 수 있는 API에서 사용

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user ? request.user : null;
  },
);