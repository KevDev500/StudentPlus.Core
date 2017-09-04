import { ICommand } from '@nestjs/cqrs';
import { AbstractValidator, Severity } from 'fluent-ts-validator';

import { User } from './../../models/user.model';

export class RegisterUserCommand implements ICommand {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly password: string) {
    }
}