import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { AWS_SNS_PROVIDER } from 'src/common/constants/injection-tokens';

@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: AWS_SNS_PROVIDER,
            useFactory: async (configService: ConfigService): Promise<AWS.SNS> => {
                const sns = new AWS.SNS({
                    endpoint: configService.get<string>(
                        'AWS_SNS_ENDPOINT',
                        'http://localhost:4566'
                    ),
                    region: configService.get<string>('AWS_REGION', 'eu-central-1'),
                    credentials: {
                        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID', 'test'),
                        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY', 'test'),
                    },
                });

                return sns;
            },
            inject: [ConfigService],
        },
    ],
    exports: [AWS_SNS_PROVIDER],
})
export class SnsConfigModule {}
