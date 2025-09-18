export async function webSocket (fastify: any, opts: any) {
  fastify.get('/websocket', { websocket: true }, (socket: any, req: any) => {
    socket.on('message', (message: any) => {
      fastify.log.info(message.toString())
      socket.send('hi from server')
    })
  })
}
