import { Message } from '@aws-sdk/client-sqs';
import { Injectable, Logger } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';

@Injectable()
export class SqsConsumerService {
    private readonly logger = new Logger(SqsConsumerService.name);

    @SqsMessageHandler(process.env.SQS_QUEUE_NAME, false)
    async handleMessage(message: Message): Promise<void> {
        const msgBody = JSON.parse(message.Body);
        this.logger.log(msgBody);
    }
}
