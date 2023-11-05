import { Controller, Get, Param, ParseUUIDPipe, Res } from '@nestjs/common';
import { ServerResponse } from 'http';
import { SseService } from './sse.service';

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
