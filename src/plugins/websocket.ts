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
}
