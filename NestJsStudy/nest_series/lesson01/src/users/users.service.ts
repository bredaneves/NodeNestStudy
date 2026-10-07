import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'INTERN', age: 30 },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'INTERN', age: 22 },
        { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'INTERN', age: 35 },
        { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', role: 'INTERN', age: 28 },
        { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com', role: 'INTERN', age: 24 }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {            
            const rolesArray = this.users.filter(user => user.role === role);
            if (rolesArray.length === 0)
                throw new NotFoundException(`No users found with role ${role}`);
            return rolesArray;                            
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);

        if(!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        return user;        
    }

    create(createUserDto: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser);
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return { ...user, ...updateUserDto };
            }
            return user;
        });
        return this.findOne(id);
    }

    delete(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}
