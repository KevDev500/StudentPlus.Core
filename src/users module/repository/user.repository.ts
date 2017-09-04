import { Component } from '@nestjs/common';

import { IUserRepository } from './../models/interfaces/user.repository.interface';

@Component()
export class UserRepository extends IUserRepository {
	countOccurrencesOfEmail(email: string) {
		return 0;
	}
}