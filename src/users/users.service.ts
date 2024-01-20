import { Injectable } from '@nestjs/common';
import { USERS } from '../moks';

@Injectable()
export class UsersService {
    getUsers() {
        return USERS;
    }
}
