import { Component, Inject } from '@nestjs/common';
import { ICommand, CommandBus } from '@nestjs/cqrs';

import { UserDto } from './interfaces/user-dto.interface';
import { RegisterUserCommand } from './commands/impl/register-user.command';
import { CommandValidator } from './commands/validators/command.validator';

@Component()
export class UsersService {
	constructor(private commandBus: CommandBus, private commandValidator: CommandValidator) { }

	async registerUser(user: UserDto) {
		const { firstName, lastName, email, password } = user;
		const registerUserCommand = new RegisterUserCommand(firstName, lastName, email, password);

		let validationResult = this.commandValidator.validate(registerUserCommand);
		if (!validationResult.isValid) return Promise.reject(validationResult);

		return await this.commandBus.execute(registerUserCommand);
	}
}

