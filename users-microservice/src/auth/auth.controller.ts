import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { SignInDto, SignInResponseDto } from 'src/data/postgres/dto/sign-in.dto';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/signIn')
    async signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('/profile')
    async getProfile(@Request() request: Request): Promise<SignInResponseDto> {
        return request['user'];
    }
}
