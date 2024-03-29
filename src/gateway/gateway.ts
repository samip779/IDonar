import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { GatewayService } from './gateway.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JWTSECRET } from '../environments';
import { UsersService } from '../users/users.service';
import { MessagesService } from '../messages/messages.service';

@WebSocketGateway()
export class Gateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private gatewayService: GatewayService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService,
  ) {}

  @WebSocketServer()
  private server: Server;

  afterInit(server: any) {
    this.gatewayService.server = server;
  }

  async handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth.token || client.handshake.headers.authorization;

      if (!token) throw new UnauthorizedException();

      const decoded = await this.jwtService.verifyAsync(token, {
        secret: JWTSECRET,
      });

      const user = await this.usersService.findOneBy(
        { id: decoded.sub },
        { id: true },
      );

      if (!user) throw new UnauthorizedException();

      client.data = { userId: user.id };
      client.join(user.id);
      client.emit('socket-status', { connected: true, status: 200 });
    } catch (error) {
      client.emit('socket-status', { connected: false, status: 404 });
      return client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('message')
  async onMessage(
    @MessageBody()
    data: {
      to: string;
      message: string;
    },
    @ConnectedSocket() socket: Socket,
  ) {
    const message = data.message;
    const from = socket.data.userId;

    const insertedMessage = await this.messagesService.insertMessage({
      senderId: from,
      receiverId: data.to,
      content: message,
    });

    this.server.to(data.to).emit('message', {
      from: insertedMessage.senderId,
      message: insertedMessage.content,
      timestamp: insertedMessage.createdAt,
    });
  }
}
