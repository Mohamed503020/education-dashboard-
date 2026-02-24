import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { LiveStreamService } from './live-stream.service';
import { CreateLiveStreamDto, UpdateLiveStreamDto, LiveStreamQueryDto } from './dto/live-stream.dto';
import { JwtAuthGuard } from '../../middleware/guards/jwt-auth.guard';
import { RolesGuard } from '../../middleware/guards/roles.guard';
import { Roles } from '../../middleware/decorators/roles.decorator';
import { CurrentUser } from '../../middleware/decorators/current-user.decorator';
import { UserDocument, UserRole } from '../../models/user.model';

@Controller('live-streams')
@UseGuards(JwtAuthGuard)
export class LiveStreamController {
  constructor(private readonly liveStreamService: LiveStreamService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER)
  async create(
    @Body() createDto: CreateLiveStreamDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.liveStreamService.create(createDto, user._id.toString());
  }

  @Get()
  async findAll(@Query() query: LiveStreamQueryDto) {
    return this.liveStreamService.findAll(query);
  }

  @Get('my-streams')
  async findMyStreams(@CurrentUser() user: UserDocument) {
    return this.liveStreamService.findByTeacher(user._id.toString());
  }

  @Get('upcoming')
  async findUpcoming(@Query('courseId') courseId?: string) {
    return this.liveStreamService.findUpcoming(courseId);
  }

  @Get('live')
  async findLive() {
    return this.liveStreamService.findLive();
  }

  @Get('course/:courseId')
  async findByCourse(@Param('courseId') courseId: string) {
    return this.liveStreamService.findByCourse(courseId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.liveStreamService.findById(id);
  }

  @Get('room/:roomId')
  async findByRoomId(@Param('roomId') roomId: string) {
    return this.liveStreamService.findByRoomId(roomId);
  }

  @Get('room/:roomId/participants')
  async getParticipants(@Param('roomId') roomId: string) {
    return this.liveStreamService.getParticipants(roomId);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateLiveStreamDto,
    @CurrentUser() user: UserDocument,
  ) {
    return this.liveStreamService.update(id, updateDto, user._id.toString(), user.role);
  }

  @Post(':id/start')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER)
  async start(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.liveStreamService.start(id, user._id.toString());
  }

  @Post(':id/end')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER)
  async end(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.liveStreamService.end(id, user._id.toString());
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TEACHER, UserRole.ADMIN)
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: UserDocument,
  ) {
    return this.liveStreamService.delete(id, user._id.toString(), user.role);
  }
}
