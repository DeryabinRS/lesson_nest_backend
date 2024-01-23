import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';

import config from '../config';
import { User } from '../user/models/user.model';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get('dbHost'),
                port: configService.get('dbPort'),
                username: configService.get('dbUser'),
                password: configService.get('dbPassword'),
                database: configService.get('dbName'),
                synchronize: true,
                autoLoadModels: true,
                models: [User],
            }),
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
