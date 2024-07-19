import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/data/postgres/dto/create-user.dto';
import { FindAllUsersOptionsDto } from 'src/data/postgres/dto/find-all-users.dto';
import { UpdateUserDto } from 'src/data/postgres/dto/update-user.dto';
import { User } from 'src/data/postgres/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
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

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const isExists = await this.usersRepository.existsBy({ email: createUserDto.email });
            if (isExists) throw new BadRequestException('User with such email already exixts');

            createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

            return this.usersRepository.save(createUserDto);
        } catch (error) {
            this.logger.error(`Error while user creating: ${error.message}`);
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });
            if (!user) throw new NotFoundException('User does not exist');

            if (updateUserDto.password) {
                updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
            }

            return this.usersRepository.save({ ...user, ...updateUserDto });
        } catch (error) {
            this.logger.error(`Error while user updating: ${error.message}`);
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });
            if (!user) throw new NotFoundException('User does not exist');

            const result = await this.usersRepository.delete({ id });

            if (result.affected > 0) {
                return user;
            }
        } catch (error) {
            this.logger.error(`Error while user deleting: ${error.message}`);
        }
    }
}
