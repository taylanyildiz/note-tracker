import { Injectable } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { IUser } from "./interfaces";

@Injectable()
export class UsersService {
    constructor() { }

    /**
     * Find an user by email
     * @param email 
     * @returns 
     */
    async findByEmail(email: string): Promise<User> {
        const user: User = await User.findOneBy({ email });
        return user;
    }

    /**
     * Find an user by id
     * @param id
     * @returns
     */
    async findById(id: number): Promise<User> {
        const user: User = await User.findOneBy({ id });
        return user;
    }


    async createUser(inputs: IUser): Promise<User> {
        const user: User = await User.save(inputs as User);
        return user;
    }
}