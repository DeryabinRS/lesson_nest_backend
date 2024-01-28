import {
    Body,
    Controller,
    Delete,
    Patch,
    Req,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from '../../guards/jwt-guard';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @ApiTags('user')
    @ApiResponse({ status: 200, type: UpdateUserDto })
    @UseGuards(JwtAuthGuard)
    @Patch()
    updateUser(@Body() updateDto: UpdateUserDto, @Req() request) {
        const user = request.user;
        return this.usersService.updateUser(user.id, updateDto);
    }

    @ApiTags('user')
    @ApiResponse({ status: 200 })
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteUser(@Req() request) {
        const user = request.user;
        return this.usersService.deleteUser(user.id);
    }
}
