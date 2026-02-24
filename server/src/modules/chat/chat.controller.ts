import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, Patch } from '@nestjs/common';
import { ChatService } from './chat.service';
import { SendMessageDto, GetMessagesDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../../middleware/guards/jwt-auth.guard';
import { RolesGuard } from '../../middleware/guards/roles.guard';
import { Roles } from '../../middleware/decorators/roles.decorator';
import { CurrentUser } from '../../middleware/decorators/current-user.decorator';
import { UserDocument, UserRole } from '../../models/user.model';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('send')
  async sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.chatService.sendMessage(sendMessageDto, user._id.toString());
  }

  @Get('messages/:liveStreamId')
  async getMessages(
    @Param('liveStreamId') liveStreamId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.chatService.getMessages({ liveStreamId, page, limit });
  }

  @Get('messages/:liveStreamId/recent')
  async getRecentMessages(
    @Param('liveStreamId') liveStreamId: string,
    @Query('limit') limit?: number,
  ) {
    return this.chatService.getRecentMessages(liveStreamId, limit);
  }

  @Get('messages/:liveStreamId/pinned')
  async getPinnedMessages(@Param('liveStreamId') liveStreamId: string) {
    return this.chatService.getPinnedMessages(liveStreamId);
  }

  @Delete('messages/:messageId')
  async deleteMessage(
    @Param('messageId') messageId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.chatService.deleteMessage(
      messageId,
      user._id.toString(),
      user.role === UserRole.TEACHER,
    );
  }

  @Patch('messages/:messageId/pin')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER)
  async pinMessage(
    @Param('messageId') messageId: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.chatService.pinMessage(messageId, user._id.toString());
  }
}
