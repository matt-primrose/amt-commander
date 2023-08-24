import { Socket } from 'net';
import { SocketHandler, SocketParameters } from './socketHandler';

// Mock the Node.js socket
jest.mock('net', () => ({
  Socket: jest.fn().mockImplementation(() => ({
    setEncoding: jest.fn(),
    setTimeout: jest.fn(),
  })),
}));

describe('SocketHandler', () => {
  const socketParameters: SocketParameters = {
    address: 'localhost',
    port: 8080,
  };

  test('creates a socket with the correct encoding and timeout', () => {
    const socketHandler = new SocketHandler(socketParameters);

    expect(Socket).toHaveBeenCalledTimes(1);
    expect(Socket).toHaveBeenCalledWith();
    expect(socketHandler.socket.setEncoding).toHaveBeenCalledWith('binary');
    expect(socketHandler.socket.setTimeout).toHaveBeenCalledWith(6000);
  });
});