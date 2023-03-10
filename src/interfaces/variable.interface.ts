import { IPaginationOptions } from './pagination-options.interface';
import { IUser } from './user.interface';

export interface IVariables {
    id?: string | number;
    genre?: string;
    user?: IUser;
    tag?: string;
    active?: boolean;
    pagination?: IPaginationOptions;
}