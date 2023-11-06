export enum Status {
  waiting = 'WAITING', //gris oscuro
  send = 'SEND', //gris claro el cliente envio el pedido
  cancelled = 'CANCELLED', //rojo el local lo rechazo
  accepted = 'ACCEPTED', //amarillo el local lo acepto
  received = 'RECEIVED', //el clente lo recibio
  delivered = 'DELIVERED', //verde oscuro el cliente lo recibio
}
