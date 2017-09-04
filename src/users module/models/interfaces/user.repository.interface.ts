import { Component } from '@nestjs/common';

@Component()
export abstract class IUserRepository {
	abstract countOccurrencesOfEmail(email: string): number;
}