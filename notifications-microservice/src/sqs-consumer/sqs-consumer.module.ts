import { Module } from '@nestjs/common';
import { SqsConfigModule } from 'src/config/sqs/config.module';
import { SqsConsumerService } from './sqs-consumer.service';

@Module({
    imports: [SqsConfigModule],
    providers: [SqsConsumerService],
    exports: [SqsConsumerService],
})
export class SqsConsumerModule {}
