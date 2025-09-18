import { it, describe } from 'node:test'
import assert from 'node:assert/strict'

import sinon from 'sinon'
import { webSocket } from '../../../src/routes/ws-event'

describe('WebSocket API', () => {
  it('should handle WebSocket messages and send a response', async () => {
    // Mock Fastify instance and options

    const socket = {
      on: sinon.stub().callsFake((event: string, callback) => {
        if (event === 'message') {
          // Simulate receiving a message
          callback('hello from client')
        }
      }),
      send: sinon.stub()
    }

    const fastify = {
      get: sinon
        .stub()
        .callsFake((route: string, options: any, handler: any) => {
          // Simulate WebSocket connection
          // Simulate handling message
          handler(socket, null)
        }),
      log: {
        info: sinon.stub()
      }
    }
    const opts = {}

    // Call the webSocket function
    await webSocket(fastify, opts)

    // Assert that the log method was called with the correct message
    assert(fastify.log.info.calledOnce)
    assert(fastify.log.info.calledWith('hello from client'))

    // Assert that the send method was called with the correct response
    assert(fastify.get.calledOnce)
    assert(fastify.get.args[0][0], '/websocket')

    assert(socket.send.calledWith('hi from server'))
  })
})
