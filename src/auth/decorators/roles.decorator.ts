import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Rol = (role: Roles[]) => SetMetadata(ROLES_KEY, role);
