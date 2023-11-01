import { applyDecorators, UseGuards } from '@nestjs/common';
import { Rol } from './roles.decorator';
import { Roles } from 'src/enums/role.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export function Auth(role: Roles[]) {
  return applyDecorators(Rol(role), UseGuards(AuthGuard, RolesGuard));
}
