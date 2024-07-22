import { Module } from '@nestjs/common';
import { SnsConfigModule } from 'src/config/sns/config.module';
import { SnsService } from './sns.service';

@Module({
    imports: [SnsConfigModule],
    providers: [SnsService],
    exports: [SnsService],
})
export class SnsModule {}
