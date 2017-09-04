import { AbstractValidator, Severity } from 'fluent-ts-validator';
import * as EmailValidator from 'email-validator';
import { Component } from '@nestjs/common';
import { CommandValidator } from './command-validator.decorator';
import { RegisterUserCommand } from './../impl';
import { IUserRepository } from './../../models/interfaces/user.repository.interface';

@Component()
@CommandValidator(RegisterUserCommand)
export class RegisterUserValidator extends AbstractValidator<RegisterUserCommand> {
	constructor(private readonly userRepository: IUserRepository) {
		super();

		this.validateIfString(command => command.firstName)
			.hasLengthBetween(2, 50)
			.withFailureCode('400')
			.withPropertyName('First Name')
			.withFailureMessage('Valid First Name required');

		this.validateIfString(command => command.lastName)
			.hasLengthBetween(2, 50)
			.withFailureCode('400')
			.withPropertyName('Last Name')
			.withFailureMessage('Valid Last Name required');

		this.validateIfString(command => command.email)
			.isEmail()
			.withFailureCode('400')
			.withPropertyName('Email')
			.withFailureMessage('Valid Email is required');

		this.validateIfString(command => command.email)
			.fulfills(email => {
				let count = this.userRepository.countOccurrencesOfEmail(email);
				return count === 0;
			})
			.when(command => EmailValidator.validate(command.email))
			.when(command => command.firstName && command.firstName.length >= 2)
			.when(command => command.lastName && command.lastName.length >= 2)
			.when(command => command.password && command.password.length >= 8)
			.withFailureMessage('Email address has already been registered')
			.withPropertyName('Email')

			.withFailureCode('409');

		this.validateIfString(command => command.password)
			.hasLengthBetween(8, 50)
			.withFailureCode('400')
			.withPropertyName('Password')
			.withFailureMessage('Valid Password is required');
	}
}