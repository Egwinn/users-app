import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/data/postgres/entities/user.entity';
import { SnsModule } from 'src/sns/sns.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), SnsModule],
    controllers: [UsersController],
    providers: [UsersService, JwtService],
    exports: [UsersService],
})
export class UsersModule {}
