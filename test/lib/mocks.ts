import sinon from 'sinon'

export function buildMockFastify () {
  return {
    log: {
      info: sinon.stub()
    }
  }
}

export function buildMockReply () {
  const mockReply = {
    code: sinon.stub().returnsThis(),
    type: sinon.stub().returnsThis(),
    send: sinon.stub().returnsThis(),
    header: sinon.stub().returnsThis(),
    redirect: sinon.stub().returnsThis()
  }

  return mockReply
}
