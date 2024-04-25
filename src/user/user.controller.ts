import { Public } from '@/common/auth/auth.decorator';
import { AuthRequest } from '@/common/auth/auth.request';
import { CreateUserDto } from '@/user/user.dto';
import { UserService } from '@/user/user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(@Body() userDto: CreateUserDto) {
    return this.userService.create(userDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('get-by-auth')
  getByAuth(@Req() req: AuthRequest) {
    return this.userService.get(req.user.id);
  }
}