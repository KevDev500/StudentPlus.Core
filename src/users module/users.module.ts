import { CommandBus, EventBus, CQRSModule } from '@nestjs/cqrs';
import { Component } from '@nestjs/common';
import { CommandHandlers } from './commands/handlers';
import { CommandValidators } from './commands/validators';
//import { EventHandlers } from './events/handlers';
import { UsersController } from './gateway/users.controller';
import { UsersService } from './users.service';
import { IUserRepository } from './models/interfaces/user.repository.interface';
import { UserRepository } from './repository/user.repository';
import { OnModuleInit, Module } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CommandValidator } from './commands/validators/command.validator';


@Module({
	modules: [CQRSModule],
	controllers: [UsersController],
	components: [
		CommandValidator,
		UsersService,
		...CommandValidators,
		...CommandHandlers,
		{ provide: IUserRepository, useClass: UserRepository },
		//       ...EventHandlers,
	]
})
export class UsersModule implements OnModuleInit {
	constructor(
		private readonly moduleRef: ModuleRef,
		private readonly command$: CommandBus,
		private readonly event$: EventBus,
		private readonly commandValidator$: CommandValidator) { }

	onModuleInit() {
		this.command$.setModuleRef(this.moduleRef);
		this.event$.setModuleRef(this.moduleRef);
		this.commandValidator$.setModuleRef(this.moduleRef);

		//this.event$.register(EventHandlers);
		this.command$.register(CommandHandlers);
		this.commandValidator$.register(CommandValidators);
	}
}

