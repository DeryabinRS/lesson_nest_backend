import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcript from 'bcrypt';

import { User } from './models/user.model';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User) private readonly userRepository: typeof User,
    ) {}

    async hashPassword(password: string) {
        return bcript.hash(password, 13);
    }

    async findUserById(id: number) {
        return this.userRepository.findOne({ where: { id } });
    }

    async findUserByEmail(email: string) {
        return this.userRepository.findOne({ where: { email } });
    }

    async createUser(dto: CreateUserDto): Promise<CreateUserDto> {
        const password = await this.hashPassword(dto.password);
        await this.userRepository.create({ ...dto, password });
        return dto;
    }
}
