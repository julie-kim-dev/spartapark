import { Role } from 'src/user/types/userRole.type';

import { SetMetadata } from '@nestjs/common'; // SetMetadata('roles', roles) 코드는 roles라는 문자열 키에 역할 정보를 저장. Map에서 키와 값을 저장하는 형태랑 똑같이 생각

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles); // (...roles: Role[]) 코드는 Roles 데코레이터가 여러 역할을 매개변수로 받을 수 있도록 함