import { Controller, Get, Post, HttpStatus, Response, Body, Component, Query } from '@nestjs/common';

import { UsersService } from './../users.service';
import { UserDto } from './../interfaces/user-dto.interface';


@Controller('users')
export class UsersController {

	constructor(private usersService: UsersService) { }

	@Post('register')
	public async register( @Response() res, @Body() dto: UserDto) {
		try {
			await this.usersService.registerUser(dto);
			res.status(HttpStatus.ACCEPTED).send();
		} catch(error){
			res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR).json(error.messages || error);
		}
	}
}