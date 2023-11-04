import { Controller, Get, Param, ParseUUIDPipe, Res } from '@nestjs/common';
import { ServerResponse } from 'http';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Roles } from 'src/enums/role.enum';

import { SseService } from './sse.service';

@Auth([Roles.DELIVERY, Roles.CLIENT, Roles.LOCAL])
@Controller('sse')
export class SseController {
  constructor(private sseService: SseService) {}
  @Get(':id')
  subscribeToSse(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: ServerResponse,
  ) {
    this.sseService.subscribe(id, res);
  }
}
