import 'reflect-metadata';
import { COMMAND_VALIDATOR_METADATA } from './../../../utils/constants';

export function CommandValidator(command) {
	return (target) => {
		Reflect.defineMetadata(COMMAND_VALIDATOR_METADATA, command.name, target);
	};
};