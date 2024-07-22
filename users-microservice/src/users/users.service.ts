import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { SNSEvents } from 'src/common/constants/sns-events.enum';
import { CreateUserDto } from 'src/data/postgres/dto/create-user.dto';
import { FindAllUsersOptionsDto } from 'src/data/postgres/dto/find-all-users.dto';
import { UpdateUserDto } from 'src/data/postgres/dto/update-user.dto';
import { User } from 'src/data/postgres/entities/user.entity';
import { SnsService } from 'src/sns/sns.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private snsService: SnsService
    ) {}

    async findAll(options: FindAllUsersOptionsDto): Promise<[User[], number]> {
        const { skip, limit, sortField, sortOrder } = options;

        return this.usersRepository.findAndCount({
            skip,
            take: limit,
            order: { [sortField]: sortOrder },
        });
    }

    async findById(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    async findByEmail(email: string, select?: Array<keyof User>): Promise<User> {
        return this.usersRepository.findOne({ where: { email }, select });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const isExists = await this.usersRepository.existsBy({ email: createUserDto.email });
            if (isExists) throw new BadRequestException('User with such email already exixts');

            createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

            const newUser = await this.usersRepository.save(createUserDto);

            await this.snsService.publishMessage(SNSEvents.UserCreated, newUser);

            return newUser;
        } catch (error) {
            this.logger.error(`Error while user creating: ${error.message}`);
            throw error;
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });
            if (!user) throw new NotFoundException('User does not exist');

            if (updateUserDto.password) {
                updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
            }

            const updatedUser = await this.usersRepository.save({ ...user, ...updateUserDto });

            await this.snsService.publishMessage(SNSEvents.UserUpdated, updatedUser);

            return updatedUser;
        } catch (error) {
            this.logger.error(`Error while user updating: ${error.message}`);
            throw error;
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });
            if (!user) throw new NotFoundException('User does not exist');

            const result = await this.usersRepository.delete({ id });

            if (result.affected > 0) {
                await this.snsService.publishMessage(SNSEvents.UserDeleted, user);
                return user;
            }
        } catch (error) {
            this.logger.error(`Error while user deleting: ${error.message}`);
            throw error;
        }
    }
}
