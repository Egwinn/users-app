import { SQSClient } from '@aws-sdk/client-sqs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';

@Module({
    imports: [
        SqsModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    consumers: [
                        {
                            name: configService.get<string>('SQS_QUEUE_NAME'),
                            queueUrl: configService.get<string>('SQS_QUEUE_URL'),
                            region: configService.get<string>('AWS_REGION'),
                            terminateGracefully: true,
                            sqs: new SQSClient({
                                region: configService.get<string>('AWS_REGION'),
                                endpoint: configService.get<string>('AWS_SQS_ENDPOINT'),
                                credentials: {
                                    accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
                                    secretAccessKey:
                                        configService.get<string>('AWS_SECRET_ACCESS_KEY'),
                                },
                            }),
                        },
                    ],
                    producers: [],
                };
            },
            inject: [ConfigService],
        }),
    ],
    exports: [SqsModule],
})
export class SqsConfigModule {}
