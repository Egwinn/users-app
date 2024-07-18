import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

export class FindAllUsersOptionsDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    readonly skip?: number = 0;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    readonly limit?: number = 10;

    @IsOptional()
    @IsIn(['name', 'age', 'id', 'email'])
    readonly sortField? = 'id';

    @IsOptional()
    @IsIn(['DESC', 'ASC'])
    readonly sortOrder? = 'ASC';
}

export class FindAllUsersResponseDto {
    items: User[];
    limit: number;
    skip: number;
    total: number;
}
