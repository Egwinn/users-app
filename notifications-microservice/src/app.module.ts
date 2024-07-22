import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqsConsumerModule } from './sqs-consumer/sqs-consumer.module';

@Module({
    imports: [
        SqsConsumerModule,
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
