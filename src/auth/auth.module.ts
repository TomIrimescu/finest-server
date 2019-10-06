import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserService } from './user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { ConfigService } from '../services/config/config.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secretOrPrivateKey: new ConfigService().get('SECRET'),
        }),
    ],
    providers: [UserService, AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
