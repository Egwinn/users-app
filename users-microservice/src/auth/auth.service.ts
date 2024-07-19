import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInResponseDto } from 'src/data/postgres/dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, pass: string): Promise<SignInResponseDto> {
        try {
            const user = await this.usersService.findByEmail(email, ['id', 'email', 'password']);
            const isEqual = await bcrypt.compare(pass, user.password);
            if (!user || !isEqual) {
                throw new UnauthorizedException('Invalid email or password');
            }

            const payload = { sub: user.id, email: user.email };

            return {
                accessToken: await this.jwtService.signAsync(payload),
            };
        } catch (error) {
            this.logger.error(`Error while user signing: ${error.message}`);
            throw error;
        }
    }
}
