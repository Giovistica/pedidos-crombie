import { Injectable } from '@nestjs/common';
import { ServerResponse } from 'http';
//import { Status } from 'src/enums/status.enum';
import { Orders } from 'src/orders/orders.entity';

type SseConnection = { response: ServerResponse; receiverId: string };

@Injectable()
export class SseService {
  private sseConnections: SseConnection[] = [];

  subscribe(id: string, res: ServerResponse) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    this.sseConnections.push({
      response: res,
      receiverId: id,
    });

    res.on('close', () => {
      const index = this.sseConnections.findIndex(
        (connection) => connection.receiverId === id,
      );
      if (index !== -1) {
        this.sseConnections.splice(index, 1);
      }
    });
  }
  findReceiverConnection(id: string) {
    const foundConnection = this.sseConnections.find(
      (connection) => connection.receiverId === id,
    );

    return foundConnection || null;
  }

  sendNotification(order: Orders, id: string) {
    // Buscar la conexión SSE del receptor
    const connection = this.findReceiverConnection(id);

    if (connection) {
      const message = `La orden ${order.id} ha cambiado a status: ${order.status}.`;
      connection.response.write(`data: {message: ${message}}\n\n`);
    }
  }
  //   derivateNotification(order: Orders) {
  //     const status = order.status;
  //     switch (status) {
  //       case Status.waiting:
  //         break;
  //       case Status.send:
  //         this.sendNotification(order, order.local.id);
  //         break;
  //       case Status.accepted:
  //         this.sendNotification(order, order.client.id);
  //         break;
  //       case Status.cancelled:
  //         this.sendNotification(order, order.client.id);
  //         break;
  //       case Status.coocked:
  //         this.sendNotification(order, order.client.id);
  //         break;
  //       case Status.readytotake:
  //         this.sendNotification(order, order.client.id);
  //         this.sendNotification(order, order.local.id);
  //         break;
  //       case Status.onitsway:
  //         this.sendNotification(order, order.client.id);
  //         this.sendNotification(order, order.local.id);
  //         break;
  //       case Status.received:
  //         this.sendNotification(order, order.client.id);
  //         this.sendNotification(order, order.local.id);
  //         this.sendNotification(order, order.delivery.id);
  //         break;
  //     }
  //  }
}
