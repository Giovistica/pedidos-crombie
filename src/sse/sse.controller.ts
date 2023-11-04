import { Controller, Get, Res } from '@nestjs/common';
import { ServerResponse } from 'http';

@Controller('sse')
export class SseController {
  private sseConnections: ServerResponse[] = [];
  @Get()
  subscribeToSse(@Res() res: ServerResponse) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Agrega la respuesta SSE actual a la lista de conexiones
    this.sseConnections.push(res);

    res.on('close', () => {
      // Elimina la respuesta SSE cuando se cierra la conexión
      const index = this.sseConnections.indexOf(res);
      if (index !== -1) {
        this.sseConnections.splice(index, 1);
      }
    });
  }
}
