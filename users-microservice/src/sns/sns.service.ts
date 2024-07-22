import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { AWS_SNS_PROVIDER } from 'src/common/constants/injection-tokens';

@Injectable()
export class SnsService {
    private readonly logger = new Logger(SnsService.name);
    constructor(
        @Inject(AWS_SNS_PROVIDER) private readonly snsClient: AWS.SNS,
        private readonly configService: ConfigService
    ) {}

    async publishMessage(event: string, payload: object): Promise<void> {
        const command = {
            TopicArn: this.configService.get('SNS_TOPIC_ARN'),
            Message: JSON.stringify({ event, payload }),
        };

        try {
            await this.snsClient.publish(command).promise();
        } catch (error) {
            this.logger.error(`Error while publishing message to topic: ${error.message}`);
            throw error;
        }
    }
}
