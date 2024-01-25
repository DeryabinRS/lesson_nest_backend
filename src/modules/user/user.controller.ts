import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post('create-user')
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }
}
