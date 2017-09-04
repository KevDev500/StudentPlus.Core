import { Component } from '@nestjs/common';

import { COMMAND_VALIDATOR_METADATA } from './../../../utils/constants';

@Component()
export class CommandValidator {

	validators: Map<string, any>;
	moduleRef: any;

	constructor() {
		this.validators = new Map();
		this.moduleRef = null;
	}

	setModuleRef(moduleRef): void {
		this.moduleRef = moduleRef;
	}

	register(validators: any[]) {
		validators.forEach((validator) => this.registerValidator(validator));
	}

	bind(handler, name) {
		this.validators.set(name, handler);
	}

	registerValidator(validator) {
		if (!this.moduleRef) {
			console.log("Invalid module ref exception")
		}
		const instance = this.moduleRef.get(validator);
		if (!instance)
			return;
		const target = this.reflectCommandValidatorName(validator);
		if (!target) {
			console.log('Invalid command validator exception');
		}
		this.bind(instance, target);
	}

	reflectCommandValidatorName(validator) {
		return Reflect.getMetadata(COMMAND_VALIDATOR_METADATA, validator);
	}

	validate(command) {
		const validator = this.validators.get(this.getValidatorName(command));
		if (!validator) {
			console.log('Validator not found');
		}

		let validationResult = validator.validate(command);
		let failures = validationResult.getFailures();
		return {
			isValid: validationResult.isValid(),
			failures: failures,
			messages: failures.map((failure) => {
				return {
					propertyName: failure.propertyName,
					message: failure.message
				};
			}),
			statusCode: Math.max.apply(Math, failures.map(failure => failure.code))
		}
	}

	getValidatorName(command) {
		const { constructor } = Object.getPrototypeOf(command);
		return constructor.name;
	}
}