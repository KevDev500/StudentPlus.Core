import { AggregateRoot, IEvent } from '@nestjs/cqrs';
import * as Guid from 'uuid';

import { RegisterUserCommand } from './../commands/impl'

export class UserRegiteredEvent implements IEvent {
	constructor(
		public readonly user: User) { }
}

export class User extends AggregateRoot {

	public readonly id: string;

	constructor(
		firstName: string,
		lastName: string,
		email: string,
		password: string) {
		super();
		
		this.id = Guid.v4();
		this._firstName = firstName;
		this._lastName = lastName;
		this._email = email;
		this._password = password;
	}

	public static register(registerUserCommand: RegisterUserCommand): void {
		let { firstName, lastName, email, password } = registerUserCommand;
		let user = new User(firstName, lastName, email, password);

		//this.apply(new UserRegiteredEvent(user));
	}

	private _firstName: string;
	get firstName() {
		return this._firstName;
	}

	private _lastName: string;
	get lastName() {
		return this._lastName;
	}

	private _email: string;
	get email() {
		return this._email;
	}

	private _password: string;
	get password() {
		return this._password;
	}
}