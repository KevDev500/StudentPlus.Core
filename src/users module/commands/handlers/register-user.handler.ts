import { EventPublisher, ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../impl/register-user.command';
import { User } from '../../models/user.model';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
	constructor(private readonly publisher: EventPublisher) { }

	execute(command: RegisterUserCommand, resolve: (value?) => void) {
		const UserModel = this.publisher.mergeContext(User);
		UserModel.register(command);
		resolve();
	}
}