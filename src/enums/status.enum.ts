export enum Status {
  waiting = 'WAITING', //gris oscuro
  send = 'SEND', //gris claro el clienyte envio el pedido
  cancelled = 'CANCELLED', //rojo el local lo rechazo
  accepted = 'ACCEPTED', //amarillo el local lo acepto
  coocked = 'COOCKED', //verde clarito el local ya lo cocino
  readytotake = 'READY', //verde medio se le asigno delivery
  onitsway = 'ONITSWAY', //verde oscuro el delivery lo retiro
  received = 'RECEIVED', //fucsia llego a destino
}
