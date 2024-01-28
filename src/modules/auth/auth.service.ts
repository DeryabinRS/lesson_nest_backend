import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto';
import { APP_ERROR } from '../../common/constants/errors';
import { UserLoginDto } from './dto';
import * as bcript from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tikenService: TokenService,
    ) {}

    async registerUser(dto: CreateUserDto): Promise<CreateUserDto> {
        const existUser = await this.userService.findUserByEmail(dto.email);
        if (existUser) throw new BadRequestException(APP_ERROR.USER.EXIST);
        return this.userService.createUser(dto);
    }

    async loginUser(dto: UserLoginDto): Promise<AuthUserResponse> {
        const user = await this.userService.findUserByEmail(dto.email);
        if (!user) throw new BadRequestException(APP_ERROR.USER.NO_EXIST);

        const validatePassword = await bcript.compare(
            dto.password,
            user.password,
        );
        if (!validatePassword)
            throw new BadRequestException(APP_ERROR.USER.BAD_LOGIN);

        const userData = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };

        const token = await this.tikenService.generateJwtToken(userData);

        return { ...userData, token };
    }
}
