import { Module } from '@nestjs/common';
import { JwtConfigModule } from 'src/config/jwt/config.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [UsersModule, JwtConfigModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
