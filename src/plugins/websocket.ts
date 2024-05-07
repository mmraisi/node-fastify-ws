import fastifyWebsocket, { WebsocketPluginOptions } from "@fastify/websocket";
import { FastifyInstance } from "fastify";

export default async function plugin(
  fastify: FastifyInstance,
  opts: WebsocketPluginOptions
) {
  const wsOptions: WebsocketPluginOptions = {
    options: {
      maxPayload: 1048576,
    },
  };

  fastify.register(fastifyWebsocket, wsOptions);

  fastify.addHook("preValidation", async (request, reply) => {
    const { authorization } = request.headers;
    if (!authorization) {
      await reply.code(401).send("not authenticated");
    }
  });
}
