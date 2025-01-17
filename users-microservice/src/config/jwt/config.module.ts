import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    audience: configService.get<string>('JWT_AUDIENCE'),
                    issuer: configService.get<string>('JWT_ISSUER'),
                    expiresIn: configService.get<string>('JWT_EXPIRES'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [JwtModule],
})
export class JwtConfigModule {}
